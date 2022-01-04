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

export function formatDate(isoValue: string, format: string | null): string {
  if (isoValue.length < 7) {
    return 'invalid date';
  }

  const yyyy = isoValue.slice(0, 4);
  const mmmm = months[parseInt(isoValue.slice(5, 7), 10) - 1];

  switch (format) {
    case 'mmmm yyyy':
      return `${mmmm} ${yyyy}`;
    default:
      return `invalid format "${format}"`;
  }
}

export class DateElement extends HTMLElement {
  private contentDiv: HTMLDivElement | null = null;

  public constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.contentDiv = this.shadowRoot.querySelector('div');
    }
  }

  public static get observedAttributes(): string[] {
    return ['iso-value', 'format'];
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
          const yyyy = this.isoValue.slice(0, 4);
          const mmm = months[parseInt(this.isoValue.slice(5, 7), 10) - 1];
          const date = new Date(this.isoValue);
          this.contentDiv.setAttribute('title', date.toLocaleString());
          this.contentDiv.textContent = `${mmm} ${yyyy}`;
          this.contentDiv.textContent = formatDate(
            this.isoValue,
            this.getAttribute('format')
          );
        }
      },
      () => {
        console.error('error in update');
      }
    );
  }
}
