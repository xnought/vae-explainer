<script>
  import Code from "./Code.svelte";
  import LogVarTrick from "./LogVarTrick.svelte";
  import Sampler from "./Sampler.svelte";
  import VectorShape from "./VectorShape.svelte";
  import TwoFunc from "./TwoFunc.svelte";
  import Curve from "./Curve.svelte";
  import Output from "./Output.svelte";
  import Sankey from "./Sankey.svelte";
  import Box from "./Box.svelte";

  import * as d3 from "d3";
  import { node1MidY, node2MidY, sampleWidth, logVarWidth, vectorHeight, means, stddevs, css, popoverWidth, popoverEncY, popoverEncHeight, popoverDecY, popoverDecHeight, hoveringInput, hoveringlogVarTrick, hoveringSample, hoveringZ, ho} from "./stores";
  import { color } from "./util";

  export let height = 450;
  export let x = 0;
  export let y = 0;

  
  $: leftPad = 70;
  $: topPad = 25;
  $: encodedVectorHeight = $vectorHeight;
  $: encodedVectorStroke = color("--purple", 1);
  $: encodedVectorFill = color("--purple", 0.2);

  $: meanVector = [leftPad, topPad];
  $: logVarVector = [leftPad, meanVector[1] + 150];
  $: sampleVector = [logVarVector[0] + $logVarWidth - $sampleWidth, logVarVector[1]+150]
  $: mulVector = [logVarVector[0] + 225, logVarVector[1]];
  $: addVector = [meanVector[0] + 325, meanVector[1]];
  $: meanToLogVarGap = logVarVector[1] - (meanVector[1] + $vectorHeight);
  $: midBetweenMeanAndLogVar = logVarVector[1] - meanToLogVarGap/2;
  $: outputVector = [addVector[0] + 150, midBetweenMeanAndLogVar - $vectorHeight/2];

  $: topSampleVector = [sampleVector[0]+$sampleWidth, sampleVector[1] + $node1MidY];
  $: botSampleVector = [sampleVector[0]+$sampleWidth, sampleVector[1] + $node2MidY];

  $: inTopMul = [mulVector[0], mulVector[1] + $node1MidY];
  $: inBotMul = [mulVector[0], mulVector[1] + $node2MidY];

  $: outTopMul = [mulVector[0] + 40, mulVector[1] + $node1MidY];
  $: outBotMul = [mulVector[0] + 40, mulVector[1] + $node2MidY];

  $: topNodeLogVar = [logVarVector[0]+$logVarWidth, logVarVector[1] + $node1MidY];
  $: botNodeLogVar = [logVarVector[0]+$logVarWidth, logVarVector[1] + $node2MidY];

  $: outTopMean = [meanVector[0] + 30, meanVector[1] + $node1MidY];
  $: outBotMean = [meanVector[0] + 30, meanVector[1] + $node2MidY];

  $: inTopAdd = [addVector[0], addVector[1] + $node1MidY];
  $: inBotAdd = [addVector[0], addVector[1] + $node2MidY];

  $: outTopAdd = [addVector[0] + 40, addVector[1] + $node1MidY];
  $: outBotAdd = [addVector[0] + 40, addVector[1] + $node2MidY];

  $: inTopOut = [outputVector[0], outputVector[1] + $node1MidY];
  $: inBotOut = [outputVector[0], outputVector[1] + $node2MidY];

  $: encodedVector = [0, midBetweenMeanAndLogVar - encodedVectorHeight/2];

  // needed outside
  $: $popoverWidth = outputVector[0] + 40 + 30 + 20;
  $: $popoverEncY = encodedVector[1];
  $: $popoverEncHeight = encodedVectorHeight;
  $: $popoverDecHeight = $vectorHeight;
  $: $popoverDecY = outputVector[1];
</script>

<svg class="fade-in" width={$popoverWidth} {height} {x} {y} style="overflow: visible;">
  <!-- <rect x={0} y={0} {width} {height} fill="red" /> -->
  <rect x={encodedVector[0]} y={encodedVector[1]} width={30} height={encodedVectorHeight} stroke={encodedVectorStroke} stroke-width={1.5} fill={encodedVectorFill} opacity={ho($hoveringInput)}/>
  <Sankey p1={[encodedVector[0]+30, encodedVector[1]]} p1Height={$vectorHeight} p2={meanVector} p2Height={$vectorHeight}  fill="orange" opacity={0.2}/>
  <Sankey p1={[encodedVector[0]+30, encodedVector[1]]} p1Height={$vectorHeight} p2={logVarVector} p2Height={$vectorHeight} fill="seagreen" opacity={0.2} />

  <!-- <Curve source={[0, midBetweenMeanAndLogVar]} target={[width, midBetweenMeanAndLogVar]} /> -->
  <VectorShape x={meanVector[0]} y={meanVector[1]} values={$means} stroke="orange" tex={String.raw`\mu`} opacity={ho($hoveringInput)}/>
  <!-- <VectorShape x={logVarVector[0]} y={logVarVector[1]} values={[0, 0]}/> -->



  <LogVarTrick x={logVarVector[0]} y={logVarVector[1]}/>
  <Curve source={topNodeLogVar} target={inTopMul} opacity={ho($hoveringZ)}/>
  <Curve source={botNodeLogVar} target={inBotMul} opacity={ho($hoveringZ)}/>


  <Sampler x={sampleVector[0]} y={sampleVector[1]}/>
  <Curve source={topSampleVector} target={inTopMul} opacity={ho($hoveringZ)}/>
  <Curve source={botSampleVector} target={inBotMul} opacity={ho($hoveringZ)}/>

  <TwoFunc x={mulVector[0]} y={mulVector[1]} symbolInstead="*" symbolColor="lightgrey" symbolShift={16} opacity={ho($hoveringZ)}/>
  <Curve source={outTopMean} target={inTopAdd} opacity={ho($hoveringZ)} />
  <Curve source={outBotMean} target={inBotAdd} opacity={ho($hoveringZ)} />
  <Curve source={outTopMul} target={inTopAdd} opacity={ho($hoveringZ)} />
  <Curve source={outBotMul} target={inBotAdd} opacity={ho($hoveringZ)} />

  <TwoFunc x={addVector[0]} y={addVector[1]} symbolInstead="+" symbolColor="lightgrey" opacity={ho($hoveringZ)}/>
  <Curve source={outTopAdd} target={inTopOut} opacity={ho($hoveringZ)}/>
  <Curve source={outBotAdd} target={inBotOut} opacity={ho($hoveringZ)}/>

  <Output x={outputVector[0]} y={outputVector[1]} />

  <!-- hovering boxes -->
  <Box bind:hovering={$hoveringZ} x={mulVector[0]-200} y={20} width={600} height={280}/>
  <Box bind:hovering={$hoveringSample} x={sampleVector[0]} y={sampleVector[1]-30} width={100} height={50+$vectorHeight}/>
  <Box bind:hovering={$hoveringlogVarTrick} x={logVarVector[0]} y={logVarVector[1]-30} width={200} height={50+$vectorHeight}/>
  <Box bind:hovering={$hoveringInput} x={encodedVector[0]-100} y={meanVector[1]-50} width={meanVector[0] + 150} height={50+ logVarVector[1] + $vectorHeight}/>

  <foreignObject x={mulVector[0]} y={outputVector[1]+200} width={900} height={500} style="overflow: visible;">
    <Code /> 
  <foreignObject />
</svg>
