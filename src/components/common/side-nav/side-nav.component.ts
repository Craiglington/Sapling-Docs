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

    const sideNavComponent = this.getChild("#side-nav-component");
    if (sideNavComponent) {
      this._showNav.bindElementClass(sideNavComponent, "show-side-nav");
    }

    const sideNav = this.getChild<HTMLSlotElement>("#side-nav");
    if (sideNav) {
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
