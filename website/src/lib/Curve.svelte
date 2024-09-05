<script>
  import * as d3 from "d3";

  export let source;
  export let target;

  const link = d3
    .linkHorizontal()
    .x((d) => d.x)
    .y((d) => d.y);
  const curve = (p1, p2) => link({source: {x: p1[0], y: p1[1]}, target: {x: p2[0], y: p2[1]}});
</script>

<path d={curve(source, target)} stroke="grey" fill="none" stroke-width={2}/>
