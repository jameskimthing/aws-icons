<script lang="ts">
	import { alertUser } from '$lib/alert';
	import { image_type } from '$lib/icons';

	export let icon: string;

	let base: string = 'data:image/png;base64,';
	$: base = $image_type === 'png' ? 'data:image/png;base64,' : 'data:image/svg+xml;base64,';

	let image: HTMLImageElement;
	async function copyBase64ToClipboard() {
		if ($image_type === 'svg') {
			const res = await fetch(base + icon);
			const svgText = await res.text();
			await navigator.clipboard.writeText(svgText);
		} else {
			try {
				let url = base + icon;
				const blob = await (await fetch(url)).blob();
				navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
			} catch (_) {
				window.getSelection()!.removeAllRanges();
				let range = document.createRange();
				range.selectNode(image);
				window.getSelection()!.addRange(range);
				document.execCommand('copy');
				window.getSelection()!.removeAllRanges();
			}
		}
		alertUser('success', 'Success', `Copied ${$image_type} to clipboard`);
	}
</script>

<div
	class="w-fit h-fit p-1 rounded cursor-pointer text-xs hover:bg-orange-500 active:bg-orange-900"
	on:pointerup={copyBase64ToClipboard}
>
	<img bind:this={image} src={base + icon} alt="(none)" />
</div>
