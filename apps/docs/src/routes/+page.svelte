<script lang="ts">
	import Icon from '@iconify/svelte';

	import type { Color } from '@vdg-webapp/tailwind-config/colors';
	import { Button, Input, VdgLogo, cn } from '@vdg-webapp/ui';

	import env from '$lib/env';

	import LandingPageDemo from './LandingPageDemo.svelte';

	type Explainer = {
		title: string;
		points: string[];
		icon: string;
		iconContainerClass?: string;
		iconClass?: string;
	};
	const explainers: Explainer[] = [
		{
			title: 'Model plants and their cultivation',
			points: [
				'Organize plants throughout space and time',
				'Tune recommendations to your local environmental conditions',
				'Compare multiple plans against estimated metrics of yield and eco benefit'
			],
			icon: 'mdi:plant-outline',
			iconContainerClass: 'bg-primary-8 border-primary-10',
			iconClass: 'text-primary-1'
		},
		{
			title: 'Share your garden with others',
			points: [
				'Collaborate on garden edits with other users in real-time',
				'Assign tasks generated from models state',
				'Keep track of harvests and notify possible receipients'
			],
			icon: 'mdi:handshake-outline',
			iconContainerClass: 'bg-secondary-8 border-secondary-10',
			iconClass: 'text-secondary-1'
		},
		{
			title: 'Connect your garden to data and control',
			points: [
				'Use realtime environmental data to inform planning',
				'Intelligently control outputs such as irrigation based on model state'
			],
			icon: 'ant-design:control-outlined',
			iconContainerClass: 'bg-accent-8 border-accent-10',
			iconClass: 'text-accent-1'
		}
	];

	const developmentStatusClass = 'bg-crimson-5 border-crimson-6 text-crimson-12';
</script>

<svelte:head>
	<title
		>Verdagraph - Eco-modelling tools for collaboratively organized agriculture</title
	>
</svelte:head>

{#snippet explainerSnippet(explainer: Explainer)}
	<div class="mt-8 flex justify-between">
		<div class="flex h-full flex-col items-center">
			<h3 class="text-neutral-12 w-full self-start text-lg font-semibold">
				{explainer.title}
			</h3>
			<ul class="mt-4 flex list-disc flex-col gap-4 self-center rounded-lg p-4">
				{#each explainer.points as point}
					<li class="text-neutral-11 text-sm">
						{point}
					</li>
				{/each}
			</ul>
		</div>
		<div
			class={cn(
				explainer.iconContainerClass,
				'ml-6 flex items-center justify-center rounded-lg border p-4'
			)}
		>
			<Icon icon={explainer.icon} width="6rem" class={explainer.iconClass || ''} />
		</div>
	</div>
{/snippet}

<div class="flex h-full w-full justify-center">
	<div class="flex w-11/12 flex-col md:w-3/4 lg:w-1/2 2xl:w-3/4">
		<div class="mt-12 flex w-full items-center justify-between">
			<h1 class="text-left text-3xl font-bold">
				Eco-modelling tools for collaboratively organized agriculture
			</h1>
			<div class="ml-8">
				<VdgLogo size="8rem" />
			</div>
		</div>

		<div class="mt-8 flex justify-between gap-4">
			<Button.Root variant="default" href="/demo" class="w-full"
				>Try the Demonstration</Button.Root
			>
			<Button.Root variant="default" href={env.APP_URL} class="w-full"
				>Get Started</Button.Root
			>
		</div>

		<div
			class="border-neutral-6 bg-neutral-2 mt-6 aspect-video w-full rounded-lg border shadow-md"
		>
			<LandingPageDemo />
		</div>

		<div class="mt-8 flex w-full flex-col gap-6">
			<div class="flex items-center justify-between">
				<h2 class="text-neutral-11 font-semibold">Project status:</h2>
				<div class="bg-neutral-6 mx-8 h-[1px] grow rounded-lg"></div>
				<span class={cn(developmentStatusClass, 'rounded-lg border px-4 py-2 text-sm')}>
					Early development
				</span>
			</div>

			<div class="mt-4 flex flex-col gap-4">
				<h2 class="">Join the newsletter for new features and progress updates</h2>
				<div>
					<Input.Root
						type="email"
						placeholder="example@domain.com"
						class="rounded-b-none"
					/>
					<Button.Root
						variant="secondary"
						role="submit"
						class="border-neutral-6 w-full rounded-t-none border border-t-0"
						>Submit</Button.Root
					>
				</div>
			</div>

			<div class="bg-neutral-6 mt-4 h-[1px] grow rounded-lg"></div>

			<div class="mt-4 flex flex-col gap-8">
				<p class="text-neutral-11 italic">
					Verdagraph is a collection of open source tools that seek to empower the
					collaborative planning, tracking, and automation of agro-ecological systems.
				</p>

				{#each explainers as explainer}
					{@render explainerSnippet(explainer)}
				{/each}
			</div>
		</div>

		<div class="mt-12 flex justify-between gap-4">
			<Button.Root variant="outline" href="/about" class="w-full">Read More</Button.Root
			>
			<Button.Root variant="outline" href="/support" class="w-full"
				>Support the Project</Button.Root
			>
		</div>
	</div>
</div>
