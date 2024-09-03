<!-- https://github.com/xnought/introduction-to-autoencoders/blob/main/src/MNIST/components/mnistDigit/MnistDigit.svelte -->
<script>
	import { drawPixels } from "./mnistDigit";
	import { interpolateGreys, scaleLinear } from "d3";
	import { afterUpdate, onMount } from "svelte";

	// take in the digit data
	// export let digit: IData;
	// const { data, label } = digit;
	export let data;

	// configuration
	export let square = 250;
	const dim = 28;
	export let width = square;
	export let height = square;
	let canvasPtr; // points to the canvas in the DOM
	let ctx; // the context assigned onMount
	export let maxVal = 255;

	// create greyscale function 0 -> 1 output shade
	export let range = [1, 0];
	let colorScale = scaleLinear().domain([0, maxVal]).range(range);
	const greyScale = (value) => interpolateGreys(colorScale(value));

	// on creation paint the digit
	const redraw = () => {
		ctx.clearRect(0, 0, square, square); // clear the canvas
		drawPixels(ctx, width, dim, greyScale, data); // draw the digit on canvas
	};

	// on creation make sure to store the canvas context
	onMount(() => {
		ctx = canvasPtr.getContext("2d");
	});
	// on update of props redraw the digit
	afterUpdate(() => {
		redraw(); // when we update redraw
	});
</script>

<div>
	<canvas bind:this={canvasPtr} {width} {height} />
</div>
