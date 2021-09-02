import { adder, parse } from '../app/math';

// If the above functions are no longer exported you can use these local implementations
// function parse(values: string): number[] {
//   return values.split(',').map((n) => Number(n));
// }
// function adder(...addends: number[]): number {
//   return addends.reduce((a, b) => (a += b), 0);
// }

// Add the custom element to your markup
// <app-breadcrumbs addends="1,1"></app-breadcrumbs>

// Define the element in your app
// customElements.define('app-breadcrumbs', BreadcrumbsElement);

// Change the observed attributes of the element
// const el = document.querySelector<BreadcrumbsElement>('app-breadcrumbs')!;
// el.setAttribute('addends', '10,12,20');

const template = document.createElement('template');
template.innerHTML = `
    <style>
      :host {
        cursor: default;
      }
      div {
        padding: 1em;
        margin: 1em;
        border: 3px solid green;
      }
    </style>
    <div></div>
  `;

export class BreadcrumbsElement extends HTMLElement {
  private contentDiv: HTMLDivElement | null = null;
  public static get observedAttributes(): string[] {
    return ['addends'];
  }

  public constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.contentDiv = this.shadowRoot.querySelector('div');
    }
  }
  public get addends(): string {
    const value = this.getAttribute('addends');
    return value === null ? '' : value;
  }

  public set addends(value: string) {
    this.setAttribute('addends', value);
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
        if (this.contentDiv) {
          this.contentDiv.textContent = `The answer is ${adder(
            ...parse(this.addends)
          )}`;
        }
      },
      () => {
        console.error('error in update');
      }
    );
  }
}
