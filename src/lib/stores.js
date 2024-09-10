import { writable, derived, get } from "svelte/store";


export const randomSample = writable([0, 0]);
export const stddevs = writable(undefined);
export const means = writable(undefined);
export const zs = writable([0, 0]);

export const vectorHeight = writable(0);
export const node1MidY = writable(0);
export const node2MidY = writable(0);
export const sampleWidth = writable(0);
export const logVarWidth = writable(0);
export const popoverWidth = writable(0);
export const popoverEncY = writable(0);
export const popoverEncHeight = writable(0);
export const popoverDecHeight = writable(0);
export const popoverDecY = writable(0);

export const hoveringInput = writable(false);
export const hoveringlogVarTrick = writable(false);
export const hoveringSample = writable(false);
export const hoveringZ = writable(false);
export const notHoveringAny = derived([hoveringInput, hoveringlogVarTrick, hoveringSample, hoveringZ], ([$input, $logvar, $sample, $z]) => {
  const nha = !$input && !$logvar && !$sample && !$z;
  return nha;
});

export function ho(hovering) {
  return hovering ? 1 : 0.6;
}

// text version
export function hto(hovering) {
  return hovering ? 1 : 0.5;
}

export const css = {
	"--pink": "#e44084",
	"--purple": "#6821b0",
	"--dark-blue": "#331a9d",
	"--medium-blue": "#4765e6",
	"--light-blue": "#6fc7ec",
  "--green": "rgb(144,220,147)"
};

