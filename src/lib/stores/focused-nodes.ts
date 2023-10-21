import type { NodeDefinition } from "cytoscape";
import { writable } from "svelte/store";

export const focusedNodes = writable<NodeDefinition[]>([]);
