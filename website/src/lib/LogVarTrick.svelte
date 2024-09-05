<script>
  import FunctionSVG from "./FunctionSVG.svelte";
  import VectorShape from "./VectorShape.svelte";
  import TwoFunc from "./TwoFunc.svelte";

  export let x = 0; 
  export let y = 0;

  export let logVars = [-1, 2];


  const halfExp = (x) => Math.exp(0.5*x);
  const expSquare = 40;

  export const logVarVectorX = 0;
  export const firstExpX = logVarVectorX + 50;

  const firstExpY = 0;
  const secondExpY = firstExpY + 55;

  const vectorX = firstExpX + expSquare + 20;

  const outConnectStroke = {stroke: "grey", "stroke-width": 2};

  export const middleFirstExp = firstExpY + expSquare/2;
  export const middleSecondExp = secondExpY + expSquare/2;

  const width = 150;
  const height = 100;
</script>

<svg {x} {y} {width} {height}>
  <!--log(var) -->
  <VectorShape x={logVarVectorX}
               y={firstExpY} 
               height={secondExpY - firstExpY + expSquare} 
               values={logVars.map(halfExp)}
               stroke="orange"
  />
  <line x1={logVarVectorX + 30} y1={middleFirstExp} x2={firstExpX} y2={middleFirstExp} {...outConnectStroke}/>
  <line x1={logVarVectorX  + 30} y1={middleSecondExp} x2={firstExpX} y2={middleSecondExp} {...outConnectStroke}/>

  <!-- e^{0,5*log(var)} -->
  <TwoFunc x={firstExpX} y={firstExpY} f={halfExp} domain={[-5, 5]} range={[-0.2, Math.exp(2)]} inputs={[0, 0]}/>

  <line x1={firstExpX + expSquare} y1={middleFirstExp} x2={vectorX} y2={middleFirstExp} {...outConnectStroke}/>
  <line x1={firstExpX + expSquare} y1={middleSecondExp} x2={vectorX} y2={middleSecondExp} {...outConnectStroke}/>
  <!--sigma -->
  <VectorShape x={vectorX} 
               y={firstExpY} 
               height={secondExpY - firstExpY + expSquare}
               values={logVars.map(halfExp)}
               stroke="steelblue"
  />
</svg>

<style>
</style>
