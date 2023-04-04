async function convertSvgToPng(baseSvg: string): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const svgData = 'data:image/svg+xml;base64,' + baseSvg;
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

export { convertSvgToPng, cat };
