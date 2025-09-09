import { Component, Value } from "@craiglington/sapling";

import template from "./code-block.component.html?raw";
import styles from "./code-block.component.css?raw";
import { TooltipComponent } from "../tooltip/tooltip.component";
import { CodeService } from "../../../services/code.service";

export class CodeBlockComponent extends Component {
  private tooltip = new Value("");
  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const tooltipElement = this.getChild<TooltipComponent>("#copy-tooltip");
    if (tooltipElement) {
      this.tooltip.bindElementAttribute(tooltipElement, "tooltip");
    }

    const copyButton = this.getChild("#copy-button");
    copyButton?.addEventListener("mouseenter", () => {
      this.tooltip.value = "Copy";
    });

    copyButton?.addEventListener("click", () => {
      navigator.clipboard
        .writeText(CodeService.decodeHTML(this.innerHTML))
        .then(() => {
          this.tooltip.value = "Copied!";
        });
    });
  }
}

window.customElements.define("app-code-block", CodeBlockComponent);
