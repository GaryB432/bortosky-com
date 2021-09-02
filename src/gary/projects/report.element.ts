import { Report } from '../../app/types';

declare const componentHandler: {
  upgradeElement(element: unknown): void;
};

const template = document.createElement('template');
template.innerHTML = `
    <style>
      :host {
        cursor: default;
      }
      main {
        padding: 1em;
        margin: 1em;
        border: 2px solid #3f51b5;
      }
      .mdl-chip {
        display: inline-block;
        padding: .2em 1em;
        border-radius: 10px;
        background: #cccccc;
      }
    </style>
    <main>
      <h2>Project</h2>
      <section class="chips"></section>
    </main>
  `;

export class ReportElement extends HTMLElement {
  #pathDiv: HTMLDivElement | null = null;
  #chipsSection: HTMLDivElement | null = null;
  #report: Report | null = null;

  public constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.#pathDiv = this.shadowRoot.querySelector('h2');
      this.#chipsSection = this.shadowRoot.querySelector('.chips');
    }
  }

  public get report(): Report | null {
    return this.#report;
  }

  public set report(value: Report | null) {
    this.#report = value;
  }

  public attributeChangedCallback(
    _name: string,
    _oldVal: string,
    _newVal: string
  ): void {
    this.update();
  }

  public connectedCallback(): void {
    this.update();
  }

  private update(): void {
    Promise.resolve().then(
      () => {
        if (this.#pathDiv && this.#report) {
          this.#pathDiv.textContent = this.#report.path;
          if (this.#chipsSection) {
            if (this.#report.plat) {
              const c = document.createElement('span');
              c.classList.add('mdl-chip');
              const s = document.createElement('span');
              s.classList.add('mdl-chip__text');
              const t = document.createTextNode(this.#report.plat);
              s.appendChild(t);
              c.appendChild(s);
              componentHandler.upgradeElement(s);
              this.#chipsSection.appendChild(c);
            }
          }
        }
      },
      () => {
        console.error('error in update');
      }
    );
  }
}
