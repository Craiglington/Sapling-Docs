import { Icons } from "./icons";
import { Component } from "@craiglington/sapling";
import { Value } from "@craiglington/sapling";

import iconTemplate from "./icon.component.html?raw";
import iconStyles from "./icon.component.css?raw";

export class IconComponent extends Component {
  static observedAttributes = ["icon"];
  private _icon = new Value<keyof typeof Icons>("empty");

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
      this._icon.bindElementAttribute(
        svg,
        "viewBox",
        (value) => Icons[value].viewBox
      );
    }

    const path = this.getChild("path");
    if (path) {
      this._icon.bindElementAttribute(path, "d", (value) => Icons[value].d);
    }
  }

  attributeChangedCallback(attribute: string, _: string, newValue: string) {
    if (
      attribute === "icon" &&
      Object.keys(Icons).some((key: string) => key === newValue)
    ) {
      this.icon = newValue as keyof typeof Icons;
    }
  }

  get icon() {
    return this._icon.value;
  }

  set icon(icon: keyof typeof Icons) {
    this._icon.value = icon;
  }
}

window.customElements.define("app-icon", IconComponent);
