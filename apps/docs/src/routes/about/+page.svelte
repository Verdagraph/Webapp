<script lang="ts">
	import { Button, Input, VdgLogo, cn } from '@vdg-webapp/ui';

	import env from '$lib/env';

	type Contributor = {
		name: string;
		img: string;
	};
	const contributors: Contributor[] = [
		{ name: 'Nathaniel', img: 'static/contributors/NathanielKing.jpg' }
	];
</script>

<svelte:head>
	<title>About - Verdagraph</title>
</svelte:head>

<div class="flex h-full w-full justify-center">
	<div
		class="prose dark:prose-invert flex w-11/12 flex-col md:w-3/4 lg:w-1/2 2xl:w-3/4"
	>
		<div class="mt-12 flex w-full items-center justify-between">
			<h1 class="text-left text-3xl font-bold">
				Eco-modelling tools for collaboratively organized agriculture
			</h1>
			<div class="ml-8">
				<VdgLogo size="8rem" />
			</div>
		</div>

		<div class="not-prose mt-8 flex justify-between gap-4">
			<Button.Root variant="default" href="/demo" class="w-full"
				>Try the Demonstration</Button.Root
			>
			<Button.Root variant="default" href={env.APP_URL} class="w-full"
				>Get Started</Button.Root
			>
		</div>

		<div class="mt-8 flex flex-col">
			<p class="text-neutral-12">
				Verdagraph is a collection of open source tools that seek to empower the
				collaborative planning, tracking, and automation of agro-ecological systems.
			</p>

			<p>The goals of Verdagraph can be summarized into three points:</p>
			<ul>
				<li>
					<span class="font-bold">Garden Productivity Engine:</span>&nbspAn interactive
					model of plants and the environment which facilitates the data-driven planning
					of productive gardens and the collaborative coordination of labour at any
					scale.
				</li>
				<li>
					<span class="font-bold">Agro-Ecology Optimization Model:</span>&nbspA model
					which captures the relationship between agriculture and the broader ecological
					system, with the goal of producing a healthy abundance and diversity of food
					with minimal reliance on conditions of resource depletion and ecological
					destruction.
				</li>
				<li>
					<span class="font-bold">IoT Automation Suite:</span>&nbspAn Internet-of-Things
					(IoT) platform which serves as an extensible interface for integration with
					external APIs and a set of embedded devices designed to automate the process
					of obtaining measurements and executing tasks.
				</li>
			</ul>

			<p>
				Verdagraph has been in development since ealy 2021. Verdagraph is built with <a
					href="https://sentientism.info/">sentientist values</a
				> in mind, and as such does not consider sentient beings as acceptable subjects of
				exploitation for food or any other purpose.
			</p>

			<h2>Background</h2>

			<p>
				This section highlights the problems that Verdagraph aims to solve and the
				nature of the solutions.
			</p>

			<h3>Agriculture</h3>

			<p>
				Dictionary.com <a href="https://www.dictionary.com/browse/agriculture"
					>defines agriculture as:</a
				>
			</p>

			<blockquote>
				the science, art, or occupation concerned with cultivating land, raising crops,
				and feeding, breeding, and raising livestock; farming.
			</blockquote>

			<p>
				Verdagraph is built with <a href="https://sentientism.info/"
					>sentientist values</a
				> in mind, and as such does not consider sentient beings as acceptable subjects of
				exploitation for food or any other purpose. As a result, the word agriculture in
				the context of any Verdagraph documentation uses this definition:
			</p>

			<blockquote>
				the science, art, or occupation concerned with cultivating land and raising
				crops; farming.
			</blockquote>

			<p>The specific term "animal agriculture" retains its meaning.</p>

			<h3>Ecology</h3>

			<p>
				Merriam Webster <a href="https://www.merriam-webster.com/dictionary/ecology"
					>defines ecology as:</a
				>
			</p>

			<blockquote>
				a branch of science concerned with the interrelationship of organisms and their
				environments, the totality or pattern of relations between organisms and their
				environment.
			</blockquote>

			<p>
				In our world today, the relationship between ecology and human society is more
				important than ever. We rely on Earth's ecosystems for services that are vital
				to our existence. The Millenium Ecosystem Assessment provides <a
					href="https://earth.org/what-are-ecosystem-services/"
					>four categories
				</a> of ecosystem services:
			</p>

			<ul>
				<li>
					Provisioning services produce material resources such as food, water, fibers,
					oil, and minerals.
				</li>
				<li>
					Regulating services maintain favorable ecological, climate, and other
					conditions, such as climate regulation, flood protection, pollination, and
					water purification.
				</li>
				<li>
					Supporting services maintain the foundation of a functioning ecosytem,
					including the water cycle, nutrient cycle, and biodiversity.
				</li>
				<li>
					Cultural services provide non-material benefits such as spiritual,
					intellectual, recreational, and aesthetic values.
				</li>
			</ul>

			<p>
				Despite our reliance on these services, we maintain relationships with the
				ecologies responsible for them that are largely destructive and unsustainable.
				The combined ecological impact of all our systems of extraction, production,
				pollution, and emission amounts to a truly devastating level of resource
				depletion, biosphere destruction, climate change, and more. The situation is
				intolerable. It falls on us to figure out how we need to adapt and then to
				undertake it.
			</p>

			<p>
				A truly sustainable society requires many adaptations. Some are technological,
				including changes to what resources we depend on and what procceses we use to
				achieve our goals. Technological adaptations involve some combination of meeting
				our energy and material demands through sustainable resources and finding ways
				to reduce the amount of those resources required for the services we demand.
				Other adaptations are social, including changes to what our goals are and thus
				what services we demand and how we organize ourselves to meet them. Social
				adaptations involve the creation of human organization centered around
				solidarity, equality, and cooperation towards collective success and the equal
				interest of all individuals across species and generations.
			</p>

			<p>
				Almost all of these adaptations are interconnected, and massive in scope.
				Verdagraph focuses specifically on agriculture and its relation to ecology and
				the organization of human labour.
			</p>

			<h3>Modern Industrial Agriculture and the Ecological Alternative</h3>

			<p>
				Our modern industrial agriculture system leaves much to be desired in the way of
				ecological sustainability. To summarize this article titled <a
					href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1240832/"
					>How sustainable agriculture can address the environmental and human health
					harms of industrial agriculture:
				</a>
			</p>

			<ul>
				<li>
					The intensive use of monocultures, synthetic fertilizers, and pesticides
					causes biodiversity destruction and environmental pollution.
				</li>
				<li>
					A reliance on non-renewable fossil fuels for the production of chemical inputs
					and mechanical work, as well as the use of renewable resources such as soil
					and water faster than their rate of regeneration, creates a dependency on
					unsustainable conditions of ecological destruction.
				</li>
				<li>
					The monopolization of the means of agricultural production leads to a social
					rift between producers and consumers.
				</li>
			</ul>

			<p>
				In a sentence, the modern industrial agriculture system is dependent on systems
				which undermine the conditions required for its own existence and that of
				society.
			</p>

			<p>
				The application of ecological analysis to agriculture highlights a clear need
				for a transition to sustainable agriculture as a core sector of sustainable
				development. The concept of agro-ecology seeks to provide a framework for
				understanding the path that we need to take. The United Nations Food and
				Agriculture Organization (FAO) <a
					href="https://www.fao.org/3/i9037en/i9037en.pdf">defines agro-ecology as:</a
				>
			</p>

			<blockquote>
				Agroecology is an integrated approach that simultaneously applies ecological and
				social concepts and principles to the design and management of food and
				agricultural systems. It seeks to optimize the interactions between plants,
				animals, humans and the environment while taking into consideration the social
				aspects that need to be addressed for a sustainable and fair food system. Rather
				than tweaking the practices of unsustainable agricultural systems, agroecology
				seeks to transform food and agricultural systems, addressing the root causes of
				problems in an integrated way and providing holistic and long-term solutions.
				[Agroecology] is based on bottom-up and territorial processes, helping to
				deliver contextualised solutions to local problems. Agroecological innovations
				are based on the co-creation of knowledge, combining science with the
				traditional, practical and local knowledge of producers. By enhancing their
				autonomy and adaptive capacity, agroecology empowers producers and communities
				as key agents of change.
			</blockquote>

			<p>
				A truly sustainable transformation of our agriculture system faces great
				challenges. Possibly the greatest challenge is articulated by an article titled <a
					href="https://www.frontiersin.org/articles/10.3389/fsufs.2019.00096/full"
					>Transitioning to Sustainable Agriculture Requires Growing and Sustaining an
					Ecologically Skilled Workforce:</a
				>
			</p>

			<blockquote>
				The single greatest sustainability challenge for agriculture may well be that of
				replacing non-renewable resources with agroecologically skilled people.
			</blockquote>

			<p>
				In other words, the transition away from simple artifical ecosystems and
				non-renewable inputs to diverse ecologies integrated with renewable cycles
				requires more human labour managing more complex systems.
			</p>

			<h3>The Goals and Values of Verdagraph</h3>

			<p>In short, the goal of Verdagraph is to create tools which:</p>

			<ul>
				<li>
					Minimize the knowledge and cognitive load required to plan, track, optimize,
					and automate agro-ecological systems at any scale.
				</li>
				<li>
					Transfer the co-creation of ecological knowledge into digital models made
					freely accessible to contextualized application.
				</li>
				<li>
					Facilitate the horizontal organization of human labour through collaborative
					systems.
				</li>
				<li>
					Ultimately enhance our adaptive capacity towards a sustainable agriculture
					system by putting the means of agro-ecological production and innovation into
					the hands of everyone.
				</li>
			</ul>

			<h2>Source Code</h2>

			<p>
				You can find the source code for all Verdagraph projects at the <a
					href="https://github.com/Verdagraph">GitHub repository.</a
				>
			</p>

			<h2>Contributing</h2>
		</div>
	</div>
</div>
