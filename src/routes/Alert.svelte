<script lang="ts">
	import { alerts } from '$lib/alert';
	import { fly } from 'svelte/transition';
</script>

<div class="fixed bottom-5 left-5 z-50">
	{#each Object.entries($alerts) as [key, info] (key)}
		<section in:fly={{ x: -200, duration: 200 }} out:fly={{ x: -200, duration: 400 }} class="pb-4">
			<div class={'border-t-4 ' + info['color']}>
				<div class="rounded-b px-4 py-3 shadow-md" role="alert">
					<div class="flex">
						<div class="py-1">
							<svg
								class="h-6 w-6 mr-4"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path d={info['icon']} fill-rule="evenodd" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="w-80">
							<p class="font-bold">{info['title']}</p>
							<p class="text-sm whitespace-normal">{info['body']}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	{/each}
</div>
