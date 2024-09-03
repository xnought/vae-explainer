<script>
	export let imageUrls = [];
	export let selectedUrl;
</script>

<div class="flex gap-2">
	{#each imageUrls as src, i}
		<img
			{src}
			alt="begone yellow squigly lines"
			width={40}
			class:lined={selectedUrl === src}
			on:click={() => {
				selectedUrl = src;
			}}
		/>
	{/each}
</div>

<style>
	.lined {
		outline: 2px solid var(--pink);
		opacity: 1;
	}
	img {
		cursor: pointer;
		border-radius: 3px;
		opacity: 0.4;
	}
</style>
