<script>
  import FunctionSVG from "./FunctionSVG.svelte";
  import VectorShape from "./VectorShape.svelte";
  export let x = 0; 
  export let y = 0;

  export let logVars = [-1, 2];

  const width = 200;
  const height = 150;

  const halfExp = (x) => Math.exp(0.5*x);
  const expSquare = 40;

  export const logVarVectorX = 15;
  export const firstExpX = logVarVectorX + 50;

  const firstExpY = 15;
  const secondExpY = firstExpY + 55;

  const vectorX = firstExpX + expSquare + 20;

  const outConnectStroke = {stroke: "grey", "stroke-width": 2};

  export const middleFirstExp = firstExpY + expSquare/2;
  export const middleSecondExp = secondExpY + expSquare/2;

  let vectorN1, vectorN2;
</script>

<svg {x} {y} {width} {height}>
  <rect {x} {y} {width} {height} fill="none" stroke="black"/>

  <!--log(var) -->
  <VectorShape x={logVarVectorX}
               y={firstExpY} 
               height={secondExpY - firstExpY + expSquare} 
               bind:n1={vectorN1} 
               bind:n2={vectorN2} 
               values={logVars.map(halfExp)}
               stroke="pink"
  />

  {#if vectorN1 && vectorN2}
    <line x1={logVarVectorX + 30} y1={middleFirstExp} x2={firstExpX} y2={middleFirstExp} {...outConnectStroke}/>
    <line x1={logVarVectorX  + 30} y1={middleSecondExp} x2={firstExpX} y2={middleSecondExp} {...outConnectStroke}/>
  {/if}

  <FunctionSVG x={firstExpX} y={firstExpY} width={expSquare} height={expSquare} f={halfExp} input={logVars[0]}/>
  <FunctionSVG x={firstExpX} y={secondExpY} width={expSquare} height={expSquare} f={halfExp} input={logVars[1]}/>

  {#if vectorN1 && vectorN2}
    <line x1={firstExpX + expSquare} y1={middleFirstExp} x2={vectorX} y2={vectorN1+firstExpY} {...outConnectStroke}/>
    <line x1={firstExpX + expSquare} y1={middleSecondExp} x2={vectorX} y2={vectorN2+firstExpY} {...outConnectStroke}/>
  {/if}

  <!--sigma -->
  <VectorShape x={vectorX} y={firstExpY} height={secondExpY - firstExpY + expSquare} bind:n1={vectorN1} bind:n2={vectorN2} values={logVars.map(halfExp)}/>
</svg>

<style>
</style>
