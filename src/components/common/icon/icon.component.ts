import { Icons } from "./icons";
import { Component } from "@craiglington/sapling";
import { Value } from "@craiglington/sapling";

import iconTemplate from "./icon.component.html?raw";
import iconStyles from "./icon.component.css?raw";

export class IconComponent extends Component {
  private icon = new Value<keyof typeof Icons>("empty");

  constructor() {
    super({
      template: iconTemplate,
      styles: [iconStyles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const svg = this.getChild("svg");
    if (svg) {
      this.icon.bindElementAttribute(
        svg,
        "viewBox",
        (value) => Icons[value].viewBox
      );
    }

    const path = this.getChild("path");
    if (path) {
      this.icon.bindElementAttribute(path, "d", (value) => Icons[value].d);
    }
  }

  setIcon(icon: keyof typeof Icons) {
    this.icon.value = icon;
  }
}

window.customElements.define("app-icon", IconComponent);
