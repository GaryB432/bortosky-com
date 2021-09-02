// Add the custom element to your markup
// <app-breadcrumbs addends="1,1"></app-breadcrumbs>

import { BreadcrumbsElement } from './breadcrumbs.element';

// Define the element in your app
customElements.define('app-breadcrumbs', BreadcrumbsElement);

// Change the observed attributes of the element
const el = document.querySelector<BreadcrumbsElement>('app-breadcrumbs');
el?.setAttribute('addends', '10,12,20');
