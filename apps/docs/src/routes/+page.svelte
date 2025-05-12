<script lang="ts">
	import Icon from '@iconify/svelte';

	import type { Color } from '@vdg-webapp/tailwind-config/colors';
	import { Button, Input, VdgLogo } from '@vdg-webapp/ui';

	import LandingPageDemo from './LandingPageDemo.svelte';

	type Explainer = {
		title: string;
		points: string[];
		icon: string;
	};
	const explainers = [
		{
			title: 'Model your garden',
			points: [
				'Organize plants throughout space and time',
				'Tune recommendations to your local environmental conditions',
				'Compare multiple plans against estimated metrics of yield and eco benefit'
			],
			icon: 'mdi:plant-outline'
		},
		{
			title: 'Share your garden with others',
			points: [],
			icon: 'mdi:handshake-outline'
		},
		{
			title: 'Connect your garden to data and control',
			points: [],
			icon: 'ant-design:control-outlined'
		}
	];
</script>

<svelte:head>
	<title
		>Verdagraph - Eco-modelling tools for collaboratively organized agriculture</title
	>
</svelte:head>

{#snippet explainerSnippet(explainer: Explainer)}
	<div class="flex justify-between">
		<div class="flex h-full flex-col items-center">
			<h3 class="w-full self-start text-lg">{explainer.title}</h3>
			<ul class="self-center">
				{#each explainer.points as point}
					<li>
						{point}
					</li>
				{/each}
			</ul>
		</div>
		<div class="bg-primary-8 border-primary-10 rounded-lg border p-4">
			<Icon icon={explainer.icon} width="6rem" class="text-primary-1" />
		</div>
	</div>
{/snippet}

<div class="flex h-full w-full justify-center">
	<div class="flex w-11/12 flex-col md:w-3/4 lg:w-1/2">
		<div class="mt-12 flex w-full items-center justify-between">
			<h1 class="text-left text-2xl font-bold">
				Eco-modelling tools for collaboratively organized agriculture
			</h1>
			<div class="ml-8">
				<VdgLogo size="8rem" />
			</div>
		</div>

		<div
			class="border-neutral-6 bg-neutral-2 mt-6 aspect-video w-full rounded-lg border"
		>
			<LandingPageDemo />
		</div>

		<div class="mt-8 flex w-full flex-col gap-6">
			<div class="flex items-center justify-between">
				<h2 class="font-semibold">Project status:</h2>
				<div class="bg-neutral-6 mx-8 h-[1px] grow rounded-lg"></div>
				<span
					class="bg-crimson-4 hover:bg-crimson-5 border-crimson-6 text-crimson-12 rounded-lg border px-4 py-2 text-sm"
				>
					Early development
				</span>
			</div>

			<div class="flex flex-col gap-4">
				<h2 class="">Join the newsletter for new features and progress updates</h2>
				<div>
					<Input.Root
						type="email"
						placeholder="example@domain.com"
						class="rounded-b-none"
					/>
					<Button.Root
						variant="default"
						role="submit"
						class="border-neutral-6 w-full rounded-t-none border border-t-0"
						>Submit</Button.Root
					>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<p>
					Verdagraph is a collection of open source tools that seek to empower the
					collaborative planning, tracking, and automation of agro-ecological systems.
				</p>

				{#each explainers as explainer}
					{@render explainerSnippet(explainer)}
				{/each}
			</div>
		</div>
	</div>
</div>
