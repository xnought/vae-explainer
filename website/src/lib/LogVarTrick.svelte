<script>
  import FunctionSVG from "./FunctionSVG.svelte";
  export let x = 0; 
  export let y = 0;

  export let logVars = [-1, 2];

  const width = 200;
  const height = 150;

  const halfExp = (x) => Math.exp(0.5*x);
  const expSquare = 40;
</script>

<svg {x} {y} {width} {height}>
  <rect {x} {y} {width} {height} fill="none" stroke="black"/>
  <FunctionSVG x={15} y={15} width={expSquare} height={expSquare} f={halfExp} input={logVars[0]}/>
  <FunctionSVG x={15} y={70} width={expSquare} height={expSquare} f={halfExp} input={logVars[1]}/>
</svg>

<style>
</style>
