<script>
	import { onDestroy, onMount } from "svelte";
	import { loadImage, loadModels, sample } from "./lib/load";
	import { Button } from "flowbite-svelte";
	import * as tf from "@tensorflow/tfjs";
	import MnistDigit from "./lib/digit/MnistDigit.svelte";
	import NormalCurve from "./lib/NormalCurve.svelte";
	import LatentScatter from "./lib/LatentScatter.svelte";
	import Header from "./lib/Header.svelte";
	import ImageSelector from "./lib/ImageSelector.svelte";
	import Trapezoid from "./Trapezoid.svelte";

	function toGrey(d) {
		const result = new Uint8ClampedArray(d.length / 4);
		for (let i = 0, j = 0; i < d.length; i += 4, j++) {
			result[j] = d[i];
		}
		return result;
	}

	function showMemory() {
		console.table(tf.memory());
	}

	async function loadImageFull(url) {
		const img = await loadImage(url);
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		const d = ctx.getImageData(0, 0, img.width, img.height).data;
		img.remove();
		canvas.remove();
		return d;
	}

	const inputOutputCanvasSize = 400;
	const images = [1, 2, 3, 4, 5, 7].map((d) => `images/${d}.png`);
	let selectedImage = "images/1.png";
	const latentDims = 2;
	let inDisp = Array(784).fill(0);
	let outDisp = Array(784).fill(0);
	let stddevs = Array(latentDims).fill(1);
	let means = Array(latentDims).fill(0);
	let zs = Array(latentDims).fill(0);

	async function forward(url) {
		const d = await loadImageFull(url);
		tf.tidy(() => {
			const x = tf.tensor(toGrey(d), [1, 784]).div(255.0);
			inDisp = x.arraySync()[0];

			const code = enc.predict(x);

			const [z, logvar, mean] = sample(code);
			stddevs = tf.exp(logvar.mul(0.5)).arraySync()[0];
			means = mean.arraySync()[0];
			zs = z.arraySync()[0];

			const xHat = dec.predict(z);
			outDisp = xHat.arraySync()[0];
		});
	}

	$: modelsExist = enc && dec;
	$: if (modelsExist) forward(selectedImage);

	let enc, dec;
	onMount(async () => {
		[enc, dec] = await loadModels();
	});
	onDestroy(() => {
		enc.dispose();
		dec.dispose();
	});
</script>

<Header></Header>
<main>
	<div class="mb-2">
		<ImageSelector imageUrls={images} bind:selectedUrl={selectedImage} />
	</div>
	<div id="tool">
		<div id="input">
			<MnistDigit data={inDisp} square={inputOutputCanvasSize} maxVal={1}
			></MnistDigit>
		</div>
		<div id="innards">
			<Trapezoid
				width={150}
				height={inputOutputCanvasSize}
				trapHeights={[inputOutputCanvasSize, 250]}
				fill="var(--pink)"
			/>
			<LatentScatter
				{stddevs}
				{means}
				width={250}
				height={250}
				sampled={zs}
				onChange={(z) => {
					tf.tidy(() => {
						const xHat = dec.predict(tf.tensor(z, [1, latentDims]));
						outDisp = xHat.arraySync()[0];
					});
				}}
			></LatentScatter>
			<Trapezoid
				width={150}
				height={inputOutputCanvasSize}
				trapHeights={[250, inputOutputCanvasSize]}
				fill="var(--light-blue)"
			/>
		</div>
		<div id="output">
			<MnistDigit data={outDisp} square={inputOutputCanvasSize} maxVal={1}
			></MnistDigit>
		</div>
	</div>
	<!-- {#each means as mean, i}
		{@const stddev = stddevs[i]}
		{@const z = zs[i]}
		<div>
			<NormalCurve x={z} {mean} {stddev}></NormalCurve>
		</div>
	{/each} -->
</main>

<div style="position: absolute; bottom: 5px; right: 5px;">
	<Button color="alternative" on:click={() => showMemory()}
		>debug mode: tf.memory()</Button
	>
</div>

<style>
	main {
		padding: 10px;
	}
	#tool {
		display: flex;
		gap: 5px;
	}
	#innards {
		display: flex;
		gap: 5px;
		align-items: center;
	}
</style>
