import type { ElementDataDefinition, NodeDefinition } from "cytoscape";

let _focusedNodes = $state<NodeDefinition[]>([]);

let _selectedNodeName = $state<string | undefined>();

let _selectedNodeData = $state<ElementDataDefinition | undefined>();

export const focusedNodes = {
  get nodes(): NodeDefinition[] {
    return _focusedNodes;
  },
  set nodes(nodes: NodeDefinition[]) {
    _focusedNodes = nodes;
  },
};

/**
 * @deprecated use selectedNodeData
 */
export const selectedNodeName = {
  get name(): string | undefined {
    return _selectedNodeName;
  },
  set name(val: string | undefined) {
    _selectedNodeName = val;
  },
};

export const selectedNodeData = {
  get id(): string | undefined {
    return _selectedNodeData?.id;
  },
  set id(val: string | undefined) {
    _selectedNodeData = { ..._selectedNodeData, id: val };
  },
};
