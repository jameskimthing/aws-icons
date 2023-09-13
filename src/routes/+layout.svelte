<script lang="ts">
	import { alertUser } from '$lib/alert';
	import { onMount } from 'svelte';
	import '../app.css';
	import Alert from './Alert.svelte';

	onMount(() => {
		window.onerror = function (msg, url, line, col, error: any) {
			let title: string;
			if (error?.message) title = error.message;
			else if (error?.name) title = error.name;
			else title = 'Error!';

			let body: string;
			if (error?.cause) body = JSON.stringify(error.cause);
			else if (error?.detail) body = error.detail;
			else body = 'Unknown error';

			alertUser('error', title, body);
		};

		window.onunhandledrejection = (err) => {
			let e = err.reason;

			let title: string;
			let body: string;

			if (e) {
				if (e.message) title = e.message;
				else if (e.name) title = e.name;
				else title = 'Error';

				if (e.detail) body = e.detail;
				else body = JSON.stringify(e);
			} else {
				title = 'Error';
				body = 'An unknown error has occured';
			}

			alertUser('error', title, body);
		};
	});
</script>

<svelte:head>
	<title>AWS Icons</title>
	<meta name="Organized the AWS icons in a visual way." />
</svelte:head>

<div class="bg-slate-600 text-white w-full min-h-screen p-10">
	<slot />
</div>

<Alert />
