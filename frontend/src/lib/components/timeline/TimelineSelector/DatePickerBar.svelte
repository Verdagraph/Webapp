<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { DateValue, DateDuration } from '@internationalized/date';
	import DatePicker from '$components/ui/datepicker';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import iconIds from '$lib/assets/icons';
	import { type TimelineSelection } from '../timelineSelection.svelte';

	type Props = {
		selection: TimelineSelection;
	};
	let { selection }: Props = $props();
</script>

<!-- Timeline selection translation buttons. -->
{#snippet button(tooltipDescription: string, iconId: string, onclick: () => void)}
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Button
				variant="default"
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

<div class="flex flex-row items-center justify-between px-4 py-2">
	<div class="">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<DatePicker
					value={selection.beginSelection}
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
	<div class="flex flex-row items-center justify-center px-8">
		{@render button(
			'Rewind selection one month',
			iconIds.verdagraphMonthReverseIcon,
			() =>
				selection.translate({
					months: -1
				})
		)}
		{@render button(
			'Rewind selection one week',
			iconIds.verdagraphWeekReverseIcon,
			() =>
				selection.translate({
					weeks: -1
				})
		)}
		{@render button('Rewind selection one day', iconIds.verdagraphDayReverseIcon, () =>
			selection.translate({ days: -1 })
		)}
		<div class="mx-4">
			<Tooltip.Root>
				<Tooltip.Trigger>
					<DatePicker
						value={selection.focus}
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
		{@render button('Forward selection one day', iconIds.verdagraphDayForwardIcon, () =>
			selection.translate({ days: 1 })
		)}
		{@render button(
			'Forward selection one week',
			iconIds.verdagraphWeekForwardIcon,
			() => selection.translate({ weeks: 1 })
		)}
		{@render button(
			'Forward selection one month',
			iconIds.verdagraphMonthForwardIcon,
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
