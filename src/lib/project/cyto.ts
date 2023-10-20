import type {
  EdgeDefinition,
  ElementsDefinition,
  NodeDefinition,
} from 'cytoscape';
import type { GaryProject } from './project';

export function asdf() {}

export async function getElements(
  gprojs: GaryProject[],
): Promise<ElementsDefinition> {
  const mns = new Map<string, NodeDefinition>();
  const mes = new Map<string, EdgeDefinition>();

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

    Object.entries(gp.root.dependencies ?? {})
      .map(([k, v]) => {
        const did = `${k}@${id}`;
        return { data: { id: did, v }, classes: ['dep', 'prod'] };
      })
      .forEach((d) => {
        mns.set(d.data.id, d);
      });

    Object.entries(gp.root.devDependencies ?? {})
      .map(([k, v]) => {
        const did = `${k}@${id}`;
        return { data: { id: did, v }, classes: ['dep', 'dev'] };
      })
      .forEach((d) => {
        mns.set(d.data.id, d);
      });
  }

  const nodes = Array.from(mns.values()).sort((a, b) =>
    a.data.id ? a.data.id.localeCompare(b.data.id ?? '') : 0,
  );

  const edges = Array.from(mes.values()).sort((a, b) => 0);

  return { nodes, edges };
}
