import type JSZip from 'jszip';
import { icons } from './icons';
import { cat } from './utils';

async function loadResourceIcon(unzipped: JSZip, relativePath: string) {
	const path = relativePath.split('/');
	if (path.length < 4) return console.log(' ---- ERROR ' + relativePath);

	// 1: category, 2: theme, 3: name
	const category = cat(path[1]);
	const theme = path[2].toLowerCase().replace('res_48_', '') as 'dark' | 'light';
	const fileName = path[3]
		.toLowerCase()
		.replace('res_', '')
		.replace('_light', '')
		.replace('_dark', '')
		.replace('_48', '')
		.replaceAll('-', ' ')
		.replaceAll('amazon ', '')
		.replaceAll('aws ', '')
		// Special cases
		// Databases
		.replace('database_rds ', 'rds_')
		.replace('rds ', 'rds_')
		.replace('aurora ', 'aurora_')
		.replace('aurora_aurora_', 'aurora_')
		.replace('aurora_rds_', 'rds_')

		// Analytics
		.replace('data exchange ', 'data exchange_')

		// Networking content delivery
		.replace('route 53 ', 'route 53_')
		.replace('cloud map ', 'cloud map_')
		.replace('direct connect ', 'direct connect_')
		.replace('app mesh ', 'app mesh_')

		// Storage
		.replace('simple storage service glacier_', 'simple storage service_glacier')

		// iot
		.replace('iot ', 'iot_')
		.replace('iot_fire tv_', 'iot_fire_tv ');

	let name = fileName.replace('.png', '').replace('.svg', '');
	// name.replace('aurora ', 'aurora_');

	// Add icon to global "icons"
	const format = fileName.includes('.png') ? 'png' : 'svg';
	const split = name.split('_');

	let under = '';
	if (split.length === 2) {
		under = split[0];
		name = split[1];
	} else if (split.length === 3) {
		under = split[0] + ' ' + split[1];
		name = split[2];
	}

	// Add object if not exist
	icons[category] ??= {};
	icons[category]['resource'] ??= {};
	icons[category]['resource']![under] ??= {};
	icons[category]['resource']![under][name] ??= { dark: {}, light: {} };

	icons[category]['resource']![under][name][theme]![format] =
		(await unzipped.file(relativePath)?.async('base64')) ?? '';
}

export { loadResourceIcon };
