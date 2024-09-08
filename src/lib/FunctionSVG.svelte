<script>
  import * as d3 from "d3";

  export let width = 0;
  export let height = 0;
  export let x = 0;
  export let y = 0;

  export let input = 0;

  export let f = (x) => x;
  export let domain = [-5, 5];
  export let range = [-2, Math.exp(2.7)];
  export let numPoints = 50;
  export let lineInput = false;
  export let color = "grey";
  export let curveColor = "lightgrey";

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
  function correct(f, input, domain, range) {
    if(input > domain[1]) {
      return {x: domain[1], y: f(domain[1])};
    } else if(input < domain[0]) {
      return {x: domain[0], y: f(domain[0])};
    } else {
      return {x: input, y: f(input)};
    }
  }
</script>

<svg {x} {y} {width} {height}>
  {#each points as p1, i}
    {#if i < (points.length - 1)}
      {@const p2 = points[i+1]}
      <line x1={scaleX(p1.x)} y1={scaleY(p1.y)} x2={scaleX(p2.x)} y2={scaleY(p2.y)} stroke={curveColor} stroke-width={1} />
    {/if}
  {/each}
  <rect fill="none" stroke="grey" {width} {height} stroke-width={3}/>
  {#if input !== null}
    {@const corrected = correct(f, input, domain, range)}
    {#if !lineInput}
        <circle cx={scaleX(corrected.x)} cy={scaleY(corrected.y)} r={2} fill={color}/>
      {:else}
        <line x1={scaleX(corrected.x)} y1={0} x2={scaleX(corrected.x)} y2={height} stroke={color} stroke-dasharray={4} stroke-width={2}/>
    {/if}
  {/if}
</svg>
