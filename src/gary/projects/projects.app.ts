import { Report } from '../../app/types';
import { ReportElement } from './report.element';

function show(reports: Report[]): void {
  const relements = reports.map((r) => {
    const re = document.createElement('app-report') as ReportElement;
    re.report = r;
    return re;
  });

  const container = document.querySelector('.reports');
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    relements.forEach((r) => {
      container.appendChild(r);
    });
  }
}

export function find(term: string, reports: Report[]): Report[] {
  const includesTerm = (
    record: Record<string, string> | undefined
  ): boolean => {
    if (record) {
      return Object.keys(record).includes(term);
    }
    return false;
  };
  if (term === '') {
    return reports;
  }
  return reports.filter(
    (r) =>
      includesTerm(r.json.dependencies) || includesTerm(r.json.devDependencies)
  );
}

async function main(): Promise<void> {
  const plats = ['azure/bort1959', 'azure/bortosky', 'github/garyb432'];

  const responses =
    'fetch' in globalThis
      ? await Promise.all(plats.map(async (p) => await fetch(`${p}.json`)))
      : [];

  const allReports = await Promise.all(
    responses.map<Promise<Report[]>>(async (response, i) => {
      const plat = plats[i];
      const reps = (await response.json()) as Report[];
      return reps.map((rep) => {
        return { ...rep, plat };
      });
    })
  );

  const reports = allReports
    .flat(1)
    .sort((a, b) => a.path.localeCompare(b.path));

  show(reports);

  const search = document.querySelector<HTMLInputElement>('#search');

  if (search) {
    let timer: NodeJS.Timeout | undefined;
    search.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        show(find(search.value, reports));
      }, 200);
    });
  }
}

main().catch((e) => console.log(e));

customElements.define('app-report', ReportElement);
