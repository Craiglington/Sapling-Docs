import { Component, Value } from "@craiglington/sapling";

import tooltipTemplate from "./tooltip.component.html?raw";
import tooltipStyles from "./tooltip.component.css?raw";
import overlayStyles from "./../../../styles/overlay.css?raw";
import { OverlayService } from "../../../services/overlay.service";

export class TooltipComponent extends Component {
  private _target?: HTMLElement;
  private _visible = new Value(false);
  private tooltipElement?: HTMLSlotElement;

  constructor() {
    super({
      template: tooltipTemplate,
      styles: [overlayStyles, tooltipStyles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    this._visible.bindElementClass(this, "hidden", (value) => !value);

    this.tooltipElement =
      this.getChild<HTMLSlotElement>("#tooltip") || undefined;
    if (this.tooltipElement) {
      this._visible.bindElementClass(this.tooltipElement, "show-overlay");
    }
  }

  set target(target: HTMLElement | undefined) {
    if (this._target) {
      this._target.removeEventListener("mouseenter", this.mouseEnterListener);
      this._target.removeEventListener("mouseleave", this.mouseLeaveListener);
    }

    this._target = target;
    if (this._target) {
      this._target.addEventListener(
        "mouseenter",
        this.mouseEnterListener.bind(this)
      );
      this._target.addEventListener(
        "mouseleave",
        this.mouseLeaveListener.bind(this)
      );
    }
  }

  get visible() {
    return this._visible.value;
  }

  get tooltip() {
    return this.innerText;
  }

  set tooltip(text: string) {
    this.innerText = text;
  }

  private mouseEnterListener() {
    this._visible.value = true;
    if (this._target && this.tooltipElement) {
      OverlayService.positionOverlay(this._target, this.tooltipElement);
    }
  }

  private mouseLeaveListener() {
    this._visible.value = false;
  }
}

window.customElements.define("app-tooltip", TooltipComponent);
