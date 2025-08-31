import { Component, Value } from "@craiglington/sapling";

import template from "./side-nav.component.html?raw";
import styles from "./side-nav.component.css?raw";

export class SideNavComponent extends Component {
  private _showNav = new Value(false);

  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    this._showNav.bindElementClass(this, "show-side-nav");

    const sideNavBackground = this.getChild<HTMLDivElement>(
      "#side-nav-background"
    );
    if (sideNavBackground) {
      this._showNav.bindElementClass(sideNavBackground, "show-side-nav");
    }

    const sideNav = this.getChild<HTMLSlotElement>("#side-nav");
    if (sideNav) {
      this._showNav.bindElementClass(sideNav, "show-side-nav");
      this._showNav.bindElementPropertyWith(
        sideNav,
        "inert",
        (value) => !value
      );
    }
  }

  set showNav(show: boolean) {
    this._showNav.value = show;
  }
}

window.customElements.define("app-side-nav", SideNavComponent);
