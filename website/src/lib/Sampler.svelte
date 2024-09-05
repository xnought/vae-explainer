<script>
  import FunctionSVG from "./FunctionSVG.svelte";

  export let height = 200;
  export let width = 200;
  export let x = 0;
  export let y = 0;

  
  const nodeX = 15;
  const firstNodeY = 15;
  const secondNodeY = firstNodeY + 55;
  const nodeSquare = 40;

  function standardNormal(x) {
    const c = 1/Math.sqrt(2*Math.PI);
    const a = -(1/2) * x**2
    return c*Math.exp(a);
  }

  const stdNormConfig = {domain: [-6, 6], range: [-0.1, 0.5]};
  export let randomSampled = [0, -1];
</script>

<svg {x} {y} {width} {height}>
  <rect {width} {height} fill="none" stroke="black" />

  <FunctionSVG x={nodeX} y={firstNodeY} width={nodeSquare} height={nodeSquare} f={standardNormal} input={randomSampled[0]} {...stdNormConfig} />
  <FunctionSVG x={nodeX} y={secondNodeY} width={nodeSquare} height={nodeSquare} f={standardNormal} input={randomSampled[1]} {...stdNormConfig}/>
</svg>
