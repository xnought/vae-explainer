<script>
  import * as d3 from "d3";
  import FunctionSVG from "./FunctionSVG.svelte";
  import { vectorHeight, node1MidY, node2MidY} from "./stores";

  export let symbolInstead = undefined;
  export let symbolColor = "crimson";
  const symbolFill = d3.color(symbolColor);
  symbolFill.opacity = 0.2;

  export let x = 0;
  export let y = 0;
  export let f = (x) => x;
  export let inputs = [0, -1];
  export let domain = [-6, 6];
  export let range = [-0.1, 0.5];
  export let lineInput = false;
  
  const nodeX = 0;
  const firstNodeY = 0;
  const secondNodeY = firstNodeY + 55;
  const nodeSquare = 40;
  const height = secondNodeY+nodeSquare;
  const width = nodeSquare;

  $node1MidY = firstNodeY+nodeSquare/2;
  $node2MidY = secondNodeY+nodeSquare/2;
  $vectorHeight = height;
</script>

<svg {x} {y} {width} {height} style="overflow: visible;">
  {#if symbolInstead === undefined}
      <FunctionSVG {lineInput} x={nodeX} y={firstNodeY} width={nodeSquare} height={nodeSquare} {f} input={inputs[0]} {domain} {range} />
      <FunctionSVG {lineInput} x={nodeX} y={secondNodeY} width={nodeSquare} height={nodeSquare} {f} input={inputs[1]} {domain} {range} />
    {:else}
      <rect x={nodeX} y={firstNodeY} width={nodeSquare} height={nodeSquare} fill={symbolFill.toString()} stroke={symbolColor} stroke-width={1.2}  />
      <rect x={nodeX} y={secondNodeY} width={nodeSquare} height={nodeSquare} fill={symbolFill.toString()} stroke={symbolColor} stroke-width={1.2}/>
      <text x={nodeX + nodeSquare/2} y={firstNodeY + nodeSquare/2 + 8} text-anchor="middle" fill={symbolColor}>{symbolInstead}</text>
      <text x={nodeX + nodeSquare/2} y={secondNodeY + nodeSquare/2 + 8} text-anchor="middle" fill={symbolColor}>{symbolInstead}</text>
  {/if}
</svg>

<style>
  text {
    font-size: 30px;
  }
</style>
