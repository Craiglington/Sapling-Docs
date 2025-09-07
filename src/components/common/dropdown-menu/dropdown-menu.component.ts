import { Component, Value } from "@craiglington/sapling";
import styles from "./dropdown-menu.component.css?raw";
import template from "./dropdown-menu.component.html?raw";

export class DropdownMenuComponent extends Component {
  static observedAttributes = ["title", "height"];
  private titleElement?: HTMLSpanElement;
  private dropdownMenuElement?: HTMLDivElement;
  private _visible = new Value(false);

  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    this.titleElement = this.getChild<HTMLSpanElement>("#title") || undefined;
    if (this.titleElement) {
      this.titleElement.innerText = this.getAttribute("title") || "";
    }

    const dropdownButton = this.getChild<HTMLButtonElement>("#dropdown-button");
    dropdownButton?.addEventListener("click", () => {
      this._visible.set((visible) => !visible);
    });
    if (dropdownButton) {
      this._visible.bindElementClass(dropdownButton, "visible");
    }

    this.dropdownMenuElement =
      this.getChild<HTMLDivElement>("#dropdown-menu") || undefined;
    if (this.dropdownMenuElement) {
      this._visible.bindElementClass(this.dropdownMenuElement, "visible");
      this._visible.bindElementPropertyWith(
        this.dropdownMenuElement,
        "inert",
        (visible) => !visible
      );
      this.dropdownMenuElement.style.setProperty(
        "--dropdown-menu-height",
        this.getAttribute("height") || ""
      );
    }
  }

  attributeChangedCallback(attribute: string, _: string, newValue: string) {
    if (attribute === "title" && this.titleElement) {
      this.titleElement.innerText = newValue;
    } else if (attribute === "height" && this.dropdownMenuElement) {
      this.dropdownMenuElement.style.setProperty(
        "--dropdown-menu-height",
        newValue
      );
    }
  }

  get visible() {
    return this._visible.value;
  }
}

window.customElements.define("app-dropdown-menu", DropdownMenuComponent);
