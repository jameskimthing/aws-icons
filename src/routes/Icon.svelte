<script lang="ts">
	import { alertUser } from '$lib/alert';
	import { image_type } from '$lib/icons';

	export let icon: string;

	let base: string = 'data:image/png;base64,';
	$: base = $image_type === 'png' ? 'data:image/png;base64,' : 'data:image/svg+xml;base64,';

	let image: HTMLImageElement;
	async function copyBase64ToClipboard() {
		if ($image_type === 'svg') {
			try {
				const res = await fetch(base + icon);
				const svgText = await res.text();
				await navigator.clipboard.writeText(svgText);
				alertUser('success', 'Success', 'Copied SVG as text');
			} catch (_) {
				alertUser('error', 'Error!', 'Unknown error occurred');
			}
		} else {
			try {
				let url = base + icon;
				const blob = await (await fetch(url)).blob();
				navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
				alertUser('success', 'Success', 'Copied PNG to clipboard');
			} catch (_) {
				try {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d')!;
					canvas.height = image.naturalHeight;
					canvas.width = image.naturalWidth;
					ctx.drawImage(image, 0, 0);
					const dataUrl = canvas.toDataURL();
					await navigator.clipboard.writeText(dataUrl);
					alertUser(
						'info',
						'...error?',
						'Unable to copy PNG to clipboard, copied as base64 text. This seems to be cause by firefox.'
					);
				} catch (_) {
					alertUser('error', 'Error!', 'Unknown error occurred');
				}
			}
		}
	}
</script>

<div
	class="w-fit h-fit p-1 rounded cursor-pointer text-xs hover:bg-orange-500 active:bg-orange-900"
	on:pointerup={copyBase64ToClipboard}
>
	<img bind:this={image} src={base + icon} alt="(icon)" />
</div>
