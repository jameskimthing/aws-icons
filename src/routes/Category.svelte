<script lang="ts">
	import { icons, image_type, is_searching_categories, search_text, size } from '$lib/icons';
	import { onMount } from 'svelte';
	import Architecture from './Architecture.svelte';
	import Icon from './Icon.svelte';
	import Resource from './Resource.svelte';

	export let category: string;

	let icon: string = '';
	$: icon = icons?.[category]?.icon?.[$size]?.[$image_type] ?? '';

	let architectureIcons = icons[category]['architecture'] ?? {};
	let resourceIcons = icons[category]['resource'] ?? {};

	let showCategory = true;
	$: showCategory = shouldShowCategory($is_searching_categories, $search_text);
	function shouldShowCategory(isSearchingCategories: boolean, searchText: string) {
		if (isSearchingCategories) {
			if (!category.replace(' ', '').includes(searchText.toLowerCase().replace(' ', ''))) {
				return false;
			}
		}
		return true;
	}

	// let children: HTMLDivElement;
	let height: number;
	let showCategoryTitle: boolean = true;
	function shouldShowCategoryTitle(h?: number) {
		if (typeof h === 'undefined') return true;
		return h !== 0 || $is_searching_categories;
	}

	$: showCategoryTitle = shouldShowCategoryTitle(height);
</script>

{#if showCategory}
	{#if showCategoryTitle}
		<section class="flex flex-row p-2 pr-8 mb-2 border-b-2 border-white w-fit items-center">
			{#if category !== 'general icons'}
				<Icon {icon} />
			{/if}
			<div class="pl-4 text-3xl">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
		</section>
	{/if}

	{#if !$is_searching_categories}
		<section bind:clientHeight={height}>
			<div class="flex flex-row flex-wrap">
				{#each Object.entries(architectureIcons) as [icon, content]}
					<Architecture {icon} {category} />
				{/each}
			</div>

			<div class="flex flex-row flex-wrap">
				{#each Object.entries(resourceIcons) as [under, content]}
					<Resource {under} {category} />
				{/each}
			</div>
		</section>
		{#if showCategoryTitle}
			<div class="w-1/2 mx-auto border-b-2 my-12 border-gray-500 mb-8" />
		{/if}
	{/if}
{/if}
