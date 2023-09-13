<script lang="ts">
	import ImageTypeButton from '$lib/components/ImageTypeButton.svelte';
	import SizeButton from '$lib/components/SizeButton.svelte';
	import { icons, is_searching_categories, search_text } from '$lib/icons';
	import { is_loading, load, loaded_count, stage } from '$lib/load';
	import Category from './Category.svelte';

	load();
</script>

<section
	class="fixed top-10 inset-x-20 mx-auto bg-slate-900 h-64 sm:h-56 rounded-3xl items-center z-10"
>
	<div class="flex flex-col w-fit items-start mx-auto">
		<div class="flex flex-col items-center">
			<div class="pt-5 pb-3 text-lg sm:text-3xl">Search:</div>
			<input class="text-black bg-slate-300 rounded" bind:value={$search_text} />
			<div class="pb-1 pt-1 pl-3 text-sm sm:text-base">
				<input type="checkbox" bind:checked={$is_searching_categories} />
				Search only for categories?
			</div>
		</div>
		<div class="py-2">
			<ImageTypeButton />
		</div>
		<SizeButton />
	</div>
</section>

<div class="py-32" />
<section class="italic text-gray-300 mb-6">
	The icons have been directly sourced from the official site. Despite this, it may have some
	inconsistencies due to the limitations of the official pack itself. When copying an svg, it will
	be copied as: xml + svg. If the site has any problems, please contact me at
	jameskimjaewon.abc@gmail.com
</section>

{#if $is_loading}
	<div class="text-2xl p-16 flex flex-col">
		<div>{$stage}</div>
		<div>{$loaded_count !== 0 ? `Loaded ${$loaded_count} items` : ''}</div>
	</div>
{:else}
	<div class="w-full">
		{#each Object.entries(icons) as [category, content] (category)}
			<Category {category} />
		{/each}
	</div>
{/if}
