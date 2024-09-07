<script>
  import Sankey from "./Sankey.svelte"
  import { color } from "./util.js";

	export let width = 200;
	export let height = 400;
  export let x = 0;
  export let y = 0;
	export let trapHeights = [400, 300];
	export let fill = "--pink";
  export let fill2 = "";
  export let label = "";

  $: style =  {fill: fill2 ? `url(#${label}-1)` : color(fill, 0.2), stroke: fill2 ? `url(#${label}-2)` : color(fill, 1)};
</script>

<svg {x} {y} {width} {height} style="overflow: visible;">
    {#if fill2.length > 0}
      <defs>
        <linearGradient id="{label}-1" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stop-color={color(fill, 0.2)} />
          <stop offset="100%" stop-color={color(fill2, 0.2)} />
        </linearGradient>
      </defs>
      <defs>
        <linearGradient id="{label}-2" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stop-color={color(fill, 1)} />
          <stop offset="100%" stop-color={color(fill2, 1)} />
        </linearGradient>
      </defs>
    {/if}
    <text x={width/2} y={height/2 + 4} text-anchor="middle" style="font-family: Geo; font-size: 20px; fill: {style.stroke};">
      {label}
    </text>
    <polygon
      {...style}
      points="0,{height / 2 - trapHeights[0] / 2} 0,{height / 2 +
        trapHeights[0] / 2} {width}, {height / 2 +
        trapHeights[1] / 2} {width}, {height / 2 - trapHeights[1] / 2}"
      stroke-width={2}
    />
</svg>

<style>
	/*  put stuff here */
</style>
