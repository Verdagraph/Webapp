<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { DateValue } from '@internationalized/date';

	import iconIds from '../../../assets/icons';
	import { Button } from '../../../core/button';
	import type { ButtonVariant } from '../../../core/button';
	import DatePicker from '../../../core/datepicker';
	import * as Popover from '../../../core/popover';
	import * as Tooltip from '../../../core/tooltip';
	import { IsMobile } from '../../../state/isMobile.svelte';

	import { type TimelineSelection } from '../timelineSelection.svelte';

	type Props = {
		selection: TimelineSelection;
	};
	let { selection }: Props = $props();

	const isMobile = new IsMobile();
</script>

<!-- Timeline selection buttons. -->
{#snippet button(
	tooltipDescription: string,
	iconId: string,
	variant: ButtonVariant,
	onclick: () => void
)}
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Button
				{variant}
				size="xsm"
				class="mx-1 flex h-fit items-center rounded-2xl p-0 outline outline-1"
				disabled={selection.disabled}
				{onclick}
			>
				<Icon icon={iconId} width="1rem" class="m-1" />
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content>
			{tooltipDescription}
		</Tooltip.Content>
	</Tooltip.Root>
{/snippet}

<!-- Timeline reverse buttons. -->
{#snippet reverseButtons()}
	{@render button(
		'Rewind selection one month',
		iconIds.verdagraphMonthReverseIcon,
		'default',
		() =>
			selection.translate({
				months: -1
			})
	)}
	{@render button(
		'Rewind selection one week',
		iconIds.verdagraphWeekReverseIcon,
		'default',
		() =>
			selection.translate({
				weeks: -1
			})
	)}
	{@render button(
		'Rewind selection one day',
		iconIds.verdagraphDayReverseIcon,
		'default',
		() => selection.translate({ days: -1 })
	)}
{/snippet}

<!-- Timeline forward buttons. -->
{#snippet forwardButtons()}
	{@render button(
		'Forward selection one day',
		iconIds.verdagraphDayForwardIcon,
		'default',
		() => selection.translate({ days: 1 })
	)}
	{@render button(
		'Forward selection one week',
		iconIds.verdagraphWeekForwardIcon,
		'default',
		() => selection.translate({ weeks: 1 })
	)}
	{@render button(
		'Forward selection one month',
		iconIds.verdagraphMonthForwardIcon,
		'default',
		() =>
			selection.translate({
				months: 1
			})
	)}
{/snippet}

<!-- Reset range button. -->
{#snippet resetRangeButton()}
	{@render button(
		'Reset timeline range',
		iconIds.timelineSelectorShrinkIcon,
		'outline',
		() => selection.resetSliderRange()
	)}
{/snippet}

<!-- Reset selection button. -->
{#snippet resetSelectionButton()}
	{@render button('Reset timeline selection', iconIds.homeIcon, 'outline', () =>
		selection.reset()
	)}
{/snippet}

<div class="flex h-12 flex-row items-center justify-between px-2 py-2 md:px-4">
	<Tooltip.Root>
		<Tooltip.Trigger>
			<DatePicker
				value={selection.beginSelection}
				compact={isMobile.current}
				onValueChange={(newVal) => {
					if (newVal) {
						selection.changeBeginSelection(newVal);
					}
				}}
				minValue={selection.focus.subtract(selection.maxSelectOffset)}
				maxValue={selection.focus.subtract(selection.minSelectOffset)}
				disabled={selection.disabled}
			/>
		</Tooltip.Trigger>
		<Tooltip.Content>Beginning date of timeline selection</Tooltip.Content>
	</Tooltip.Root>
	<div class="flex flex-row items-center justify-center">
		{#if isMobile.current}
			<Popover.Root>
				<Popover.Trigger
					class="mx-1 flex h-fit items-center rounded-2xl p-0 outline outline-1 sm:mx-2 md:mx-4"
				>
					<Icon icon={iconIds.timelineSelectorTranslateIcon} width="1rem" class="m-1" />
				</Popover.Trigger>
				<Popover.Content side="top" class="w-auto">
					{@render reverseButtons()}
					{@render forwardButtons()}
				</Popover.Content>
			</Popover.Root>
		{:else}
			<div class="flex">
				<div class="flex">
					{@render reverseButtons()}
				</div>
				<div class="ml-1 md:ml-2 lg:ml-4">
					{@render resetRangeButton()}
				</div>
			</div>
		{/if}
		<div class="md:md-2 mx-1 lg:mx-4">
			<Tooltip.Root>
				<Tooltip.Trigger>
					<DatePicker
						value={selection.focus}
						compact={isMobile.current}
						onValueChange={(newDate: DateValue | undefined) => {
							if (newDate) {
								selection.refocus(newDate);
							}
						}}
						disabled={selection.disabled}
					/>
				</Tooltip.Trigger>
				<Tooltip.Content>Focused date</Tooltip.Content>
			</Tooltip.Root>
		</div>
		{#if isMobile.current}
			<Popover.Root>
				<Popover.Trigger
					class="mx-1 flex h-fit items-center rounded-2xl p-0 outline outline-1 sm:mx-2 md:mx-4"
				>
					<Icon icon={iconIds.defaultRefreshIcon} width="1rem" class="m-1" />
				</Popover.Trigger>
				<Popover.Content side="top" class="w-auto">
					{@render resetRangeButton()}
					{@render resetSelectionButton()}
				</Popover.Content>
			</Popover.Root>
		{:else}
			<div class="flex">
				<div class="mr-1 md:mr-2 lg:mr-4">
					{@render resetSelectionButton()}
				</div>
				<div class="flex">
					{@render forwardButtons()}
				</div>
			</div>
		{/if}
	</div>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<DatePicker
				value={selection.endSelection}
				compact={isMobile.current}
				onValueChange={(newVal) => {
					if (newVal) {
						selection.changeEndSelection(newVal);
					}
				}}
				minValue={selection.focus.add(selection.minSelectOffset)}
				maxValue={selection.focus.add(selection.maxSelectOffset)}
				disabled={selection.disabled}
			/>
		</Tooltip.Trigger>
		<Tooltip.Content>Ending date of timeline selection</Tooltip.Content>
	</Tooltip.Root>
</div>
