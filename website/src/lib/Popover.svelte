<script>
  import LogVarTrick from "./LogVarTrick.svelte";
  export let width = 800;
  export let height = 500;

</script>

<div>
  <svg {width} {height}>
    <LogVarTrick />
  </svg>
</div>

<style>
  svg {
    outline: 1px solid red;  
  }
</style>
