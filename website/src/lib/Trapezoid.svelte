<script>
  import Sankey from "./Sankey.svelte"

	export let width = 200;
	export let height = 400;
	export let trapHeights = [400, 300];

	export let fill = "var(--pink)";
	export let stroke = "";
  export let sankey = false;
</script>

<div>
	<svg {width} {height} style="overflow: visible;">
    {#if !sankey}
      <polygon
        points="0,{height / 2 - trapHeights[0] / 2} 0,{height / 2 +
          trapHeights[0] / 2} {width}, {height / 2 +
          trapHeights[1] / 2} {width}, {height / 2 - trapHeights[1] / 2}"
        {fill}
        {stroke}
      />
    {:else}
      <Sankey p1={[0, height/2 - trapHeights[0]/2]} p2={[width, height/2 - trapHeights[1]/2]} p1Height={trapHeights[0]} p2Height={trapHeights[1]} {fill} {stroke}/>
    {/if}
	</svg>
</div>

<style>
	/*  put stuff here */
</style>
