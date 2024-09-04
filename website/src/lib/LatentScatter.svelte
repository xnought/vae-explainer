<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import NormalCurve from "./NormalCurve.svelte";
	import Gaussian2DSvg from "./Gaussian2DSvg.svelte";

	export let filename = "latents.json";
	export let width = 200;
	export let height = 200;
	export let sampled = [0, 0];
	export let onChange = (z) => {};
	export let means;
	export let stddevs;
	let sampledCopy;

	function minAndMax(points) {
		let _max = [-Infinity, -Infinity];
		let _min = [Infinity, Infinity];
		for (let i = 0; i < points.length; i++) {
			const [x, y] = points[i];
			if (x >= _max[0]) {
				_max[0] = x;
			}
			if (x < _min[0]) {
				_min[0] = x;
			}
			if (y >= _max[1]) {
				_max[1] = y;
			}
			if (y < _min[1]) {
				_min[1] = y;
			}
		}
		return {
			x: [_min[0], _max[0]],
			y: [_min[1], _max[1]],
		};
	}

	let mousePos = [0, 0];
	let canvas;
	let scaleX, scaleY;
	onMount(async () => {
		const d = await (await fetch(`/models/tfjs/${filename}`)).json();
		const extents = minAndMax(d.points);
		scaleX = d3.scaleLinear().domain(extents.x).range([0, width]);
		scaleY = d3.scaleLinear().domain(extents.y).range([height, 0]);
		drawPoints(canvas, d.points, d.labels);
	});

	function drawPoints(canvas, points, labels) {
		const ctx = canvas.getContext("2d");
		for (let i = 0; i < points.length; i++) {
			const x = scaleX(points[i][0]);
			const y = scaleY(points[i][1]);

			const c = d3.color(d3.schemeTableau10[labels[i]]);
			c.opacity = 0.2;
			ctx.fillStyle = c.rgb();
			ctx.fillRect(x, y, 2, 2);
		}
	}
</script>

<div style="position: relative;">
	{#if scaleX && scaleY}
		<svg
			{width}
			{height}
			style="position: absolute; left: 0; top: 0; "
			on:mousemove={(d) => {
				mousePos = [d.offsetX, d.offsetY];
				sampled[0] = scaleX.invert(mousePos[0]);
				sampled[1] = scaleY.invert(mousePos[1]);
				onChange(sampled);
			}}
			on:mouseenter={() => {
				sampledCopy = [...sampled];
			}}
			on:mouseleave={() => {
				sampled = sampledCopy;
				sampledCopy = undefined;
				onChange(sampled);
			}}
		>
			<Gaussian2DSvg
				{means}
				{stddevs}
				{scaleX}
				{scaleY}
				numberOfDeviations={5}
				exageration={35}
			/>
			<circle
				cx={scaleX(sampled[0])}
				cy={scaleY(sampled[1])}
				r={3}
				fill="var(--dark-blue)"
			/>
			<!-- <line
				x1={0}
				y1={scaleY(sampled[1])}
				x2={width}
				y2={scaleY(sampled[1])}
				stroke="grey"
				opacity={0.1}
			/>
			<line
				x1={scaleX(sampled[0])}
				y1={0}
				x2={scaleX(sampled[0])}
				y2={height}
				stroke="grey"
				opacity={0.1}
			/> -->
		</svg>
	{/if}
	<canvas bind:this={canvas} {width} {height} />
</div>

<style>
	canvas {
		outline: lightgrey 1px solid;
	}
</style>
