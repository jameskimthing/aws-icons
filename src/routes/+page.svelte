<script lang="ts">
	import { load } from '$lib/load';
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import ResourceIcons from './ResourceIcons.svelte';
	import ServiceIcons from './ServiceIcons.svelte';

	interface icons_structure {
		// Category
		[key: string]: {
			service_icons: {
				[key: string]: string;
			};
			resource_icons: {
				[key: string]: string;
			};
			icon: string; // Category icon
		};
	}

	let icons: icons_structure;
	let display_icons: icons_structure;
	onMount(async () => {
		icons = await load();
		display_icons = JSON.parse(JSON.stringify(icons));
	});

	let search_text: string = '';

	function search_includes(aws_icon_name: string): boolean {
		let name = aws_icon_name.toLowerCase();
		name = name.replaceAll('-', '');
		name = name.replaceAll('_', '');
		name = name.replaceAll(' ', '');

		let text = search_text.toLowerCase();
		text = text.replaceAll('-', '');
		text = text.replaceAll('_', '');
		text = text.replaceAll(' ', '');

		return name.includes(text);
	}

	function filter() {
		const temp_icons: icons_structure = {};
		for (const category in icons) {
			if (search_includes(category)) {
			}

			temp_icons[category] = {
				service_icons: {},
				resource_icons: {},
				icon: icons[category]['icon']
			};

			// Service icons
			for (const service_icon_name in icons[category]['service_icons']) {
				if (search_includes(service_icon_name)) {
					temp_icons[category]['service_icons'][service_icon_name] =
						icons[category]['service_icons'][service_icon_name];
				}
			}

			// Resource icons
			for (const resource_icon_name in icons[category]['resource_icons']) {
				if (search_includes(resource_icon_name)) {
					temp_icons[category]['resource_icons'][resource_icon_name] =
						icons[category]['resource_icons'][resource_icon_name];
				}
			}
		}

		display_icons = temp_icons;
	}

	$: search_text, filter();

	function not_empty(service: any, resource: any): boolean {
		const s = service && Object.keys(service).length !== 0;
		const r = resource && Object.keys(resource).length !== 0;
		return s || r;
	}
</script>

<!-- <div class="border-2 border-black inline-block m-10">
	Search:
	<input bind:value={search_text} />
</div> -->
<div
	class="fixed top-10 inset-x-20 mx-auto bg-slate-900 h-32 rounded-3xl flex flex-col items-center"
>
	<div class="pt-5 pb-3 text-3xl">Search:</div>
	<input class="text-black bg-slate-300 rounded" bind:value={search_text} />
	<!-- <input class="my-5 mx-auto bg-slate-300 text-black h-8 min-w-fit max-w-6xl" /> -->
</div>

<!-- <div class="my-30" /> -->
<div class="py-32" />
<div class="w-full flex flex-col items-start">
	{#if icons}
		{#each Object.entries(display_icons) as [category, content]}
			{#if not_empty(content['service_icons'], content['resource_icons'])}
				<div class="flex flex-row items-center">
					<Icon svg={content['icon']} />
					<div class="p-4 text-3xl">
						{category}
					</div>
				</div>

				<div class="w-full h-[1px] bg-slate-400 my-8" />

				<div class="flex flex-row flex-wrap items-center justify-center">
					<ServiceIcons icons={content['service_icons']} />
					<div class="w-full h-[1px] bg-slate-400 my-4" />
					<ResourceIcons icons={content['resource_icons']} />
				</div>

				<div class="my-16" />
			{/if}
		{/each}
	{:else}
		<div class="m-auto animate-spin text-4xl">Loading</div>
	{/if}
</div>
