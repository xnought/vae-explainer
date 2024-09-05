<script>
  import * as d3 from "d3";

  export let stroke = "none";
  export let fill = "black";
  export let opacity = 1;

  const link = d3
    .linkHorizontal()
    .x((d) => d.x)
    .y((d) => d.y);
  const curve = (p1, p2) => link({source: {x: p1[0], y: p1[1]}, target: {x: p2[0], y: p2[1]}});

  export let p1;
  export let p2;
  export let p1Height;
  export let p2Height;

  $: a = p1;
  $: b = p2;
  $: c = [p1[0], p1[1]+p1Height];
  $: d = [p2[0], p2[1]+p2Height];

  $: topCurve = curve(a, b);
  $: rightCurve = curve(b, d);
  $: botCurve = curve(d, c);
  $: leftCurve = curve(c, a);
  $: combined = [leftCurve, findAndSliceAfter(topCurve, "C"), findAndSliceAfter(rightCurve, "C"), findAndSliceAfter(botCurve, "C")];
  $: combinedParsed =  combined.map(d => d).join(" ");

  function findAndSliceAfter(x, v) {
    const i = x.indexOf(v);
    return x.slice(i);
  }
</script>

<path d={combinedParsed} {stroke} {fill} {opacity} stroke-width={2}/>


