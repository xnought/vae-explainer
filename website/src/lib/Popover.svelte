<script>
  import Sampler from "./Sampler.svelte";
  export let width = 800;
  export let height = 500;

</script>

<div>
  <svg {width} {height}>
    <Sampler />
  </svg>
</div>

<style>
  svg {
    outline: 1px solid red;  
  }
</style>
