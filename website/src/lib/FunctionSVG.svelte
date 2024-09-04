<script>
  // TODO: if a point goes out of the range on the screen, just show the point at the edge

  import * as d3 from "d3";

  export let width = 0;
  export let height = 0;
  export let x = 0;
  export let y = 0;

  export let input = 0;

  export let f = (x) => x;
  export let domain = [-5, 5];
  export let range = [0, 10];
  export let numPoints = 50;

  const scaleX = d3.scaleLinear().domain(domain).range([0, width]);
  const scaleY = d3.scaleLinear().domain(range).range([height, 0]);

  function genPoints(f, numPoints, domain) {
    let result = [];
    const [startX, endX] = domain;
    const dx = (endX - startX) / numPoints;
    for(let i = 0; i < numPoints; i++) {
      const x = startX + dx*i;
      const y = f(x);
      result.push({x, y});
    }
    return result;
  }

  $: points = genPoints(f, numPoints, domain);
</script>

<svg {x} {y} {width} {height}>
  {#each points as p1, i}
    {#if i < (points.length - 1)}
      {@const p2 = points[i+1]}
      <line x1={scaleX(p1.x)} y1={scaleY(p1.y)} x2={scaleX(p2.x)} y2={scaleY(p2.y)} stroke="grey" stroke-width={1} />
    {/if}
  {/each}
  {#if input !== null}
    <circle cx={scaleX(input)} cy={scaleY(f(input))} r={2} fill="black"/>
  {/if}
  <rect fill="none" stroke="lightgrey" {width} {height} />
</svg>
