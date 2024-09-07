<script>
  import {color} from "./util";
  import {hoveringInput, hoveringlogVarTrick, hoveringSample, hoveringZ} from "./stores";
  import Katex from "./Katex.svelte";
  const colors = {
    sigma: "lightseagreen",
    logvar: "seagreen",
    eps: "salmon",
    mean: "orange",
    z: color("--light-blue").hex()
  };

  function k(c) {
      return {style: `color: ${colors[c]};`};
  }

  export let torch = false;
</script>


{#if torch}
  <div class="code" style="position: relative;">
    <a target="_blank" href="https://colab.research.google.com/github/xnought/vae-explainer/blob/main/notebooks/vae_training_torch.ipynb" style="position: absolute; right: 10px; top: 10px;">
      <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
    </a>

    <div class="line" class:hover={$hoveringInput} on:mouseenter={() => $hoveringInput = true} on:mouseleave={() => $hoveringInput = false}>
      <div>import torch</div>
      <div>
        def sample_vae(<span style="color: {colors.mean};">mean</span>: torch.Tensor, <span style="color: {colors.logvar};">log_var</span>: torch.Tensor) -> torch.Tensor:
      </div>
    </div>

    <div class="line tab" class:hover={$hoveringlogVarTrick} on:mouseenter={() => $hoveringlogVarTrick = true} on:mouseleave={() => $hoveringlogVarTrick = false}>
        <span style="color: {colors.sigma};">std_dev</span> = torch.exp(0.5*<span style="color: {colors.logvar};">log_var</span>) 
        <span class="comment">
          #log var trick  <Katex {...k("sigma")} tex={String.raw`\sigma`} /> 
          = <Katex tex={String.raw`e^{{\frac{1}{2}\color{seagreen}\log(\sigma^2)}}`} />
        </span>
    </div>
    <div class="line tab" class:hover={$hoveringSample} on:mouseenter={() => $hoveringSample = true} on:mouseleave={() => $hoveringSample = false}>
        <span style="color: {colors.eps};">eps</span> = torch.randn_like(mean)  
        <span class="comment">
          #sample from standard normal  <Katex tex={String.raw`{\color{${colors.eps}}\epsilon} \sim N(0, I)`} /> 
        </span>
    </div>
    <div class="line tab" class:hover={$hoveringZ} on:mouseenter={() => $hoveringZ = true} on:mouseleave={() => $hoveringZ = false}>
      <div>
        <span style="color: {colors.z};">z</span> = <span style="color: {colors.mean};">mean</span> + <span style="color: {colors.sigma};">std_dev</span>*<span style="color: {colors.eps};">eps</span>
        <span class="comment">
          #reparameterization trick <Katex {...k("z")} tex={String.raw`z`} /> 
          = <Katex {...k("mean")} tex={String.raw`\mu`} /> + <Katex {...k("sigma")} tex={String.raw`\sigma`} />*<Katex {...k("eps")} tex={String.raw`\epsilon`} />  such that <Katex tex={String.raw`{\color{${colors.z}}z} \sim N({\color{${colors.mean}}\mu}, {\color{${colors.sigma}}\sigma}^2)`} />
        </span>
      </div>
      <div>
        return <span style="color: {colors.z};">z</span> 
      </div>
    </div>
  </div>
  {:else}
    <div class="code" style="position: relative;">
      <a target="_blank" href="https://colab.research.google.com/github/xnought/vae-explainer/blob/main/notebooks/vae_training_keras_cnn.ipynb" style="position: absolute; right: 10px; top: 10px;">
        <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
      </a>

      <div class="line" class:hover={$hoveringInput} on:mouseenter={() => $hoveringInput = true} on:mouseleave={() => $hoveringInput = false}>
        <div>from keras import ops, random, KerasTensor</div>
        <div>
          def sample_vae(<span style="color: {colors.mean};">mean</span>: KerasTensor, <span style="color: {colors.logvar};">log_var</span>: KerasTensor) -> KerasTensor:
        </div>
      </div>

      <div class="line tab" class:hover={$hoveringlogVarTrick} on:mouseenter={() => $hoveringlogVarTrick = true} on:mouseleave={() => $hoveringlogVarTrick = false}>
          <span style="color: {colors.sigma};">std_dev</span> = ops.exp(0.5*<span style="color: {colors.logvar};">log_var</span>) 
          <span class="comment">
            #log var trick  <Katex {...k("sigma")} tex={String.raw`\sigma`} /> 
            = <Katex tex={String.raw`e^{{\frac{1}{2}\color{seagreen}\log(\sigma^2)}}`} />
          </span>
      </div>
      <div class="line tab" class:hover={$hoveringSample} on:mouseenter={() => $hoveringSample = true} on:mouseleave={() => $hoveringSample = false}>
          <span style="color: {colors.eps};">eps</span> = random.normal(shape=ops.shape(mean))  
          <span class="comment">
            #sample from standard normal  <Katex tex={String.raw`{\color{${colors.eps}}\epsilon} \sim N(0, I)`} /> 
          </span>
      </div>
      <div class="line tab" class:hover={$hoveringZ} on:mouseenter={() => $hoveringZ = true} on:mouseleave={() => $hoveringZ = false}>
        <div>
          <span style="color: {colors.z};">z</span> = <span style="color: {colors.mean};">mean</span> + <span style="color: {colors.sigma};">std_dev</span>*<span style="color: {colors.eps};">eps</span>
          <span class="comment">
            #reparameterization trick <Katex {...k("z")} tex={String.raw`z`} /> 
            = <Katex {...k("mean")} tex={String.raw`\mu`} /> + <Katex {...k("sigma")} tex={String.raw`\sigma`} />*<Katex {...k("eps")} tex={String.raw`\epsilon`} />  such that <Katex tex={String.raw`{\color{${colors.z}}z} \sim N({\color{${colors.mean}}\mu}, {\color{${colors.sigma}}\sigma}^2)`} />
          </span>
        </div>
        <div>
          return <span style="color: {colors.z};">z</span> 
        </div>
      </div>
    </div>
{/if}

<style>
  .line.hover,
  .line:hover {
    outline: 2px dashed rgb(255,255,255,0.1);
    background: rgb(255,255,255,0.1);
    border-radius: 3px;
    opacity: 1;
  }
  div {
    margin-top: 3px;    
  }
  .tab {
    margin-left: 40px; 
  }
  .code::before {content: "Python"; font-size: 12px; color: rgb(255,255,255,0.15); margin-left:2px;}
  .code {
    font-family: menlo;
    background: rgb(255,255,255,0.01);
    padding: 10px;
    border-left: 5px solid rgb(255,255,255,0.1);;
  }
  .comment {
    font-style: italic;
    color: grey;
  }
  .line {
    opacity: 0.5;
  }
  a { opacity: 0.5; }
  a:hover {
    opacity: 1;
  }
</style>
