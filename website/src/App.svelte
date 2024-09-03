<script>
	import { onMount } from "svelte";
	import { loadImage, loadModels, sample } from "./lib/load";
	import * as tf from "@tensorflow/tfjs";
	import MnistDigit from "./lib/digit/MnistDigit.svelte";
	import NormalCurve from "./lib/NormalCurve.svelte";
	import LatentScatter from "./lib/LatentScatter.svelte";
	import Header from "./lib/Header.svelte";

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

	const latentDims = 2;
	let canvas;
	let inDisp = Array(784).fill(0);
	let outDisp = Array(784).fill(0);
	let stddevs = Array(latentDims).fill(1);
	let means = Array(latentDims).fill(0);
	let zs = Array(latentDims).fill(0);
	onMount(async () => {
		const [enc, dec] = await loadModels();
		const img = await loadImage("/images/5.png");
		const ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		const d = ctx.getImageData(0, 0, img.width, img.height).data;

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

		enc.dispose();
		dec.dispose();

		showMemory();
	});
</script>

<Header></Header>
<main>
	<canvas bind:this={canvas} width={28} height={28}> </canvas>

	<MnistDigit data={inDisp} square={250} maxVal={1}></MnistDigit>
	{#each means as mean, i}
		{@const stddev = stddevs[i]}
		{@const z = zs[i]}
		<div>
			<NormalCurve x={z} {mean} {stddev}></NormalCurve>
		</div>
	{/each}
	<MnistDigit data={outDisp} square={250} maxVal={1}></MnistDigit>

	<LatentScatter></LatentScatter>
</main>

<style>
	main {
		padding: 10px;
	}
</style>
