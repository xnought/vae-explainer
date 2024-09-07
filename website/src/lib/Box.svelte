<script>
  export let hovering = false;
  export let x;
  export let y;
  export let width;
  export let height;
</script>

  <rect {x} {y} {width} {height} fill="transparent"  stroke={hovering ? "red" : "black" } on:mouseenter={() => hovering=true} on:mouseleave={() => hovering=false}/>
