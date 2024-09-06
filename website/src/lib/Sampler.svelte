<script>
  import TwoFunc from "./TwoFunc.svelte";
  import VectorShape from "./VectorShape.svelte";
  import * as tf from "@tensorflow/tfjs";
  import { Button }from "flowbite-svelte";
  import { randomSample, node1MidY, node2MidY, sampleWidth} from "./stores";

  export let x = 0;
  export let y = 0;

  function standardNormal(x) {
    const c = 1/Math.sqrt(2*Math.PI);
    const a = -(1/2) * x**2
    return c*Math.exp(a);
  }

  function sample() {
    let eps = [];
    tf.tidy(() => {
	      const _eps = tf.randomStandardNormal([1, 2]);
        eps = _eps.arraySync()[0];
    });
    return eps;
  }

  const nodeX = 0;
  const vectorX = nodeX + 60;
  //$randomSample = sample();
  const connectStyle = {stroke: "grey", "stroke-width": 2};
  const width = vectorX+30;
  $sampleWidth = width;
  const height = 150;
  const color = "salmon";
</script>

<svg {x} {y} {width} {height} style="overflow: visible;">
  <!-- <rect {width} {height} stroke="black" fill="none" />  -->
  <TwoFunc x={nodeX} inputs={$randomSample} f={standardNormal} lineInput {color}/>
  <!--
  <foreignObject class="node" x={-5} y={105} width={200} style="overflow: visible;">
    <Button on:click={() => $randomSample = sample()} size="xs" color="light">Resample 🎲</Button>
  </foreignObject>
  -->
  <VectorShape x={vectorX} y={0} values={$randomSample} stroke={color}/>
  <line x1={nodeX + 40} y1={$node1MidY} x2={vectorX} y2={$node1MidY} {...connectStyle}/>
  <line x1={nodeX + 40} y1={$node2MidY} x2={vectorX} y2={$node2MidY} {...connectStyle}/>
</svg>

