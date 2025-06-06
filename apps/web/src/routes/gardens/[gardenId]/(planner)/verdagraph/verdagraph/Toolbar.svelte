<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Menubar, iconIds } from '@vdg-webapp/ui';

	import { toolbox } from './tools';
	import { getVerdagraphContext } from './verdagraphContext.svelte';

	const verdagraphContext = getVerdagraphContext();
</script>

{#snippet menuButton(label: string, iconId: string, onclick: () => void)}
	<Menubar.Item {onclick}>
		<div class="flex w-full items-center justify-between">
			<span> {label} </span>
			<Icon icon={iconId} width="1rem" />
		</div>
	</Menubar.Item>
{/snippet}
<Menubar.Root
	class="border-neutral-8 justify-center border-0 border-b md:justify-start"
>
	<!-- Select Menu -->
	<Menubar.Menu>
		<Menubar.Trigger>Select</Menubar.Trigger>
	</Menubar.Menu>

	<!-- Edit Menu -->
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			{@render menuButton('Add', iconIds.verdagraphAddIcon, () =>
				toolbox.activate('plantsCreate')
			)}
			{@render menuButton('Translate', iconIds.verdagraphTranslateIcon, () =>
				toolbox.activate('translate')
			)}
			{@render menuButton('Delete', iconIds.verdagraphDeleteIcon, () =>
				toolbox.activate('delete')
			)}
		</Menubar.Content>
	</Menubar.Menu>

	<!-- Observe Menu -->
	<Menubar.Menu>
		<Menubar.Trigger>Observe</Menubar.Trigger>
		<Menubar.Content>
			{@render menuButton('Seed', iconIds.verdagraphRecordSeedIcon, () =>
				toolbox.activate('observe')
			)}
			{@render menuButton('Germination', iconIds.verdagraphRecorcGerminationicon, () =>
				toolbox.activate('observe')
			)}
			{@render menuButton('Harvest', iconIds.verdagraphRecordHarvestIcon, () =>
				toolbox.activate('observe')
			)}
			{@render menuButton('Expire', iconIds.verdagraphRecordExpireIcon, () =>
				toolbox.activate('observe')
			)}
			{@render menuButton('Transplant', iconIds.verdagraphRecordTransplantIcon, () =>
				toolbox.activate('observe')
			)}
			{@render menuButton('Note', iconIds.verdagraphRecordNoteIcon, () =>
				toolbox.activate('observe')
			)}
		</Menubar.Content>
	</Menubar.Menu>

	<!-- Tools Menu -->
	<Menubar.Menu>
		<Menubar.Trigger>Tools</Menubar.Trigger>
		<Menubar.Content>
			{@render menuButton('Groups', iconIds.verdagraphGroupIcon, () =>
				toolbox.activate('groups')
			)}
			{@render menuButton('Patterns', iconIds.verdagraphPatternsIcon, () =>
				toolbox.activate('patterns')
			)}
			{@render menuButton('Generators', iconIds.verdagraphGeneratorsIcon, () =>
				toolbox.activate('generators')
			)}
		</Menubar.Content>
	</Menubar.Menu>

	<!-- View Menu -->
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<!-- Content pane toggles. -->
			<Menubar.Group>
				<Menubar.CheckboxItem
					bind:checked={verdagraphContext.layoutEnabled}
					disabled={!verdagraphContext.treeEnabled &&
						!verdagraphContext.calendarEnabled}
				>
					<div class="flex w-full items-center justify-between">
						<span> Layout </span>
						<Icon icon={iconIds.verdagraphLayoutIcon} width="1rem" />
					</div>
				</Menubar.CheckboxItem>
				<Menubar.CheckboxItem
					bind:checked={verdagraphContext.calendarEnabled}
					disabled={!verdagraphContext.treeEnabled && !verdagraphContext.layoutEnabled}
				>
					<div class="flex w-full items-center justify-between">
						<span> Calendar </span>
						<Icon icon={iconIds.verdagraphCalendarIcon} width="1rem" />
					</div>
				</Menubar.CheckboxItem>
				<Menubar.CheckboxItem
					bind:checked={verdagraphContext.treeEnabled}
					disabled={!verdagraphContext.layoutEnabled &&
						!verdagraphContext.calendarEnabled}
				>
					<div class="flex w-full items-center justify-between">
						<span> Tree </span>
						<Icon icon={iconIds.verdagraphTreeIcon} width="1rem" />
					</div>
				</Menubar.CheckboxItem>
				<!-- Content pane direction. -->
				<Menubar.Sub>
					<Menubar.SubTrigger>Direction</Menubar.SubTrigger>
					<Menubar.SubContent>
						<Menubar.RadioGroup bind:value={verdagraphContext.contentPaneDirection}>
							<Menubar.RadioItem value="horizontal">Horizontal</Menubar.RadioItem>
							<Menubar.RadioItem value="vertical">Vertical</Menubar.RadioItem>
						</Menubar.RadioGroup>
					</Menubar.SubContent>
				</Menubar.Sub>
			</Menubar.Group>

			<Menubar.Separator />

			<Menubar.Item
				onclick={() => {
					toolbox.activate('layoutConfig');
				}}
			>
				Layout Config
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
