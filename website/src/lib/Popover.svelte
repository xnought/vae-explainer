<script>
  import LogVarTrick from "./LogVarTrick.svelte";
  import Sampler from "./Sampler.svelte";
  import VectorShape from "./VectorShape.svelte";
  import TwoFunc from "./TwoFunc.svelte";
  import Curve from "./Curve.svelte";

  export let width = 800;
  export let height = 500;

  const meanVector = [100, 50];
  const logVarVector = [100, meanVector[1] + 150];
  const sampleVector = [logVarVector[0]+150, logVarVector[1]+150]
  const mulVector = [logVarVector[0] + 300, logVarVector[1]];
</script>

<div>
  <svg {width} {height}>
    <VectorShape x={meanVector[0]} y={meanVector[1]} values={[0, 0]}/>
    <!-- <VectorShape x={logVarVector[0]} y={logVarVector[1]} values={[0, 0]}/> -->
    <LogVarTrick x={logVarVector[0]} y={logVarVector[1]}/>
    <Sampler x={sampleVector[0]} y={sampleVector[1]}/>
    <TwoFunc x={mulVector[0]} y={mulVector[1]} symbolInstead="+" symbolColor="slateblue"/>
    <Curve source={sampleVector} target={mulVector} />
  </svg>
</div>

<style>
  svg {
    outline: 1px solid red;  
  }
</style>
