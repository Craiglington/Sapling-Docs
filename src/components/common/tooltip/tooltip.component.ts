import { Component, Value } from "@craiglington/sapling";
import { OverlayService } from "../../../services/overlay.service";
import overlayStyles from "./../../../styles/overlay.css?raw";
import tooltipStyles from "./tooltip.component.css?raw";
import tooltipTemplate from "./tooltip.component.html?raw";

export class TooltipComponent extends Component {
  static observedAttributes = ["tooltip"];
  private _visible = new Value(false);
  private target?: HTMLSlotElement;
  private tooltipElement?: HTMLSlotElement;

  constructor() {
    super({
      template: tooltipTemplate,
      styles: [overlayStyles, tooltipStyles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    this.target = this.getChild<HTMLSlotElement>("#target") || undefined;
    this.target?.addEventListener(
      "mouseenter",
      this.mouseEnterListener.bind(this)
    );
    this.target?.addEventListener(
      "mouseleave",
      this.mouseLeaveListener.bind(this)
    );

    this.tooltipElement =
      this.getChild<HTMLSlotElement>("#tooltip") || undefined;
    if (this.tooltipElement) {
      this._visible.bindElementClass(
        this.tooltipElement,
        "hidden",
        (value) => !value
      );
      this._visible.bindElementClass(this.tooltipElement, "show-overlay");
      this.attributeChangedCallback(
        "tooltip",
        "",
        this.getAttribute("tooltip") ?? ""
      );
    }
  }

  attributeChangedCallback(attribute: string, _: string, newValue: string) {
    if (attribute === "tooltip" && this.tooltipElement) {
      this.tooltipElement.innerText = newValue;
    }
  }

  get visible() {
    return this._visible.value;
  }

  private mouseEnterListener() {
    this._visible.value = true;
    if (this.tooltipElement) {
      OverlayService.positionFixedOverlay(this, this.tooltipElement);
    }
  }

  private mouseLeaveListener() {
    this._visible.value = false;
  }
}

window.customElements.define("app-tooltip", TooltipComponent);
