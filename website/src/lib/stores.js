import { writable } from "svelte/store";


export const randomSample = writable([0, 0]);
export const stddevs = writable([1.2, 1]);
export const means = writable([-3, 2]);

export const vectorHeight = writable(0);
export const node1MidY = writable(0);
export const node2MidY = writable(0);
export const sampleWidth = writable(0);
export const logVarWidth = writable(0);
