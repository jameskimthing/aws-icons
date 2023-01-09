<script lang="ts">
	import Alert from './Alert.svelte';

	export let svg: string;
	if (svg === 'General-Icons') svg = '';
	let show_alert: boolean = false;
</script>

<div
	class="cursor-pointer rounded active:bg-orange-900 hover:bg-aws-orange p-1 inline-block"
	on:pointerup={async () => {
		await navigator.clipboard.writeText(svg);
		show_alert = true;
		setTimeout(() => (show_alert = false), 1000);
	}}
>
	{@html svg}
</div>

{#if show_alert}
	<Alert text="Copied SVG Icon" />
{/if}
