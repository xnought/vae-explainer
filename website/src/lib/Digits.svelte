<script>
  import * as d3 from "d3";

  export let x;
  export let y;

  const digits = Array(10).fill(0).map( (_, i) => ({i, color: d3.schemeTableau10[i]}) );
  const charWidth = 7;
  console.log(digits);
</script>

{#each digits as d, i}
  <text opacity={0.7} x={x + charWidth*i} {y} style="fill: {d.color}; font-size: 11px; font-family: menlo;">{d.i}</text>
{/each}
