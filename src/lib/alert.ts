import { writable, type Writable } from 'svelte/store';

type alertType = 'info' | 'error' | 'success' | 'warning';

const icons: { [key in alertType]: string } = {
	info: 'M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z',
	success:
		'M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z',
	error:
		'M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z',
	warning:
		'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z'
};

const colors: { [key in alertType]: string } = {
	info: 'bg-slate-100 border-blue-900 text-blue-900',
	error: 'bg-red-50 border-red-800 text-red-800',
	success: 'bg-green-100 border-green-800 text-green-800',
	warning: 'bg-yellow-50 border-yellow-700 text-yellow-700'
};

const alerts: Writable<{ [key: number]: alertInfo }> = writable({});

interface alertInfo {
	icon: string;
	color: string;
	title: string;
	body: string;
}

function alertUser(type: alertType, title: string, body: string) {
	const id = Date.now();
	const info: alertInfo = {
		icon: icons[type],
		color: colors[type],
		title: title,
		body: body
	};

	alerts.update((prevAlerts) => {
		prevAlerts[id] = info;
		return prevAlerts;
	});

	(async () => {
		let time: number = 1000;
		if (type === 'error') time = 4000;
		if (type === 'info') time = 8000;

		await new Promise((res) => setTimeout(res, time));
		alerts.update((prevAlerts) => {
			delete prevAlerts[id];
			return prevAlerts;
		});
	})();
}

export { alerts, alertUser };
export type { alertType };
