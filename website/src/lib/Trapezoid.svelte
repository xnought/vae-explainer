<script>
  import Sankey from "./Sankey.svelte"
  import { color } from "./util.js";

	export let width = 200;
	export let height = 400;
  export let x = 0;
  export let y = 0;
	export let trapHeights = [400, 300];
	export let fill = "--pink";
</script>

<svg {x} {y} {width} {height} style="overflow: visible;">
    <polygon
      points="0,{height / 2 - trapHeights[0] / 2} 0,{height / 2 +
        trapHeights[0] / 2} {width}, {height / 2 +
        trapHeights[1] / 2} {width}, {height / 2 - trapHeights[1] / 2}"
      fill={color(fill, 0.2)}
      stroke={color(fill, 1)}
      stroke-width={2}
    />
</svg>

<style>
	/*  put stuff here */
</style>
