<script>
  import TwoFunc from "./TwoFunc.svelte";
  import VectorShape from "./VectorShape.svelte";
  import * as tf from "@tensorflow/tfjs";
  import { Button }from "flowbite-svelte";
  import { randomSample, node1MidY, node2MidY, sampleWidth, means, stddevs} from "./stores";

  export let x = 0;
  export let y = 0;

	function normal(x, mean, stddev) {
		const variance = stddev ** 2;
		const a = 1 / Math.sqrt(2 * Math.PI * variance);
		const b = (x - mean) ** 2 / variance;
		return a * Math.exp(-0.5 * b);
	}
  
  $: customNormalA = (x) => normal(x, $means[0], $stddevs[0]);

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
  <TwoFunc x={nodeX} inputs={stdNormalToNormalRandom($randomSample, $means, $stddevs)} f={customNormalA} lineInput/>
  <VectorShape x={vectorX} y={0} values={$randomSample} stroke="#6fc7ec"/>
  <line x1={nodeX + 40} y1={$node1MidY} x2={vectorX} y2={$node1MidY} {...connectStyle}/>
  <line x1={nodeX + 40} y1={$node2MidY} x2={vectorX} y2={$node2MidY} {...connectStyle}/>
</svg>

