<script lang="ts">
	import type Tag from '@melt-ui/svelte';
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';
	import { createTagsInput, melt } from '@melt-ui/svelte';
	import { usernamesExistQueries } from '$data/user/queries';
	import gardenFields from '$lib/backendSchema/specs/garden';

	type Props = {
		tagsInput: string[] | undefined;
		formAttrs: any;
	};

	let { tagsInput = $bindable(), formAttrs }: Props = $props();

	const {
		elements: { root, tag, input, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		unique: true,
		editable: true,
		addOnPaste: true,
		trim: true,
		maxTags: gardenFields.user_invites_list.max_length.value,
		placeholder: 'Enter a username',
		/** Sync the bindable input prop and Melt's writable store. */
		add(tag: string) {
			tagsInput?.push(tag);
			return { id: tag, value: tag };
		},
		/** The ID of the tag is the previous ID, the value is the newly set value. */
		update(tag: Tag.Tag) {
			tagsInput = tagsInput?.filter((username) => {
				return username !== tag.id;
			});
			return { id: tag.value, value: tag.value };
		},
		remove(tag: Tag.Tag) {
			tagsInput = tagsInput?.filter((username) => {
				return username !== tag.id;
			});
			return true;
		}
	});

	/** TODO: Indicate in the input whether the username exists. */
	const usernameQueries = usernamesExistQueries(
		tags.get().map((tag) => {
			return tag.value;
		})
	);
	// #if usernameQueries.some(usernameQuery => usernameQuery.queryKey)
</script>

<div
	class="border-neutral-12 bg-neutral-1 flex flex-col items-start justify-center gap-2 rounded-md border text-sm"
>
	<div
		use:melt={$root}
		class="bg-neutral-1 text-neutral-11 focus-within:ring-primary-6 flex w-full min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md px-3 py-2 focus-within:ring"
	>
		{#each $tags as t}
			<div
				use:melt={$tag(t)}
				class="bg-neutral-2 text-neutral-11 flex items-center overflow-hidden rounded-md [word-break:break-word] data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
			>
				<span class="border-neutral-5 flex items-center border-r px-1.5">{t.value}</span
				>
				<button
					use:melt={$deleteTrigger(t)}
					class="enabled:hover:bg-neutral-3 flex h-full items-center px-1"
				>
					<Icon icon={iconIds.defaultClose} width="1rem" />
				</button>
			</div>
			<div
				use:melt={$edit(t)}
				class="data-[invalid-edit]:focus:!ring-destructive-6 flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word]"
			></div>
		{/each}
		<input
			use:melt={$input}
			{...formAttrs}
			disabled={false}
			type="text"
			class="bg-neutral-1 text-neutral-11 data-[invalid]:text-destructive-6 w-full min-w-[4.5rem] shrink grow basis-0 border-0 outline-none focus:!ring-0"
		/>
	</div>
</div>
