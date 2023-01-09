<script lang="ts">
	import Icon from './Icon.svelte';

	// name --> svg
	export let icons: { [key: string]: string };

	interface resources {
		[key: string]: {
			// category
			[key: string]: {
				// resource name
				dark?: string;
				light?: string;
			};
		};
	}

	let resource_icons: resources = {};

	function update_resource_icons() {
		const temp_icons: resources = {};

		// Update
		for (const full_name in icons) {
			const info: string[] = full_name.split('_');

			let category: string = '';
			let name: string = '';
			let theme: 'dark' | 'light';

			if (info.length === 3) {
				category = info[0];
				name = info[1].replaceAll('-', ' ');
				theme = info[2].toLowerCase() as 'dark' | 'light';
			} else {
				category = info[0];
				name = '';
				theme = info[1].toLowerCase() as 'dark' | 'light';
			}

			if (!temp_icons[category]) temp_icons[category] = {};
			if (!temp_icons[category][name]) temp_icons[category][name] = {};
			temp_icons[category][name][theme] = icons[full_name];
		}

		resource_icons = temp_icons;
	}

	$: icons, update_resource_icons();
</script>

{#if icons}
	<div class="flex flex-row flex-wrap justify-center">
		{#each Object.entries(resource_icons) as [category, separate_resources]}
			<div class="flex flex-col items-center">
				<div class="italic">{category}</div>

				<div class="flex flex-col items-start w-72 p-4">
					{#each Object.entries(separate_resources) as [name, themes]}
						{#if name}
							<div class="flex flex-row items-center">
								<Icon svg={themes['dark'] ?? ''} />
								<Icon svg={themes['light'] ?? ''} />
								{name}
							</div>
						{:else}
							<div class="flex flex-row items-center w-full justify-center">
								<Icon svg={themes['dark'] ?? ''} />
								<Icon svg={themes['light'] ?? ''} />
								{name}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}
