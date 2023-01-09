<script lang="ts">
	import Icon from './Icon.svelte';

	export let icons: { [key: string]: string };
</script>

{#if icons}
	{#each Object.entries(icons) as [service_name, service_icon]}
		<div class="flex flex-col items-center text-center w-40 h-36 m-1 p-1">
			<div class="mb-2">
				<Icon svg={service_icon} />
			</div>
			<div class="">
				{service_name.replaceAll('-', ' ')}
			</div>
		</div>
	{/each}
{/if}
