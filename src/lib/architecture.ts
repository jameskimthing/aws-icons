import type JSZip from 'jszip';
import { icons } from './icons';
import { cat } from './utils';

async function loadArchitectureIcon(unzipped: JSZip, relativePath: string) {
	const path = relativePath.split('/');
	if (path.length < 4) return console.log(' ---- ERROR ' + relativePath);
	if (path[3].includes('@5x')) return;
	if (path[3].includes('Arch_Amazon-Application-Auto-Scaling_64')) return;

	// 1: category, 2: size, 3: name
	const category = cat(path[1]);
	const size = path[2].replace('Arch_', '');
	const fileName = path[3]
		.toLowerCase()
		.replaceAll('-', ' ')
		.replace('arch_', '')
		.replace(`_${size}`, '')
		.replace('aws ', '')
		.replace('amazon ', '')
		.replace('marketplace_', '');
	let name = fileName.replace('.png', '').replace('.svg', '');
	if (name.charAt(0) === ' ') name = name.substring(1);
	if (name.charAt(name.length - 1) === ' ') name = name.substring(0, name.length - 1);

	// Add object if not exist
	icons[category] ??= {};
	icons[category]['architecture'] ??= {};
	icons[category]['architecture']![name] ??= {};
	icons[category]['architecture']![name][size] ??= {};

	// Add icon to global "icons"
	const format = fileName.includes('png') ? 'png' : 'svg';

	// Special cases
	if (relativePath.includes('DocumentDB')) {
		if (size === '48') relativePath = relativePath.replaceAll('48', '32');
		else if (size === '32') relativePath = relativePath.replaceAll('32', '48');
	} else if (relativePath.includes('Trusted-Advisor')) {
		if (size === '48') relativePath = relativePath.replaceAll('48', '32');
		else if (size === '32') relativePath = relativePath.replaceAll('32', '48');
	}

	let toAdd = await unzipped.file(relativePath)?.async('base64');
	icons[category]!['architecture']![name][size][format] = toAdd;
}

export { loadArchitectureIcon };
