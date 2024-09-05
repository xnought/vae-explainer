<script>
  import LogVarTrick from "./LogVarTrick.svelte";
  import Sampler from "./Sampler.svelte";
  import VectorShape from "./VectorShape.svelte";
  export let width = 800;
  export let height = 500;

  const meanVector = [100, 100];
  const logVarVector = [100, 250];
  const sampleVector = [logVarVector[0]+200, logVarVector[1]+100]
</script>

<div>
  <svg {width} {height}>
    <VectorShape x={meanVector[0]} y={meanVector[1]} values={[0, 0]}/>
    <!-- <VectorShape x={logVarVector[0]} y={logVarVector[1]} values={[0, 0]}/> -->
    <LogVarTrick x={logVarVector[0]} y={logVarVector[1]}/>
    <Sampler x={sampleVector[0]} y={sampleVector[1]}/>
  </svg>
</div>

<style>
  svg {
    outline: 1px solid red;  
  }
</style>
