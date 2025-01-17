<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { DateValue, DateDuration } from '@internationalized/date';
	import DatePicker from '$components/ui/datepicker';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import iconIds from '$lib/assets/icons';
	import { type TimelineSelection } from '../timelineSelection.svelte';
	import type { ButtonVariant } from '$lib/components/ui/button';
	import { IsMobile } from '$state/isMobile.svelte';

	type Props = {
		selection: TimelineSelection;
	};
	let { selection }: Props = $props();

	const isMoble = new IsMobile();
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
				{onclick}
			>
				<Icon icon={iconId} width="1.5rem" class="m-1" />
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content>
			{tooltipDescription}
		</Tooltip.Content>
	</Tooltip.Root>
{/snippet}

<div class="flex flex-row items-center justify-between px-1 py-2 sm:px-4">
	<div class="">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<DatePicker
					value={selection.beginSelection}
					compact={isMoble.current}
					onValueChange={(newVal) => {
						if (newVal) {
							selection.changeBeginSelection(newVal);
						}
					}}
					minValue={selection.focus.subtract(selection.maxSelectOffset)}
					maxValue={selection.focus.subtract(selection.minSelectOffset)}
				/>
			</Tooltip.Trigger>
			<Tooltip.Content>Beginning date of timeline selection</Tooltip.Content>
		</Tooltip.Root>
	</div>
	<div class="flex flex-row items-center justify-center px-2 sm:px-4 md:px-8">
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
		{@render button(
			'Reset timeline range',
			iconIds.timelineSelectorShrinkIcon,
			'outline',
			() => selection.resetSliderRange()
		)}
		<div class="mx-4">
			<Tooltip.Root>
				<Tooltip.Trigger>
					<DatePicker
						value={selection.focus}
						compact={isMoble.current}
						onValueChange={(newDate: DateValue | undefined) => {
							console.log(newDate);
							if (newDate) {
								selection.refocus(newDate);
							}
						}}
					/>
				</Tooltip.Trigger>
				<Tooltip.Content>Focused date</Tooltip.Content>
			</Tooltip.Root>
		</div>
		{@render button('Reset timeline selection', iconIds.homeIcon, 'outline', () =>
			selection.reset()
		)}
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
	</div>
	<div>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<DatePicker
					value={selection.endSelection}
					compact={isMoble.current}
					onValueChange={(newVal) => {
						if (newVal) {
							selection.changeEndSelection(newVal);
						}
					}}
					minValue={selection.focus.add(selection.minSelectOffset)}
					maxValue={selection.focus.add(selection.maxSelectOffset)}
				/>
			</Tooltip.Trigger>
			<Tooltip.Content>Ending date of timeline selection</Tooltip.Content>
		</Tooltip.Root>
	</div>
</div>
