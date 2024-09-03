<script>
	import { onMount } from "svelte";
	import * as d3 from "d3";

	export let filename = "latents.json";
	export let width = 200;
	export let height = 200;

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

<canvas bind:this={canvas} {width} {height} />

<style>
	/*  put stuff here */
</style>
