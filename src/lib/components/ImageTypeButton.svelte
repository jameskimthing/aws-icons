<script lang="ts">
	import { image_type, type ImageTypes } from '$lib/icons';

	let types: ImageTypes[] = ['png', 'svg'];
</script>

<div class="flex flex-row items-center">
	<div>Choose image type:</div>
	{#each types as imageType}
		<div
			class={'ml-2 px-2 pb-1 cursor-pointer rounded ' +
				($image_type === imageType ? 'bg-orange-500' : '')}
			on:pointerup={() => image_type.set(imageType)}
		>
			{imageType}
		</div>
	{/each}
</div>
