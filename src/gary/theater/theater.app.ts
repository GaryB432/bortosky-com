import { DateElement } from './date.element';
export type ISODate = string;

export interface Production {
  opening: ISODate;
  producer: Producer;
  role: string;
  show: string;
}

export interface Producer {
  name: string;
  productions: Production[];
}

function row(production: Production): HTMLTableRowElement {
  const tr = document.createElement('tr');
  const dname = document.createElement('td');
  dname.textContent = production.show;
  tr.appendChild(dname);
  const dopening = document.createElement('td');
  const d = document.createElement('app-date') as DateElement;
  d.setAttribute('format', 'mdy');
  d.setAttribute('iso-value', production.opening);
  dopening.appendChild(d);
  tr.appendChild(dopening);
  const drole = document.createElement('td');
  drole.textContent = production.role;
  tr.appendChild(drole);
  const dproducer = document.createElement('td');
  dproducer.textContent = production.producer.name;
  tr.appendChild(dproducer);
  return tr;
}

async function main(): Promise<void> {
  const table = document.querySelector<HTMLTableElement>('tbody');
  if (!table) {
    throw new Error('no table');
  }
  const prods = await fetch('theater.json');

  const data = (await prods.json()) as { producers: Producer[] };

  const pph = data.producers.map((producer) => {
    producer.productions.forEach(
      (production) => (production.producer = producer)
    );
    return producer.productions;
  });

  pph
    .flat(1)
    .sort((a, b) => b.opening.localeCompare(a.opening))
    .forEach((p) => table.appendChild(row(p)));
}

main().catch(console.log);
customElements.define('app-date', DateElement);
