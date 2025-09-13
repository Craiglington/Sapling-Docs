import { Component, Value } from "@craiglington/sapling";
import { OverlayService } from "../../../services/overlay.service";
import overlayStyles from "./../../../styles/overlay.css?raw";
import menuStyles from "./menu.component.css?raw";
import menuTemplate from "./menu.component.html?raw";

export class MenuComponent extends Component {
  private menu?: HTMLDivElement;
  private _visible = new Value(false);

  constructor() {
    super({
      template: menuTemplate,
      styles: [overlayStyles, menuStyles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const menuBackground = this.getChild<HTMLDivElement>("#menu-background");
    if (menuBackground) {
      this._visible.bindElementClass(
        menuBackground,
        "hidden",
        (visible) => !visible
      );
      this._visible.bindElementPropertyWith(
        menuBackground,
        "inert",
        (visible) => !visible
      );
      menuBackground.addEventListener("click", () => {
        this.visible = false;
      });
    }

    this.menu = this.getChild<HTMLDivElement>("#menu") || undefined;
    if (this.menu) {
      this._visible.bindElementClass(this.menu, "show-overlay");
    }

    const menuToggle = this.getChild<HTMLSlotElement>("#menu-toggle");
    menuToggle?.addEventListener("click", () => {
      this.visible = true;
    });
  }

  get visible() {
    return this._visible.value;
  }

  set visible(visible: boolean) {
    this._visible.value = visible;
    if (visible && this.menu) {
      OverlayService.positionFixedOverlay(this, this.menu);
    }
  }
}

window.customElements.define("app-menu", MenuComponent);
