<script>
  import katex from "katex";
  import "katex/dist/katex.min.css";

  export let style = "";
  export let tex = String.raw`c = \pm\sqrt{a^2 + b^2}`;

  let c;
  $: if(c)  {
    katex.render(tex, c, {
      throwOnError: false
    });
  }
</script>

<span bind:this={c} {style}></span>
