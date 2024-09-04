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

  const firstExpX = 15;
  const secondExpX = 15;

  const firstExpY = 15;
  const secondExpY = firstExpY + 55;

  const vectorX = firstExpX + expSquare + 20;

  const outConnectStroke = {stroke: "grey", "stroke-width": 2};

  const middleFirstExp = firstExpY + expSquare/2;
  const middleSecondExp = secondExpY + expSquare/2;
</script>

<svg {x} {y} {width} {height}>
  <rect {x} {y} {width} {height} fill="none" stroke="black"/>

  <FunctionSVG x={firstExpX} y={firstExpY} width={expSquare} height={expSquare} f={halfExp} input={logVars[0]}/>
  <FunctionSVG x={firstExpX} y={secondExpY} width={expSquare} height={expSquare} f={halfExp} input={logVars[1]}/>

  <line x1={firstExpX + expSquare} y1={middleFirstExp} x2={vectorX} y2={middleFirstExp} {...outConnectStroke}/>
  <line x1={secondExpX + expSquare} y1={middleSecondExp} x2={vectorX} y2={middleSecondExp} {...outConnectStroke}/>

  <VectorShape x={vectorX} y={firstExpY} height={secondExpY - firstExpY + expSquare}/>
</svg>

<style>
</style>
