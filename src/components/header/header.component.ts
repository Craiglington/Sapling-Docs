import headerTemplate from "./header.component.html?raw";
import headerStyles from "./header.component.css?raw";
import { Component, Value } from "@craiglington/sapling";
import { AppState, type Theme } from "../../config/state";
import { Constants } from "../../config/constants";
import type { MenuComponent } from "../common/menu/menu.component";
import type { IconComponent } from "../common/icon/icon.component";

export class HeaderComponent extends Component {
  theme: Value<Theme> = new Value("dark");
  appTitle = new Value(Constants.TITLE);

  constructor() {
    super({
      template: headerTemplate,
      styles: [headerStyles]
    });

    AppState.subscribe("theme", (value) => {
      this.theme.value = value;
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const menu = this.getChild<MenuComponent>("#menu");

    const menuButton = this.getChild<HTMLButtonElement>("#menu-button");
    if (menuButton) {
      const icon = menuButton.querySelector<IconComponent>("app-icon");
      if (icon) {
        icon.setIcon("menu");
      }
      if (menu) {
        menu.setTarget(menuButton);
      }
      menuButton.addEventListener("click", () => {
        if (menu) {
          menu.setShowMenu(true);
        }
      });
    }

    const homeButton = this.getChild<HTMLButtonElement>("#home-button");
    if (homeButton) {
      const icon = homeButton.querySelector<IconComponent>("app-icon");
      if (icon) {
        icon.setIcon("home");
      }
    }

    const searchButton = this.getChild<HTMLButtonElement>("#search-button");
    if (searchButton) {
      const icon = searchButton.querySelector<IconComponent>("app-icon");
      if (icon) {
        icon.setIcon("search");
      }
    }

    const titleSpan = this.getChild<HTMLSpanElement>("#title");
    if (titleSpan) {
      this.appTitle.bindElementProperty(titleSpan, "innerHTML");
    }

    const themeButton = this.getChild<HTMLButtonElement>("#theme-button");
    if (themeButton) {
      const lightIcon =
        themeButton.querySelector<IconComponent>("app-icon#light");
      if (lightIcon) {
        lightIcon.setIcon("light_mode");
        this.theme.bindElementClass(
          lightIcon,
          "hidden",
          (value) => value === "light"
        );
      }

      const darkIcon =
        themeButton.querySelector<IconComponent>("app-icon#dark");
      if (darkIcon) {
        darkIcon.setIcon("dark_mode");
        this.theme.bindElementClass(
          darkIcon,
          "hidden",
          (value) => value === "dark"
        );
      }

      themeButton.addEventListener("click", () => {
        AppState.dispatch("theme", (theme) =>
          theme === "dark" ? "light" : "dark"
        );
      });
    }
  }
}

window.customElements.define("app-header", HeaderComponent);
