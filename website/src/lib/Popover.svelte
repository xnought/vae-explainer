<script>
  import LogVarTrick from "./LogVarTrick.svelte";
  import Sampler from "./Sampler.svelte";
  import VectorShape from "./VectorShape.svelte";
  import TwoFunc from "./TwoFunc.svelte";
  import Curve from "./Curve.svelte";
  import Output from "./Output.svelte";
  import { node1MidY, node2MidY, sampleWidth, logVarWidth, vectorHeight} from "./stores";

  export let width = 800;
  export let height = 500;

  
  $: meanVector = [100, 50];
  $: logVarVector = [100, meanVector[1] + 150];
  $: sampleVector = [logVarVector[0] + $logVarWidth - $sampleWidth, logVarVector[1]+150]
  $: mulVector = [logVarVector[0] + 250, logVarVector[1]];
  $: addVector = [meanVector[0] + 400, meanVector[1]];
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

</script>

<div>
  <svg {width} {height}>
    <Curve source={[0, midBetweenMeanAndLogVar]} target={[width, midBetweenMeanAndLogVar]} />
    <VectorShape x={meanVector[0]} y={meanVector[1]} values={[0, 0]}/>
    <!-- <VectorShape x={logVarVector[0]} y={logVarVector[1]} values={[0, 0]}/> -->
    <LogVarTrick x={logVarVector[0]} y={logVarVector[1]}/>
    <Curve source={topNodeLogVar} target={inTopMul} />
    <Curve source={botNodeLogVar} target={inBotMul} />

    <Sampler x={sampleVector[0]} y={sampleVector[1]}/>
    <Curve source={topSampleVector} target={inTopMul} />
    <Curve source={botSampleVector} target={inBotMul} />

    <TwoFunc x={mulVector[0]} y={mulVector[1]} symbolInstead="*" symbolColor="black" symbolShift={16}/>
    <Curve source={outTopMean} target={inTopAdd} />
    <Curve source={outBotMean} target={inBotAdd} />
    <Curve source={outTopMul} target={inTopAdd} />
    <Curve source={outBotMul} target={inBotAdd} />

    <TwoFunc x={addVector[0]} y={addVector[1]} symbolInstead="+" symbolColor="black"/>
    <Curve source={outTopAdd} target={inTopOut} />
    <Curve source={outBotAdd} target={inBotOut} />

    <Output x={outputVector[0]} y={outputVector[1]} />
  </svg>
</div>

<style>
  svg {
    outline: 1px solid red;  
  }
</style>
