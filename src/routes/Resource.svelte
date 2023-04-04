<script lang="ts">
	import { icons, type ResourceIcon } from '$lib/icons';
	import ResourceCategory from './ResourceCategory.svelte';

	export let under: string;
	export let category: string;

	let allIcons = icons[category]?.resource?.[under] ?? {};
	const chunkSize = 26;
	const keys = Object.keys(allIcons);
	const numChunks = Math.ceil(keys.length / chunkSize);
	const chunks: { [name: string]: ResourceIcon }[] = [];

	for (let i = 0; i < numChunks; i++) {
		const start = i * chunkSize;
		const end = start + chunkSize;
		const chunk = Object.fromEntries(keys.slice(start, end).map((key) => [key, allIcons[key]]));
		chunks.push(chunk);
	}
</script>

{#each chunks as resourceIcons}
	<ResourceCategory {under} {resourceIcons} />
{/each}
