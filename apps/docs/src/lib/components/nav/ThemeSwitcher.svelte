<script lang="ts">
	import Icon from '@iconify/svelte';
	import { mode, userPrefersMode } from 'mode-watcher';

	import { Button, DropdownMenu } from '@vdg-webapp/ui';

	type Props = {
		showLabel: boolean;
	};
	let { showLabel }: Props = $props();

	let icon = $derived(
		mode.current === 'light'
			? 'material-symbols:light-mode'
			: 'material-symbols:dark-mode'
	);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button.Root
				{...props}
				variant="ghost"
				class="flex w-full items-center {showLabel
					? 'justify-start'
					: 'justify-center'}"
			>
				<Icon {icon} class="text-neutral-11" />
				{#if showLabel}
					<span class="text-neutral-11">Theme</span>
				{/if}
			</Button.Root>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.RadioGroup bind:value={userPrefersMode.current}>
			<DropdownMenu.GroupHeading>Theme</DropdownMenu.GroupHeading>
			<DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="system">System</DropdownMenu.RadioItem>
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
