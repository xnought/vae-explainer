<script>
  import TwoFunc from "./TwoFunc.svelte";
  import * as tf from "@tensorflow/tfjs";
  import { Button }from "flowbite-svelte";
  import { randomSample } from "./stores";

  export let x = 0;
  export let y = 0;
  export let width = 100;
  export let height = 150;

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

  $randomSample = sample();
</script>

<svg {x} {y} {width} {height} style="overflow: visible;">
  <TwoFunc inputs={$randomSample} f={standardNormal}/>
  <foreignObject class="node" x={0} y={100} {width} style="overflow: visible;">
    <Button on:click={() => $randomSample = sample()} size="xs" color="light">Resample 🎲</Button>
  </foreignObject>
</svg>

