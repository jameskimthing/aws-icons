import JSZip from 'jszip';
import { loadResourceIcon } from './resource';
import { loadCategoryIcon } from './category';
import { loadArchitectureIcon } from './architecture';
import { writable } from 'svelte/store';
import { icons } from './icons';
import { convertSvgToPng, resizeSvg } from './utils';

const url =
	'https://d1.awsstatic.com/webteam/architecture-icons/q1-2023/Asset-Package_01312023.d59bb3e1bf7860fb55d4d737779e7c6fce1e35ae.zip';

const is_loading = writable(true);
const loaded_count = writable(0);
const stage = writable('Fetching data...');

async function load() {
	const zipBlob = await (await fetch(url)).blob();
	const zip = new JSZip();

	stage.set('Unzipping...');
	const unzipped = await zip.loadAsync(zipBlob);

	stage.set('Organizing...');
	for (const [relativePath, file] of Object.entries(unzipped.files)) {
		if (file.dir) continue;
		if (relativePath.includes('.DS_Store')) continue;

		const p = relativePath.split('/')[0].toLowerCase();

		if (p.includes('macos')) continue;
		else if (p.includes('resource')) await loadResourceIcon(unzipped, relativePath);
		else if (p.includes('category')) await loadCategoryIcon(unzipped, relativePath);
		else if (p.includes('architecture')) await loadArchitectureIcon(unzipped, relativePath);

		loaded_count.update((c) => c + 1);
	}

	stage.set('Last touches...');
	const sizes = [16, 32, 48, 64];
	const sizePixels = [24, 40, 64, 80];
	for (const size of sizes) {
		icons['storage']['architecture']!['snowcone'][size]['png'] = await convertSvgToPng(
			icons['storage']['architecture']!['snowcone'][size]['svg']!
		);
		if (size !== 64) {
			const toResize = sizePixels[sizes.indexOf(size)];
			icons['games']['architecture']!['lumberyard'][size] ??= {};
			icons['games']['architecture']!['lumberyard'][size]['svg'] = await resizeSvg(
				icons['games']['architecture']!['lumberyard'][64]['svg']!,
				toResize
			);
			icons['games']['architecture']!['lumberyard'][size]['png'] = await convertSvgToPng(
				icons['games']['architecture']!['lumberyard'][size]['svg']!
			);
		}
	}

	is_loading.set(false);
}

export { is_loading, loaded_count, stage };
export { load };
