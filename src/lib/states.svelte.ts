import type { NodeDefinition } from "cytoscape";

let _focusedNodes = $state<NodeDefinition[]>([]);

let _selectedNodeName = $state<string | undefined>();

export const focusedNodes = {
  get nodes() {
    return _focusedNodes;
  },
  set nodes(nodes: NodeDefinition[]) {
    _focusedNodes = nodes;
  },
};

export const selectedNodeName = {
  get name() {
    return _selectedNodeName;
  },
  set name(val: string | undefined) {
    _selectedNodeName = val;
  },
};
