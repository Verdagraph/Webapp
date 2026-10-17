<script lang="ts">
	import { exportCultivarCollection } from '@vdg-webapp/models';

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
		if (
			ctx.cultivars.collections.some(
				(collection) => collection.id === defaultCollectionId
			)
		) {
			defaultApplied = true;
			editor.select({ kind: 'collection', id: defaultCollectionId });
		}
	});

	const collections = $derived(ctx.cultivars.collections);
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
			editor.collectionUpdate.form.reset({
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
			editor.cultivarUpdate.form.reset({
				name: selectedCultivar.name,
				abbreviation: selectedCultivar.abbreviation,
				scientificName: selectedCultivar.scientificName ?? undefined,
				description: selectedCultivar.description,
				parentId: selectedCultivar.parentId,
				attributes: JSON.parse(JSON.stringify(selectedCultivar.attributes ?? {}))
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

	/** The collection new cultivars are added to. */
	const targetCollectionId = $derived(
		selectedCollection?.id ?? selectedCultivar?.collectionId
	);
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
			<Button.Root
				size="sm"
				variant="destructive"
				onclick={() => editor.collectionDelete.handler.execute(selectedCollection.id)}
			>
				Delete collection
			</Button.Root>
		{:else if selectedCultivar}
			<Button.Root
				size="sm"
				variant="destructive"
				onclick={() => editor.cultivarDelete.handler.execute(selectedCultivar.id)}
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
								form={editor.collectionCreate.form}
								handler={editor.collectionCreate.handler}
								parentOptions={collections}
								submitLabel="Create"
							/>
						{:else if editor.creation?.kind === 'cultivar'}
							<h2 class="mb-4 text-lg font-medium">New cultivar</h2>
							<CultivarForm
								form={editor.cultivarCreate.form}
								handler={editor.cultivarCreate.handler}
								parentOptions={cultivarParentOptions(editor.creation.collectionId)}
								submitLabel="Create"
							/>
						{:else if selectedCollection}
							{#key selectedCollection.id}
								<h2 class="mb-4 text-lg font-medium">{selectedCollection.name}</h2>
								<CollectionForm
									form={editor.collectionUpdate.form}
									handler={editor.collectionUpdate.handler}
									parentOptions={collectionParentOptions}
									submitLabel="Save"
								/>
							{/key}
						{:else if selectedCultivar}
							{#key selectedCultivar.id}
								<h2 class="mb-4 text-lg font-medium">{selectedCultivar.name}</h2>
								<CultivarForm
									form={editor.cultivarUpdate.form}
									handler={editor.cultivarUpdate.handler}
									parentOptions={cultivarParentOptions(
										selectedCultivar.collectionId,
										selectedCultivar.id
									)}
									submitLabel="Save"
								/>
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
