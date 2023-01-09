<script lang="ts">
	import { fly } from 'svelte/transition';

	export let text: string;
</script>

<div
	transition:fly={{ x: -100, duration: 400 }}
	class="fixed bottom-5 left-5 border-4 w-96 border-aws-orange bg-slate-800 text-white p-3 text-center"
>
	{text}
</div>
