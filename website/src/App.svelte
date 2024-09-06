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
	import Sankey from "./lib/Sankey.svelte";
	import Katex from "./lib/Katex.svelte";

	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
  import { stddevs, means, randomSample, popoverWidth, popoverEncHeight, popoverEncY, popoverDecY, popoverDecHeight, zs} from "./lib/stores";

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
			$zs = z.arraySync()[0];

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

  let expanded = false; 
  const expandedSize = 300;
  const minimizedSize = 20;
  const cExpansion = tweened(expanded ? expandedSize : minimizedSize, {duration: 1000, easing: cubicOut});
  $: expansion = $cExpansion;
  $: xDigit1 = 0;
  $: padding = 100;
  $: trapPadding = 10;
  $: xLatent = xDigit1 + inputOutputCanvasSize + padding + expansion;
  $: yLatent = inputOutputCanvasSize / 2 - scatterSquare/2;
  $: xDigit2 = xLatent + scatterSquare + padding + expansion;
  $: xTrap1 = xDigit1 + inputOutputCanvasSize + trapPadding;
  $: xTrap2 = xDigit2 - trapWidth - trapPadding;
  $: yTrap2 = xLatent;
  $: xMid = xLatent + scatterSquare/2;
  $: popoverX = xMid - $popoverWidth/2;
  $: popoverY = 300;
  $: xTrap1Out = xTrap1 + trapWidth;
  $: yTrap1Out = yLatent;
  $: fullyExpanded = expansion == expandedSize;
  $: fullyMinimized = expansion == minimizedSize;
</script>

<Header></Header>
<main>
	<div class="mb-2 flex gap-2 items-center">
		<ImageSelector imageUrls={images} bind:selectedUrl={selectedImage} />
	</div>

  <svg {width} {height} style="overflow: visible;"> 
    <foreignObject x={xDigit1} y={0} width={inputOutputCanvasSize} height={inputOutputCanvasSize} style="overflow: visible;">
      <MnistDigit
        style="outline: 2px solid var(--pink); cursor: crosshair;"
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
        color="alternative"
        on:click={() => {
          selectedImage = "clear";
          rawImages = rawImages; // weirdly needed for UI to update;
        }}>Clear Canvas</Button
      >
    </foreignObject>

    <Trapezoid label="Encoder" fill="--pink" fill2="--purple" x={xTrap1} y={0} width={trapWidth} height={inputOutputCanvasSize} trapHeights={[inputOutputCanvasSize, scatterSquare]}/>

    <foreignObject x={xLatent} y={yLatent + scatterSquare + 10} width={200} height={50}>
      <Button size="xs" color="light" style="width: 200px;" on:click={() => {
        if(expanded) {
          $cExpansion= minimizedSize;
        } else {
          $cExpansion = expandedSize;
        }
        expanded = !expanded;
      }}><span>{expanded ? "Close" : "Open Computational Graph"}</span></Button>
    </foreignObject>

    {#if expanded}
      <g class="fade-in">
        <Sankey p1={[xTrap1Out, yTrap1Out]} p2={[popoverX, popoverY + $popoverEncY]} p1Height={scatterSquare} p2Height={$popoverEncHeight} fill="var(--purple)" opacity={0.2}
        />
  </g>
  {/if}

    {#if expanded}
      <g class="fade-in">
        <Sankey p1={[popoverX+$popoverWidth, popoverY+$popoverDecY]} p2={[xTrap2, yTrap1Out]} p1Height={$popoverDecHeight} p2Height={scatterSquare} fill="var(--light-blue)" opacity={0.2}
        />
  </g>
  {/if}

    <Trapezoid label="Decoder" fill="--light-blue" fill2="--green" x={xTrap2} y={0} width={trapWidth} height={inputOutputCanvasSize} trapHeights={[scatterSquare, inputOutputCanvasSize]} />

    <foreignObject x={xLatent} y={yLatent} width={scatterSquare} height={scatterSquare} style="overflow: visible;">
      <div style="position: relative;">
				<LatentScatter
					stddevs={$stddevs}
					means={$means}
					width={scatterSquare}
					height={scatterSquare}
					sampled={$zs}
					onChange={(z) => {
            $zs = z;
						tf.tidy(() => {
							const xHat = dec.predict(
								tf.tensor(z, [1, latentDims])
							);
							outDisp = xHat.arraySync()[0];
						});
					}}
				></LatentScatter>
				<div style="position: absolute; right: 0; top: -40px; display: none;">
					<Button
						size="xs"
						color="alternative"
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
									$zs = z.arraySync()[0];

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
        style="outline: 2px solid var(--green);"
			></MnistDigit>
    </foreignObject>

    {#if expanded}
      <Popover x={popoverX} y={popoverY}/>
    {/if}
  </svg>

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
  foreignObject {
    overflow: visible;
}
</style>
