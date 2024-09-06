<script>
  import FunctionSVG from "./FunctionSVG.svelte";
  import VectorShape from "./VectorShape.svelte";
  import TwoFunc from "./TwoFunc.svelte";
  import { node1MidY, node2MidY, logVarWidth, stddevs} from "./stores";

  export let x = 0; 
  export let y = 0;

  const halfExp = (x) => Math.exp(0.5*x);
  const expSquare = 40;

  export const logVarVectorX = 0;
  export const firstExpX = logVarVectorX + 50;

  const firstExpY = 0;
  const secondExpY = firstExpY + 55;

  const vectorX = firstExpX + expSquare + 20;

  const outConnectStroke = {stroke: "grey", "stroke-width": 2};

  const width = vectorX+30;
  const height = 100;
  $logVarWidth = width;
  $: logVar = $stddevs.map(d => 2*Math.log(d));
</script>

<svg {x} {y} {width} {height}>
  <!-- <rect {width} {height} fill="none" stroke="black" /> -->
  <!--log(var) -->
  <VectorShape x={logVarVectorX}
               y={firstExpY} 
               values={logVar}
               stroke="seagreen"
  />
  <line x1={logVarVectorX + 30} y1={$node1MidY} x2={firstExpX} y2={$node1MidY} {...outConnectStroke}/>
  <line x1={logVarVectorX + 30} y1={$node2MidY} x2={firstExpX} y2={$node2MidY} {...outConnectStroke}/>

  <!-- e^{0,5*log(var)} -->
  <TwoFunc x={firstExpX} y={firstExpY} f={halfExp} domain={[-10, 0]} range={[-0.1, 1]} inputs={logVar} color="lightseagreen"/>

  <line x1={firstExpX + expSquare} y1={$node1MidY} x2={vectorX} y2={$node1MidY} {...outConnectStroke}/>
  <line x1={firstExpX + expSquare} y1={$node2MidY} x2={vectorX} y2={$node2MidY} {...outConnectStroke}/>
  <!--sigma -->
  <VectorShape x={vectorX} 
               y={firstExpY} 
               values={$stddevs}
               stroke="lightseagreen"
  />
</svg>

<style>
</style>
