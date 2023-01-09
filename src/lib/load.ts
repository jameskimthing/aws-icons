async function load() {
	const service_icons: { [key: string]: { [key: string]: string } } = {};
	const category_icons: { [key: string]: string } = {};
	const resource_icons: { [key: string]: { [key: string]: string } } = {};

	const service_modules = import.meta.glob('$lib/aws/service-icons/**/*.svg', { as: 'raw' });
	for (const path in service_modules) {
		const arr = path.split('/');

		const category = arr[arr.length - 2];
		const service = arr[arr.length - 1].split('.')[0];

		if (!service_icons[category]) service_icons[category] = {};
		service_icons[category][service] = await service_modules[path]();
	}

	const category_modules = import.meta.glob('$lib/aws/category-icons/*.svg', { as: 'raw' });
	for (const path in category_modules) {
		const arr = path.split('/');

		const category = arr[arr.length - 1].split('.')[0];

		category_icons[category] = await category_modules[path]();
	}

	const resource_modules = import.meta.glob('$lib/aws/resource-icons/**/*.svg', { as: 'raw' });
	for (const path in resource_modules) {
		const arr = path.split('/');

		const category = arr[arr.length - 2];
		const resource = arr[arr.length - 1].split('.')[0];

		if (!resource_icons[category]) resource_icons[category] = {};
		resource_icons[category][resource] = await resource_modules[path]();
	}

	return organize({
		service_icons: service_icons,
		category_icons: category_icons,
		resource_icons: resource_icons
	});
}

interface structure {
	service_icons: {
		[key: string]: {
			[key: string]: string;
		};
	};
	category_icons: {
		[key: string]: string;
	};
	resource_icons: {
		[key: string]: {
			[key: string]: string;
		};
	};
}

function organize(icons: structure) {
	const all_icons: {
		[key: string]: {
			resource_icons: { [key: string]: string };
			service_icons: { [key: string]: string };
			icon: string;
		};
	} = {};

	// Check for categories not in category_icons
	for (const service_category in icons['service_icons']) {
		if (!Object.keys(icons['category_icons']).includes(service_category)) {
			icons['category_icons'][service_category] = service_category;
		}
	}

	for (const resource_category in icons['resource_icons']) {
		if (!Object.keys(icons['category_icons']).includes(resource_category)) {
			icons['category_icons'][resource_category] = resource_category;
		}
	}

	// For all icons in category_icons
	for (const category in icons['category_icons']) {
		if (!all_icons[category]) {
			all_icons[category] = {
				resource_icons: {},
				service_icons: {},
				icon: icons['category_icons'][category]
			};
		}

		all_icons[category]['service_icons'] = icons['service_icons'][category];
		all_icons[category]['resource_icons'] = icons['resource_icons'][category];
	}

	return all_icons;
}

export { load };
