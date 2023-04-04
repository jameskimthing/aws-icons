<script lang="ts">
	import {
		image_type,
		search_text,
		type ImageTypes,
		type ResourceIcon,
		type Themes
	} from '$lib/icons';
	import Icon from './Icon.svelte';

	export let under: string;
	export let resourceIcons: { [name: string]: ResourceIcon };

	function g(imageType: ImageTypes, theme: Themes, icon: ResourceIcon) {
		return icon[theme]?.[imageType] ?? '';
	}

	let iconsToShow: { [name: string]: ResourceIcon };
	$: iconsToShow = getIconsToShow(resourceIcons, $search_text);
	function getIconsToShow(icon: { [name: string]: ResourceIcon }, searchText: string) {
		if (!searchText) return icon;

		const iconsToShow: { [name: string]: ResourceIcon } = JSON.parse(JSON.stringify(icon));
		const search = searchText.toLowerCase().replace(' ', '');
		if (!under.toLowerCase().replace(' ', '').includes(search)) {
			for (const key of Object.keys(icon)) {
				if (!key.toLowerCase().replace(' ', '').includes(search)) {
					delete iconsToShow[key];
				}
			}
		}

		return iconsToShow;
	}
</script>

{#if Object.keys(iconsToShow).length !== 0}
	<div class="flex flex-col p-2 m-2">
		<div class="p-2 text-xl">
			{under}
		</div>

		<div class="flex flex-col w-fit">
			{#each Object.entries(iconsToShow) as [icon, resourceIcon]}
				<div class="flex flex-row items-center">
					<div class="flex flex-row w-24 mr-2">
						<Icon icon={g($image_type, 'dark', resourceIcon)} />
						<Icon icon={g($image_type, 'light', resourceIcon)} />
					</div>
					{icon}
				</div>
			{/each}
		</div>
	</div>
{/if}
