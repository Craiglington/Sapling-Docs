import { Component, Value } from "@craiglington/sapling";

import menuTemplate from "./menu.component.html?raw";
import menuStyles from "./menu.component.css?raw";

export class MenuComponent extends Component {
  target?: Element;
  menuDropdown?: HTMLDivElement;
  showMenu = new Value(false);

  constructor() {
    super({
      template: menuTemplate,
      styles: [menuStyles],
      attachShadowRoot: false,
      insertSelector: "#menu-dropdown"
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const menuModal = this.getChild<HTMLDivElement>("#menu-modal");
    if (menuModal) {
      this.showMenu.bindElementClass(menuModal, "hidden", (value) => !value);
      menuModal.addEventListener("click", () => {
        this.showMenu.value = false;
      });
    }

    this.menuDropdown =
      this.getChild<HTMLDivElement>("#menu-dropdown") || undefined;
  }

  setTarget(target: Element | undefined) {
    this.target = target;
  }

  setShowMenu(showMenu: boolean) {
    this.showMenu.value = showMenu;
    if (showMenu && this.target && this.menuDropdown) {
      const targetPosition = this.target.getBoundingClientRect();
      if (
        targetPosition.bottom + this.menuDropdown.offsetHeight <=
        window.innerHeight
      ) {
        this.menuDropdown.style.top = `${targetPosition.bottom}px`;
      } else {
        this.menuDropdown.style.top = `${targetPosition.top - this.menuDropdown.offsetHeight}px`;
      }

      if (
        targetPosition.left + this.menuDropdown.offsetWidth <=
        window.innerWidth
      ) {
        this.menuDropdown.style.left = `${targetPosition.left}px`;
      } else {
        this.menuDropdown.style.left = `${targetPosition.right - this.menuDropdown.offsetWidth}px`;
      }
    }
  }
}

window.customElements.define("app-menu", MenuComponent);
