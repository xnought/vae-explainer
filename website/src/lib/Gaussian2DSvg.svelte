<script>
	export let means = [0, 0];
	export let stddevs = [1, 1];
	export let scaleX;
	export let scaleY;
	export let numberOfDeviations = 1;
	export let exageration = 1;
  export let override = undefined;
</script>

{#each { length: numberOfDeviations } as _, i}
	<ellipse
		cx={override ? override[0] : scaleX(means[0])}
		cy={override ? override[1] : scaleY(means[1])}
		rx={exageration * stddevs[0] * (numberOfDeviations - i)}
		ry={exageration * stddevs[1] * (numberOfDeviations - i)}
		fill="var(--purple)"
		opacity={0.15 * i}
		stroke-width={1}
		stroke="black"
	/>
{/each}
