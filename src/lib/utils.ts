async function convertSvgToPng(baseSvg: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const svgData = 'data:image/svg+xml;base64,' + baseSvg;
		// const svgData = URL.createObjectURL(new Blob([baseSvg], { type: 'image/svg+xml' }));
		const image = new Image();
		image.onload = async () => {
			const canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;

			const context = canvas.getContext('2d');
			context?.drawImage(image, 0, 0, canvas.width, canvas.height);

			const pngBase64 = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
			resolve(pngBase64);
		};
		image.onerror = reject;
		image.src = svgData;
	});
}

async function resizeSvg(baseSvg: string, newDimension: number) {
	const decodedSvg = window.atob(baseSvg); // decode base64 string to normal string
	const parser = new DOMParser();
	const svgElement = parser.parseFromString(decodedSvg, 'image/svg+xml').querySelector('svg');

	svgElement!.setAttribute('width', `${newDimension}px`);
	svgElement!.setAttribute('height', `${newDimension}px`);

	const modifiedSvg = new XMLSerializer().serializeToString(svgElement!);
	const encodedSvg = window.btoa(modifiedSvg); // encode modified string back to base64

	return encodedSvg;
}

function cat(s: string) {
	const val = s
		.toLowerCase()
		.replaceAll('-', ' ')
		.replace(' and', '')
		.replace('arch category_', '')
		.replace('arch_', '')
		.replace('res_', '');
	if (val === 'lot') return 'internet of things';
	if (val === 'app integration') return 'application integration';
	return val;
}

export { convertSvgToPng, cat, resizeSvg };
