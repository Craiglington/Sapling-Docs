import { Component, Value } from "@craiglington/sapling";

import template from "./code-snippet.component.html?raw";
import styles from "./code-snippet.component.css?raw";
import { TooltipComponent } from "../tooltip/tooltip.component";

export class CodeSnippetComponent extends Component {
  private _codeSnippet = new Value("");

  constructor() {
    super({
      template: template,
      styles: [styles],
      insertSelector: "#code-snippet"
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const codeSnippetElement = this.getChild<HTMLSpanElement>("#code-snippet");
    const tooltip = this.getChild<TooltipComponent>("#tooltip");
    if (codeSnippetElement) {
      // Use existing innerText if any
      if (codeSnippetElement.innerText) {
        this._codeSnippet.value = codeSnippetElement.innerText;
      }

      this._codeSnippet.bindElementProperty(codeSnippetElement, "innerText");

      if (tooltip) {
        tooltip.target = codeSnippetElement;
      }

      codeSnippetElement.addEventListener("mouseenter", () => {
        if (tooltip) {
          tooltip.tooltip = "Click to copy";
        }
      });

      codeSnippetElement.addEventListener("click", () => {
        navigator.clipboard.writeText(codeSnippetElement.innerHTML).then(() => {
          if (tooltip) {
            tooltip.tooltip = "Copied!";
          }
        });
      });
    }
  }

  get codeSnippet() {
    return this._codeSnippet.value;
  }

  set codeSnippet(text: string) {
    this._codeSnippet.value = text;
  }
}

window.customElements.define("app-code-snippet", CodeSnippetComponent);
