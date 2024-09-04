<script>
  import FunctionSVG from "./FunctionSVG.svelte";
  export let x = 0; 
  export let y = 0;
  const width = 200;
  const height = 200;

  const halfExp = (x) => Math.exp(0.5*x);
</script>

<svg {x} {y} {width} {height}>
  <rect {x} {y} {width} {height} fill="none" stroke="black"/>
  <FunctionSVG x={50} y={50} width={50} height={50} f={halfExp} />
</svg>

<style>
</style>
