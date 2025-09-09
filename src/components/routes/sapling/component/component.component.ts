import { Component } from "@craiglington/sapling";

import template from "./component.component.html?raw";
import styles from "./component.component.css?raw";

export class ComponentComponent extends Component {
  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();
  }
}

window.customElements.define("app-component", ComponentComponent);
