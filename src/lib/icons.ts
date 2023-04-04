import { writable, type Writable } from 'svelte/store';

interface CategoryIcon {
	// Will be one of: 16 32 48 64
	[size: string]: {
		png?: string;
		svg?: string;
	};
}

interface ArchitectureIcon {
	// Will be one of: 16 32 48 64
	[size: string]: {
		png?: string;
		svg?: string;
	};
}

interface ResourceIcon {
	dark?: {
		png?: string;
		svg?: string;
	};
	light?: {
		png?: string;
		svg?: string;
	};
}

interface Icons {
	[category: string]: {
		icon?: CategoryIcon;
		architecture?: { [name: string]: ArchitectureIcon };
		resource?: { [under: string]: { [name: string]: ResourceIcon } };
	};
}

type Sizes = 16 | 32 | 48 | 64;
type Themes = 'dark' | 'light';
type ImageTypes = 'png' | 'svg';

const size: Writable<Sizes> = writable(48);
const image_type: Writable<ImageTypes> = writable('png');

const icons: Icons = {};

const search_text = writable('');
const is_searching_categories = writable(false);

export { size, image_type, icons, search_text, is_searching_categories };
export type { CategoryIcon, ArchitectureIcon, ResourceIcon, Sizes, Themes, ImageTypes };
