import { Component, Value } from "@craiglington/sapling";

import template from "./code-snippet.component.html?raw";
import styles from "./code-snippet.component.css?raw";
import { TooltipComponent } from "../tooltip/tooltip.component";

export class CodeSnippetComponent extends Component {
  private tooltip = new Value("");

  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const codeSnippetElement = this.getChild<HTMLSlotElement>("#code-snippet");
    const tooltipElement = this.getChild<TooltipComponent>("#tooltip");
    if (tooltipElement) {
      this.tooltip.bindElementAttribute(tooltipElement, "tooltip");
    }

    if (codeSnippetElement) {
      codeSnippetElement.addEventListener("mouseenter", () => {
        if (tooltipElement) {
          this.tooltip.value = "Click to copy";
        }
      });

      codeSnippetElement.addEventListener("click", () => {
        navigator.clipboard.writeText(this.codeSnippet).then(() => {
          if (tooltipElement) {
            this.tooltip.value = "Copied!";
          }
        });
      });
    }
  }

  get codeSnippet() {
    return this.innerText;
  }

  set codeSnippet(text: string) {
    this.innerText = text;
  }
}

window.customElements.define("app-code-snippet", CodeSnippetComponent);
