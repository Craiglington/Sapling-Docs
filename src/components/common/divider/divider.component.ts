import { Component } from "@craiglington/sapling";

import dividerTemplate from "./divider.component.html?raw";
import dividerStyles from "./divider.component.css?raw";

export class DividerComponent extends Component {
  constructor() {
    super({
      template: dividerTemplate,
      styles: [dividerStyles]
    });
  }
}

window.customElements.define("app-divider", DividerComponent);
