const template = document.createElement('template');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

template.innerHTML = `
    <style>
      :host {
        cursor: default;
      }
      div {
        display: inline-block;
      }
    </style>
    <div></div>
  `;

export class DateElement extends HTMLElement {
  private contentDiv: HTMLDivElement | null = null;
  public static get observedAttributes(): string[] {
    return ['iso-value', 'format'];
  }

  public constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.contentDiv = this.shadowRoot.querySelector('div');
    }
  }
  public get isoValue(): string {
    const value = this.getAttribute('iso-value');
    return value === null ? '' : value;
  }

  public set isoValue(value: string) {
    this.setAttribute('iso-value', value);
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
          const yyyy = this.isoValue.substr(0, 4);
          const mmm = months[parseInt(this.isoValue.substr(5, 2), 10) - 1];
          const date = new Date(this.isoValue);
          this.contentDiv.setAttribute('title', date.toLocaleString());
          this.contentDiv.textContent = `${mmm} ${yyyy}`;
        }
      },
      () => {
        console.error('error in update');
      }
    );
  }
}
