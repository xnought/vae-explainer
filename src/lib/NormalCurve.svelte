<script>
	import * as d3 from "d3";
	function normal(x, mean, stddev) {
		const variance = stddev ** 2;
		const a = 1 / Math.sqrt(2 * Math.PI * variance);
		const b = (x - mean) ** 2 / variance;
		return a * Math.exp(-0.5 * b);
	}

	function generate(domain, numPoints, mean, stddev) {
		const [start, end] = domain;
		const dx = (end - start) / numPoints;
		let result = [];
		for (let i = 0; i < numPoints; i++) {
			const x = start + i * dx;
			const y = normal(x, mean, stddev);
			result.push({ x, y });
		}
		return result;
	}

	export let width = 100;
	export let height = 50;
	export let domain = [-1, 1];
	export let x = 0;
	export let mean = 0;
	export let stddev = 1;
	export let c = 5;
	export let numPoints = 100;

	function maxPoint(points) {
		let max = -1;
		for (let i = 0; i < points.length; i++) {
			if (points[i].y >= max) {
				max = points[i].y;
			}
		}
		return max;
	}

	$: points = generate(domain, numPoints, mean, stddev);
	$: scaleX = d3.scaleLinear().domain(domain).range([0, width]);
	$: scaleY = d3
		.scaleLinear()
		.domain([0, maxPoint(points)])
		.range([height, 0]);
</script>

<svg {width} {height} style="overflow: visible;">
	{#each points as p, i}
		{#if i < points.length - 1}
			<line
				x1={scaleX(p.x)}
				y1={scaleY(p.y)}
				x2={scaleX(points[i + 1].x)}
				y2={scaleY(points[i + 1].y)}
				stroke="var(--pink)"
				stroke-width={2}
				opacity={0.5}
			/>
		{/if}
	{/each}
	<line
		x1={scaleX(x)}
		y1={0}
		x2={scaleX(x)}
		y2={height}
		stroke="grey"
		opacity={0.2}
	/>
	<circle
		cx={scaleX(x)}
		cy={scaleY(normal(x, mean, stddev))}
		fill="var(--pink)"
		r={2}
	/>
</svg>

<style>
	svg {
	}
	/*  put stuff here */
</style>
