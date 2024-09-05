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
	import Trapezoid from "./lib/Trapezoid.svelte";
	import Popover from "./lib/Popover.svelte";
  import { stddevs, means, randomSample } from "./lib/stores";

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

  const compGraph = true;
	const inputOutputCanvasSize = 300;
  const scatterSquare = 200;
  const trapWidth = 100;
	const images = [1, 2, 3, 4, 5, 7].map((d) => `images/${d}.png`);
	let rawImages;
	let selectedImage = "images/1.png";
	const latentDims = 2;
	let inDisp = Array(784).fill(0);
	let outDisp = Array(784).fill(0);
	//let stddevs = Array(latentDims).fill(1);
	//let means = Array(latentDims).fill(0);
	let zs = Array(latentDims).fill(0);
	let xs = Array(latentDims * 2).fill(0);

	async function fetchAllImages(urls) {
		let result = {};
		for (let i = 0; i < urls.length; i++) {
			const url = urls[i];
			const d = await loadImageFull(url);
			const g = toGrey(d);
			const f32 = new Float32Array(g.length).map((_, i) => g[i] / 255);
			result[url] = f32;
		}
		return result;
	}

	function forward(img) {
		tf.tidy(() => {
			const x = tf.tensor(img, [1, 784]);
			inDisp = x.arraySync()[0];

			const code = enc.predict(x);
			xs = code.arraySync()[0];

			const [z, logvar, mean, eps] = sample(code);
      $randomSample = eps.arraySync()[0];
			$stddevs = tf.exp(logvar.mul(0.5)).arraySync()[0];
			$means = mean.arraySync()[0];
			zs = z.arraySync()[0];

			const xHat = dec.predict(z);
			outDisp = xHat.arraySync()[0];
		});
	}

	$: modelsExist = enc && dec;
	$: if (modelsExist && rawImages && selectedImage)
		forward(rawImages[selectedImage]);

	let enc, dec;
	onMount(async () => {
		[enc, dec] = await loadModels();
		rawImages = await fetchAllImages(images);
		rawImages["clear"] = new Float32Array(784).fill(0);
	});
	onDestroy(() => {
		enc.dispose();
		dec.dispose();
	});

  const width = 1200;
  const height = 500;

  const expansion = 20;
  const xDigit1 = 0;
  const padding = 100;
  const trapPadding = 10;
  const xLatent = xDigit1 + inputOutputCanvasSize + padding + expansion;
  const yLatent = inputOutputCanvasSize / 2 - scatterSquare/2;
  const xDigit2 = xLatent + scatterSquare + padding + expansion;
  const xTrap1 = xDigit1 + inputOutputCanvasSize + trapPadding;
  const xTrap2 = xDigit2 - trapWidth - trapPadding;
</script>

<Header></Header>
<main>
	<div class="mb-2 flex gap-2 items-center">
		<ImageSelector imageUrls={images} bind:selectedUrl={selectedImage} />
	</div>

  <svg {width} {height}> 
    <rect {width} {height} stroke="black" fill="none"/>

    <foreignObject x={xDigit1} y={0} width={inputOutputCanvasSize} height={inputOutputCanvasSize} style="overflow: visible;">
			<MnistDigit
				enableDrawing
				data={inDisp}
				square={inputOutputCanvasSize}
				maxVal={1}
				onChange={(d) => {
					forward(d);
				}}
			></MnistDigit>
      <Button
        class="mt-1"
        size="xs"
        color="light"
        on:click={() => {
          selectedImage = "clear";
          rawImages = rawImages; // weirdly needed for UI to update;
        }}>Clear Canvas</Button
      >
    </foreignObject>

    <Trapezoid x={xTrap1} y={0} width={trapWidth} height={inputOutputCanvasSize} trapHeights={[inputOutputCanvasSize, scatterSquare]}/>

    <Trapezoid x={xTrap2} y={0} width={trapWidth} height={inputOutputCanvasSize} trapHeights={[scatterSquare, inputOutputCanvasSize]} fill="var(--light-blue)"/>

    <foreignObject x={xLatent} y={yLatent} width={scatterSquare} height={scatterSquare} style="overflow: visible;">
      <div style="position: relative;">
				<LatentScatter
					stddevs={$stddevs}
					means={$means}
					width={scatterSquare}
					height={scatterSquare}
					sampled={zs}
					onChange={(z) => {
						tf.tidy(() => {
							const xHat = dec.predict(
								tf.tensor(z, [1, latentDims])
							);
							outDisp = xHat.arraySync()[0];
						});
					}}
				></LatentScatter>
				<div style="position: absolute; right: 0; bottom: -40px;">
					<Button
						size="xs"
						color="light"
						on:click={async () => {
              const times = 1;
							for (let i = 0; i < times; i++) {
								tf.tidy(() => {
									const code = tf.tensor(xs, [
										1,
										2 * latentDims,
									]);
									const [z, logvar, mean, eps] = sample(code);
                  $randomSample = eps.arraySync()[0];
									$stddevs = tf
										.exp(logvar.mul(0.5))
										.arraySync()[0];
									$means = mean.arraySync()[0];
									zs = z.arraySync()[0];

									const xHat = dec.predict(z);
									outDisp = xHat.arraySync()[0];
								});
								await new Promise((r, rej) =>
									setTimeout(r, 50)
								);
							}
						}}
							>Resample 🎲
						</Button
					>
				</div>
			</div>
    </foreignObject>

    <foreignObject x={xDigit2} y={0} width={inputOutputCanvasSize} height={inputOutputCanvasSize} style="overflow: visible;">
			<MnistDigit data={outDisp} square={inputOutputCanvasSize} maxVal={1}
			></MnistDigit>
    </foreignObject>
  </svg>

</main>

<Popover />

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
