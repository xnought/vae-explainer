import * as d3 from "d3";
import { css } from "./stores";

export function color(c, alpha=1) {
  if (c in css) {
    c = css[c];
  }
  const d3c = d3.color(c);
  d3c.opacity = alpha;
  return d3c;
}
