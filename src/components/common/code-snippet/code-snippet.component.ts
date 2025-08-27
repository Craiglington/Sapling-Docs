import { Component } from "@craiglington/sapling";

import template from "./code-snippet.component.html?raw";
import styles from "./code-snippet.component.css?raw";
import { TooltipComponent } from "../tooltip/tooltip.component";

export class CodeSnippetComponent extends Component {
  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const codeSnippetElement = this.getChild<HTMLSlotElement>("#code-snippet");
    const tooltip = this.getChild<TooltipComponent>("#tooltip");
    if (codeSnippetElement) {
      if (tooltip) {
        tooltip.target = codeSnippetElement;
      }

      codeSnippetElement.addEventListener("mouseenter", () => {
        if (tooltip) {
          tooltip.tooltip = "Click to copy";
        }
      });

      codeSnippetElement.addEventListener("click", () => {
        navigator.clipboard.writeText(this.codeSnippet).then(() => {
          if (tooltip) {
            tooltip.tooltip = "Copied!";
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
