<script>
	export let imageUrls = [];
	export let selectedUrl;
  const width = 40;
</script>

<div class="flex gap-2">
	{#each imageUrls as src, i}
		<img
			{src}
			alt="begone yellow squigly lines"
      {width}
			class:lined={selectedUrl === src}
			on:click={() => {
				selectedUrl = src;
			}}
		/>
	{/each}
  <div class="s" style="width: {width}px; height: {width}px; background: black; opacity: {selectedUrl === 'clear' ? 1 : 0.4}; {selectedUrl === 'clear' ? 'outline: 2px solid var(--medium-blue)' : ''};" on:click={() => selectedUrl = "clear"}></div>
</div>

<style>
	.lined {
		outline: 2px solid var(--medium-blue);
		opacity: 1;
	}
  .s {
		cursor: pointer;
		border-radius: 3px;
  }

	img {
		cursor: pointer;
		border-radius: 3px;
		opacity: 0.4;
	}
</style>
