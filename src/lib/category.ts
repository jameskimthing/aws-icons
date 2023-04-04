import type JSZip from 'jszip';
import { icons } from './icons';
import { cat } from './utils';

async function loadCategoryIcon(unzipped: JSZip, relativePath: string) {
	const path = relativePath.split('/');
	if (path.length < 3) return console.log(' ---- ERROR ' + relativePath);
	if (path[2].includes('5x')) return;

	// 1: size, 2: name
	const size = path[1].replace('Arch-Category_', '');
	const name = cat(path[2]).replace(`_${size}`, '');
	const categoryName = name.replace('.png', '').replace('.svg', '');

	icons[categoryName] ??= {};
	icons[categoryName]['icon'] ??= {};
	icons[categoryName]['icon']![size] ??= {};

	// Add icon to global "icons"
	const format = name.includes('.png') ? 'png' : 'svg';
	icons[categoryName]!['icon']![size][format] =
		(await unzipped.file(relativePath)?.async('base64')) ?? '';
}

export { loadCategoryIcon };
