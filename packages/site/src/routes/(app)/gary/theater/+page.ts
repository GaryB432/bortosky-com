import { base } from '$app/paths';
import type { PageLoad } from './$types';

type ISODate = string;

interface Production {
  opening: ISODate;
  producer: Producer;
  role: string;
  show: string;
}

interface Producer {
  name: string;
  productions: Production[];
}

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch(base.concat('/gary/theater.json'));
  const info = (await response.json()) as { producers: Producer[] };

  const productions = info.producers
    .map((producer) => {
      producer.productions.forEach(
        (production) => (production.producer = producer)
      );
      return producer.productions;
    })
    .flat(1)
    .sort((a, b) => b.opening.localeCompare(a.opening));

  return {
    productions,
  };
};
