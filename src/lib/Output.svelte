<script>
  import TwoFunc from "./TwoFunc.svelte";
  import VectorShape from "./VectorShape.svelte";
  import * as tf from "@tensorflow/tfjs";
  import { Button }from "flowbite-svelte";
  import { randomSample, node1MidY, node2MidY, sampleWidth, means, stddevs, zs, hoveringZ, ho, notHoveringAny} from "./stores";
  import Gaussian2DSvg from "./Gaussian2DSvg.svelte";

  export let x = 0;
  export let y = 0;

	function normal(x, mean, stddev) {
		const variance = stddev ** 2;
		const a = 1 / Math.sqrt(2 * Math.PI * variance);
		const b = (x - mean) ** 2 / variance;
		return a * Math.exp(-0.5 * b);
	}
  
  $: customNormalA = (x) => normal(x, $means[0], $stddevs[0]);
  $: customNormalB = (x) => normal(x, $means[1], $stddevs[1]);

  function stdNormalToNormalRandom(sample, means, stddevs) {
    const formula = (eps, sigma, mu) => eps*sigma + mu;
    return [formula(sample[0], stddevs[0], means[0]), formula(sample[1], stddevs[1], means[1])];
  }

  const nodeX = 0;
  const vectorX = nodeX + 60;
  const connectStyle = {stroke: "grey", "stroke-width": 2};
  const width = vectorX+30;
  const height = 100;
</script>

<svg {x} {y} {width} {height} style="overflow: visible;">
  <!-- <rect {width} {height} stroke="black" fill="none" />  -->
  <TwoFunc x={nodeX} inputs={$zs} f={customNormalA} g={customNormalB} lineInput color="#6fc7ec" tex={String.raw`N({\color{orange}\mu}, {\color{lightseagreen}\sigma}^2)`} shiftTex={-35} opacity={ho($hoveringZ || $notHoveringAny)} colorTex="grey" curveColor="violet"/>
  <VectorShape x={vectorX} y={0} values={$zs} stroke="#6fc7ec" tex={String.raw`z`} opacity={ho($hoveringZ || $notHoveringAny)}/>
  <line x1={nodeX + 40} y1={$node1MidY} x2={vectorX} y2={$node1MidY} {...connectStyle}opacity={ho($hoveringZ || $notHoveringAny)}/>
  <line x1={nodeX + 40} y1={$node2MidY} x2={vectorX} y2={$node2MidY} {...connectStyle}opacity={ho($hoveringZ || $notHoveringAny)}/>
  <Gaussian2DSvg
    override={[20, -40]}
    means={$means}
    stddevs={$stddevs}
    scaleX={(x) => x}
    scaleY={(y) => y}
    numberOfDeviations={6}
    exageration={20}
    opacity={ho($hoveringZ || $notHoveringAny)}
  />
  <circle
    cx={vectorX + 20-5}
    cy={-35}
    r={3}
    fill="var(--light-blue)"
    stroke="black"
    opacity={ho($hoveringZ || $notHoveringAny)}
  />
</svg>

