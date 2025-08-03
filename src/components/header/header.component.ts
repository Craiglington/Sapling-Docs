import headerTemplate from "./header.component.html?raw";
import headerStyles from "./header.component.css?raw";
import { Component, Value } from "@craiglington/sapling";
import { AppState, type Theme } from "../../config/state";
import { Constants } from "../../config/constants";
import type { MenuComponent } from "../common/menu/menu.component";
import type { IconComponent } from "../common/icon/icon.component";
import { TooltipComponent } from "../common/tooltip/tooltip.component";

export class HeaderComponent extends Component {
  theme: Value<Theme> = new Value("dark");
  appEmojiIcon = new Value(Constants.EMOJI_ICON);

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
        menu.target = menuButton;
      }
      menuButton.addEventListener("click", () => {
        if (menu) {
          menu.visible = true;
        }
      });
      const menuTooltip = this.getChild<TooltipComponent>("#menu-tooltip");
      if (menuTooltip) {
        menuTooltip.target = menuButton;
        menuTooltip.tooltipText = "Menu";
      }
    }

    const homeButton = this.getChild<HTMLButtonElement>("#home-button");
    if (homeButton) {
      this.appEmojiIcon.bindElementProperty(homeButton, "innerHTML");
      const homeTooltip = this.getChild<TooltipComponent>("#home-tooltip");
      if (homeTooltip) {
        homeTooltip.target = homeButton;
        homeTooltip.tooltipText = "Home";
      }
    }

    const searchButton = this.getChild<HTMLButtonElement>("#search-button");
    if (searchButton) {
      const icon = searchButton.querySelector<IconComponent>("app-icon");
      if (icon) {
        icon.setIcon("search");
      }
      const searchTooltip = this.getChild<TooltipComponent>("#search-tooltip");
      if (searchTooltip) {
        searchTooltip.target = searchButton;
        searchTooltip.tooltipText = "Search";
      }
    }

    const themeButton = this.getChild<HTMLButtonElement>("#theme-button");
    if (themeButton) {
      const themeTooltip = this.getChild<TooltipComponent>("#theme-tooltip");
      if (themeTooltip) {
        themeTooltip.target = themeButton;
        this.theme.bindElementProperty(themeTooltip, "tooltipText", (theme) =>
          theme === "dark" ? "Light Mode" : "Dark Mode"
        );
      }
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
