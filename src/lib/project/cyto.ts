import type { EdgeDefinition, NodeDefinition } from 'cytoscape';
import type { GaryProject } from './project';

type Node = NodeDefinition;
type Edge = EdgeDefinition;

type Elements = {
  edges: Edge[];
  nodes: Node[];
};

export async function getElements(gprojs: GaryProject[]): Promise<Elements> {
  const mns = new Map<string, Node>();
  const mes = new Map<string, Edge>();

  for (const gp of gprojs) {
    const id = gp.root.name;
    mns.set(id, { data: { id }, classes: ['gbp'] });
    for (const sp of gp.projects) {
      const sid = `${id}#${sp.name}`;
      mns.set(sid, { data: { id: sid }, classes: ['psub'] });
      const eid = `${sid}-${id}`;

      mes.set(eid, {
        data: {
          id: eid,
          source: id,
          target: sid,
        },
        classes: 'psub',
      });
    }
  }

  const nodes = Array.from(mns.values()).sort((a, b) =>
    a.data.id ? a.data.id.localeCompare(b.data.id ?? '') : 0,
  );

  const edges = Array.from(mes.values()).sort((a, b) => 0);

  return { nodes, edges };
}
