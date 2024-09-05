import { writable } from "svelte/store";


export const randomSample = writable([0, 0]);
export const stddevs = writable([1.2, 1]);
export const means = writable([-3, 2]);

export const vectorHeight = writable(0);
export const node1MidY = writable(0);
export const node2MidY = writable(0);
export const sampleWidth = writable(0);
export const logVarWidth = writable(0);

export const css = {
	"--pink": "#e44084",
	"--purple": "#6821b0",
	"--dark-blue": "#331a9d",
	"--medium-blue": "#4765e6",
	"--light-blue": "#6fc7ec",
  "--green": "rgb(144,220,147)"
};
