<script lang="ts">
	import { attributesFromStored, exportCultivarCollection } from '@vdg-webapp/models';

	import { Button, Resizable, ScrollArea } from '$core';
	import { getAppContext } from '$state';

	import CollectionForm from './CollectionForm.svelte';
	import CultivarCollectionTree from './CultivarCollectionTree.svelte';
	import CultivarForm from './CultivarForm.svelte';
	import { setCultivarCollectionEditorContext } from './cultivarCollectionEditorContext.svelte';

	type Props = {
		/** Collection shown once collections have loaded, until the user picks another. */
		defaultCollectionId?: string;
	};
	let { defaultCollectionId }: Props = $props();

	const ctx = getAppContext();
	const editor = setCultivarCollectionEditorContext();

	let defaultApplied = false;
	$effect(() => {
		if (defaultApplied || !defaultCollectionId) return;
		if (collections.some((collection) => collection.id === defaultCollectionId)) {
			defaultApplied = true;
			editor.select({ kind: 'collection', id: defaultCollectionId });
		}
	});

	/** Collections the garden owns, which can be changed. */
	const ownedCollections = $derived(ctx.cultivars.collections);
	/** Owned collections and the ones they inherit from, which are read only. */
	const collections = $derived([
		...ctx.cultivars.inheritedCollections,
		...ownedCollections
	]);
	const ownedCollectionIds = $derived(
		new Set(ownedCollections.map((collection) => collection.id))
	);
	const cultivars = $derived(ctx.cultivars.storedCultivars);

	const selectedCollection = $derived(
		editor.selection?.kind === 'collection'
			? collections.find((collection) => collection.id === editor.selection?.id)
			: undefined
	);
	const selectedCultivar = $derived(
		editor.selection?.kind === 'cultivar'
			? cultivars.find((cultivar) => cultivar.id === editor.selection?.id)
			: undefined
	);

	/** Collections which may be the parent of the selected collection: not itself or its descendants. */
	const collectionParentOptions = $derived(
		collections.filter(
			(collection) =>
				collection.id !== selectedCollection?.id &&
				!collection.ancestorIds.has(selectedCollection?.id ?? '')
		)
	);

	/** Cultivars which may be the parent of the shown cultivar: in its collection or an ancestor's. */
	function cultivarParentOptions(collectionId: string, excludeId?: string) {
		const collection = collections.find((entry) => entry.id === collectionId);
		const scope = new Set([collectionId, ...(collection?.ancestorIds ?? [])]);
		return cultivars.filter(
			(cultivar) => scope.has(cultivar.collectionId) && cultivar.id !== excludeId
		);
	}

	/** Seed the update forms whenever the selected entity changes. */
	$effect(() => {
		if (selectedCollection) {
			editor.collectionUpdate.reset({
				name: selectedCollection.name,
				visibility: selectedCollection.visibility as 'HIDDEN' | 'UNLISTED' | 'PUBLIC',
				description: selectedCollection.description,
				tags: [...selectedCollection.tags],
				parentId: selectedCollection.parentId
			});
		}
	});
	$effect(() => {
		if (selectedCultivar) {
			editor.cultivarUpdate.reset({
				name: selectedCultivar.name,
				names: [...selectedCultivar.names],
				category: selectedCultivar.category,
				tags: [...selectedCultivar.tags],
				abbreviation: selectedCultivar.abbreviation,
				scientificName: selectedCultivar.scientificName ?? undefined,
				description: selectedCultivar.description,
				parentId: selectedCultivar.parentId,
				attributes: attributesFromStored(selectedCultivar.attributes)
			});
		}
	});

	/** Downloads the selected collection and its cultivars as a JSON file. */
	function exportSelectedCollection() {
		if (!selectedCollection) return;
		const collectionExport = exportCultivarCollection(
			selectedCollection,
			cultivars.filter((cultivar) => cultivar.collectionId === selectedCollection.id)
		);
		const url = URL.createObjectURL(
			new Blob([JSON.stringify(collectionExport, null, 2)], {
				type: 'application/json'
			})
		);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${selectedCollection.slug}.json`;
		link.click();
		URL.revokeObjectURL(url);
	}

	let importInput: HTMLInputElement | null = $state(null);

	/** True when the shown collection or cultivar belongs to an inherited collection. */
	const isInherited = $derived(
		selectedCollection
			? !ownedCollectionIds.has(selectedCollection.id)
			: selectedCultivar
				? !ownedCollectionIds.has(selectedCultivar.collectionId)
				: false
	);

	/** The collection new cultivars are added to: the one selected, if the garden owns it. */
	const targetCollectionId = $derived.by(() => {
		const selectedId = selectedCollection?.id ?? selectedCultivar?.collectionId;
		return selectedId && ownedCollectionIds.has(selectedId)
			? selectedId
			: ownedCollections[0]?.id;
	});

	/** Starts a cultivar in the garden's collection which inherits the shown one, to change it for this garden. */
	function overrideSelectedCultivar() {
		if (!selectedCultivar || !targetCollectionId) return;
		editor.startCreation({
			kind: 'cultivar',
			collectionId: targetCollectionId,
			seed: {
				name: selectedCultivar.name,
				abbreviation: selectedCultivar.abbreviation,
				parentId: selectedCultivar.id
			}
		});
	}
</script>

<div class="relative flex h-full w-full flex-col">
	<div class="border-neutral-5 flex flex-wrap items-center gap-2 border-b px-2 py-3">
		<Button.Root size="sm" onclick={() => editor.startCreation({ kind: 'collection' })}>
			Add collection
		</Button.Root>
		<Button.Root
			size="sm"
			variant="outline"
			disabled={!targetCollectionId}
			onclick={() =>
				targetCollectionId &&
				editor.startCreation({ kind: 'cultivar', collectionId: targetCollectionId })}
		>
			Add cultivar
		</Button.Root>
		<Button.Root size="sm" variant="outline" onclick={() => importInput?.click()}>
			Import JSON
		</Button.Root>
		<input
			bind:this={importInput}
			type="file"
			accept="application/json,.json"
			class="hidden"
			onchange={(event) => {
				const file = event.currentTarget.files?.[0];
				if (file) editor.importCollectionFile(file);
				event.currentTarget.value = '';
			}}
		/>
		{#if selectedCollection}
			<Button.Root size="sm" variant="outline" onclick={exportSelectedCollection}>
				Export JSON
			</Button.Root>
			{#if !isInherited}
				<Button.Root
					size="sm"
					variant="destructive"
					onclick={() => editor.collectionDelete.execute(selectedCollection.id)}
				>
					Delete collection
				</Button.Root>
			{/if}
		{:else if selectedCultivar && !isInherited}
			<Button.Root
				size="sm"
				variant="destructive"
				onclick={() => editor.cultivarDelete.execute(selectedCultivar.id)}
			>
				Delete cultivar
			</Button.Root>
		{/if}
	</div>

	{#if editor.importError}
		<p class="text-destructive-11 px-2 py-1 text-sm">{editor.importError}</p>
	{/if}

	<div class="grow overflow-hidden">
		<Resizable.PaneGroup direction="horizontal">
			<Resizable.Pane defaultSize={35} minSize={15}>
				<ScrollArea.Root class="h-full w-full">
					<CultivarCollectionTree {collections} {cultivars} />
				</ScrollArea.Root>
			</Resizable.Pane>
			<Resizable.Handle withHandle={false} />
			<Resizable.Pane defaultSize={65} minSize={30}>
				<ScrollArea.Root class="h-full w-full">
					<div class="p-4">
						{#if editor.creation?.kind === 'collection'}
							<h2 class="mb-4 text-lg font-medium">New collection</h2>
							<CollectionForm
								form={editor.collectionCreate}
								parentOptions={collections}
								submitLabel="Create"
							/>
						{:else if editor.creation?.kind === 'cultivar'}
							<h2 class="mb-4 text-lg font-medium">New cultivar</h2>
							<CultivarForm
								form={editor.cultivarCreate}
								parentOptions={cultivarParentOptions(editor.creation.collectionId)}
								submitLabel="Create"
							/>
						{:else if selectedCollection}
							{#key selectedCollection.id}
								<h2 class="mb-4 text-lg font-medium">{selectedCollection.name}</h2>
								{#if isInherited}
									<p class="text-neutral-11 mb-4 text-sm">
										This collection is inherited by your garden and cannot be changed
										here.
									</p>
								{/if}
								<fieldset disabled={isInherited} class="contents">
									<CollectionForm
										form={editor.collectionUpdate}
										parentOptions={collectionParentOptions}
										submitLabel="Save"
									/>
								</fieldset>
							{/key}
						{:else if selectedCultivar}
							{#key selectedCultivar.id}
								<h2 class="mb-4 text-lg font-medium">{selectedCultivar.name}</h2>
								{#if isInherited}
									<div
										class="border-neutral-5 mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md border p-3 text-sm"
									>
										<span class="text-neutral-11">
											Inherited from another collection. To change it for this garden,
											make a version in your collection which builds on it.
										</span>
										<Button.Root
											size="sm"
											disabled={!targetCollectionId}
											onclick={overrideSelectedCultivar}
										>
											Override in my collection
										</Button.Root>
									</div>
								{/if}
								<fieldset disabled={isInherited} class="contents">
									<CultivarForm
										form={editor.cultivarUpdate}
										parentOptions={cultivarParentOptions(
											selectedCultivar.collectionId,
											selectedCultivar.id
										)}
										submitLabel="Save"
									/>
								</fieldset>
							{/key}
						{:else}
							<span class="italic">Select a collection or cultivar, or add one.</span>
						{/if}
					</div>
				</ScrollArea.Root>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</div>
</div>
