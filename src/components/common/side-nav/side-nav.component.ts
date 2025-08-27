import {
  Component,
  Subject,
  Value,
  type Subscriber,
  type Subscription
} from "@craiglington/sapling";

import template from "./side-nav.component.html?raw";
import styles from "./side-nav.component.css?raw";

export class SideNavComponent extends Component {
  private _loadingComplete = new Subject(false);
  private _showNav = new Value(false);

  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();
    this._loadingComplete.emit(true);

    this._showNav.bindElementClass(this, "show-nav");

    const sideNav = this.getChild<HTMLDivElement>(".side-nav");
    if (sideNav) {
      this._showNav.bindElementPropertyWith(
        sideNav,
        "inert",
        (value) => !value
      );
    }
  }

  loadingComplete(subscriber: Subscriber<boolean>): Subscription {
    return this._loadingComplete.subscribe(subscriber);
  }

  set showNav(show: boolean) {
    this._showNav.value = show;
  }
}

window.customElements.define("app-side-nav", SideNavComponent);
