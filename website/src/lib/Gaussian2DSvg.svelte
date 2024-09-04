<script>
	export let means = [0, 0];
	export let stddevs = [1, 1];
	export let scaleX;
	export let scaleY;
	export let numberOfDeviations = 1;
	export let exageration = 1;
</script>

{#each { length: numberOfDeviations } as _, i}
	<ellipse
		cx={scaleX(means[0])}
		cy={scaleY(means[1])}
		rx={exageration * 2 * stddevs[0] * (numberOfDeviations - i)}
		ry={exageration * 2 * stddevs[1] * (numberOfDeviations - i)}
		fill="var(--pink)"
		opacity={0.1 * i}
		stroke-width={1}
		stroke="black"
	/>
{/each}
