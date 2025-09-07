import { Component, RouterService, Value } from "@craiglington/sapling";

import template from "./router-link.component.html?raw";
import styles from "./router-link.component.css?raw";

export class RouterLinkComponent extends Component {
  static observedAttributes = ["route"];
  route = new Value("");

  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const link = this.getChild<HTMLAnchorElement>("#router-link") || undefined;
    if (link) {
      this.route.bindElementAttribute(link, "href");
      link?.addEventListener("click", (event: Event) => {
        event.preventDefault();
        RouterService.route(this.route.value);
      });
    }
  }

  attributeChangedCallback(attribute: string, _: string, newValue: string) {
    if (attribute === "route") {
      this.route.value = newValue;
    }
  }
}

window.customElements.define("app-router-link", RouterLinkComponent);
