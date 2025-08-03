import { Component, Value } from "@craiglington/sapling";

import menuTemplate from "./menu.component.html?raw";
import menuStyles from "./menu.component.css?raw";
import overlayStyles from "./../../../styles/overlay.css?raw";
import { OverlayService } from "../../../services/overlay.service";

export class MenuComponent extends Component {
  private _target?: HTMLElement;
  private menuDropdown?: HTMLDivElement;
  private _visible = new Value(false);

  constructor() {
    super({
      template: menuTemplate,
      styles: [overlayStyles, menuStyles],
      attachShadowRoot: false,
      insertSelector: ".menu-dropdown"
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    this._visible.bindElementClass(this, "hidden", (value) => !value);
    this.addEventListener("click", () => {
      this._visible.value = false;
    });

    this.menuDropdown =
      this.getChild<HTMLDivElement>(".menu-dropdown") || undefined;
    if (this.menuDropdown) {
      this._visible.bindElementClass(this.menuDropdown, "show-overlay");
    }
  }

  set target(target: HTMLElement | undefined) {
    this._target = target;
  }

  get visible() {
    return this._visible.value;
  }

  set visible(visible: boolean) {
    this._visible.value = visible;
    if (visible && this._target && this.menuDropdown) {
      OverlayService.positionOverlay(this._target, this.menuDropdown);
    }
  }
}

window.customElements.define("app-menu", MenuComponent);
