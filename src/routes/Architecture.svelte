<script lang="ts">
	import { icons, image_type, search_text, size } from '$lib/icons';
	import Icon from './Icon.svelte';

	export let category: string;
	export let icon: string;

	let src: string = '';
	$: src = icons[category]?.architecture?.[icon]?.[$size]?.[$image_type] ?? '';

	const iconWidths = {
		16: 'width: 24px',
		32: 'width: 40px',
		48: 'width: 64px',
		64: 'width: 80px'
	};

	let show = true;
	$: show = icon.replace(' ', '').includes($search_text.toLowerCase().replace(' ', ''));
</script>

{#if show}
	<div class="flex flex-col w-min my-2 mx-5 items-center text-center" style={iconWidths[$size]}>
		<div class="w-max h-max">
			<Icon icon={src} />
		</div>
		<div class="">{icon}</div>
	</div>
{/if}
