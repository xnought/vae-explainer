<script>
  import * as d3 from "d3";

  export let x;
  export let y;
  export let width = 30; 
  export let height =100;
  export let stroke = "rgb(144,220,147)";
  export let fillOpacity = 0.2;
  export let strokeWidth = 3;

  export let values = [0, 0];
  export const n1 = 20;
  export const n2 = 75;

  $: fill = d3.color(stroke);
  $: fill.opacity = fillOpacity;
</script>

<svg {width} {height} {x} {y}>
  <rect x={0} y={0} {height} {width} {stroke} stroke-width={strokeWidth} fill={fill.toString()}/>
  <text text-anchor="middle" x={width/2} y={n1 + 4}>{values[0].toFixed(1)}</text>
  <text text-anchor="middle" x={width/2} y={n2 + 4}>{values[1].toFixed(1)}</text>
</svg>


<style>
  text {
    font-size: 10px;
    font-family: menlo;
  }
</style>
