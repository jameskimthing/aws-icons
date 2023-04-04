<script lang="ts">
	import { size, type Sizes } from '$lib/icons';

	let sizes: Sizes[] = [16, 32, 48, 64];
</script>

<div class="flex flex-row items-center">
	<div>Choose image size:</div>
	{#each sizes as currentSize}
		<div
			class={'ml-2 px-2 pb-1 cursor-pointer rounded ' +
				($size === currentSize ? 'bg-orange-500' : '')}
			on:pointerup={() => size.set(currentSize)}
		>
			{currentSize}
		</div>
	{/each}
</div>
