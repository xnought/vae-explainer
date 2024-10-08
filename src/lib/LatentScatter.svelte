<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";
	import NormalCurve from "./NormalCurve.svelte";
	import Gaussian2DSvg from "./Gaussian2DSvg.svelte";
	import Digits from "./Digits.svelte";
	import { loadLatents } from "./load";

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
		const d = await loadLatents();
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
			c.opacity = 0.5;
			ctx.fillStyle = c.rgb();
			ctx.fillRect(x, y, 2, 2);
		}
	}

	const legendHeight = 50;
</script>

<div style="position: relative;">
	<svg
		{width}
		height={legendHeight}
		style="position: absolute; left: 0; top: -{legendHeight +
			5}px; overflow: visible;"
	>
		<text
			x={0}
			y={-5}
			style="font-size: 15px; font-family: Geo;"
			fill="grey">Latent Space</text
		>
		<svg
			id="left-side"
			x={0}
			y={0}
			height={legendHeight}
			width={width / 2}
			style="overflow: visible;"
		>
			<Gaussian2DSvg
				override={[10, legendHeight / 2]}
				means={[0, 0]}
				{stddevs}
				{scaleX}
				{scaleY}
				numberOfDeviations={6}
				exageration={20}
			/>
			<text
				x={25}
				y={legendHeight / 2 - 10}
				style="font-size: 10px;"
				fill="grey"
				class="geo">Means μ</text
			>
			<text
				x={25}
				y={legendHeight / 2}
				style="font-size: 8px; font-family: 'Fira Code';"
				fill="grey">[{means[0].toFixed(2)}, {means[1].toFixed(2)}]</text
			>

			<text
				x={25}
				y={legendHeight / 2 + 12}
				style="font-size: 10px;"
				fill="grey"
				class="geo">Std. Deviations σ</text
			>
			<text
				x={25}
				y={legendHeight / 2 + 22}
				style="font-size: 8px; font-family: 'Fira Code';"
				fill="grey"
				>[{stddevs[0].toFixed(2)}, {stddevs[1].toFixed(2)}]</text
			>
		</svg>
		<svg
			id="right-side"
			x={width / 2}
			y={0}
			height={legendHeight}
			width={width / 2}
		>
			<text
				x={15}
				y={legendHeight - 15}
				style="font-size: 10px;"
				fill="grey"
				class="geo">Sampled z</text
			>
			<text
				x={15}
				y={legendHeight - 5}
				style="font-size: 8px; font-family: 'Fira Code';"
				fill="grey"
				>[{sampled[0].toFixed(2)}, {sampled[1].toFixed(2)}]</text
			>
			<circle
				cx={width / 2 - 10}
				cy={legendHeight - 8}
				r={4}
				fill="var(--light-blue)"
				stroke="black"
			/>
		</svg>
	</svg>

	{#if scaleX && scaleY}
		<svg
			{width}
			{height}
			style="position: absolute; left: 0; top: 0; overflow: hidden; cursor: none;"
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
				numberOfDeviations={6}
				exageration={35}
			/>
			<circle
				cx={scaleX(sampled[0])}
				cy={scaleY(sampled[1])}
				r={4}
				fill="var(--light-blue)"
				stroke="black"
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
	<svg {width} height={20} style="position: absolute; left: 0; botton: 0;">
		<Digits x={0} y={18} />
	</svg>
</div>

<style>
	canvas {
		outline: rgba(255, 255, 255, 0.2) 1px solid;
	}
</style>
