import type { NodeDataDefinition, NodeDefinition } from "cytoscape";

let _focusedNodes = $state<NodeDefinition[]>([]);

let _selectedNodeName = $state<string | undefined>();

let _selectedNode = $state<NodeDefinition | undefined>();

export const focusedNodes = {
  get nodes(): NodeDefinition[] {
    return _focusedNodes;
  },
  set nodes(nodes: NodeDefinition[]) {
    _focusedNodes = nodes;
  },
};

/**
 * @deprecated use selectedNode
 */
export const selectedNodeName = {
  get name(): string | undefined {
    return _selectedNodeName;
  },
  set name(val: string | undefined) {
    _selectedNodeName = val;
  },
};

export const selectedNode = {
  get data(): NodeDataDefinition | undefined {
    return _selectedNode?.data;
  },
  set data(val: NodeDataDefinition | undefined) {
    if (val) {
      _selectedNode = { ..._selectedNode, data: val };
    }
  },
};
