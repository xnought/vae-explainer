<script>
  import { vectorHeight, node1MidY, node2MidY } from "./stores";
  import * as d3 from "d3";
  import { color } from "./util";
  import Katex from "./Katex.svelte";

  export let x;
  export let y;
  export let width = 30; 
  $: height = $vectorHeight;
  export let stroke = "rgb(144,220,147)";
  export let fillOpacity = 0.2;
  export let strokeWidth = 1.5;
  export let tex = undefined;
  export let shiftTex = 0;
  export let opacity = 0.5;

  export let values = [0, 0];
  $: n1 = $node1MidY;
  $: n2 = $node2MidY;

  $: fill = color(stroke, fillOpacity);
</script>

<svg {width} {height} {x} {y} style="overflow: visible;" {opacity}>
  {#if tex}
    <foreignObject x={width/2 - 5 + shiftTex} y={-30} style="overflow: visible;">
      <Katex {tex} style="color: {stroke}"/>
    </foreignObject>
  {/if}

  <rect x={0} y={0} {height} {width} stroke={color(stroke)} stroke-width={strokeWidth} fill={fill.toString()}/>
  <text text-anchor="middle" x={width/2} y={n1 + 4}>{values[0].toFixed(2)}</text>
  <text text-anchor="middle" x={width/2} y={n2 + 4}>{values[1].toFixed(2)}</text>
</svg>


<style>
  text {
    font-size: 8px;
    font-family: menlo;
  }
  svg {
    transition: fade-in 500ms ease-out;
  }
</style>
