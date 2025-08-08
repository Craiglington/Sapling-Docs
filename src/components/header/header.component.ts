import { Component, RouterService, Value } from "@craiglington/sapling";
import { Constants } from "../../config/constants";
import { AppState, type Theme } from "../../config/state";
import type { IconComponent } from "../common/icon/icon.component";
import type { MenuComponent } from "../common/menu/menu.component";
import { TooltipComponent } from "../common/tooltip/tooltip.component";
import headerStyles from "./header.component.css?raw";
import headerTemplate from "./header.component.html?raw";

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

    const menuButton = this.getChild<HTMLButtonElement>("#menu-button");
    if (menuButton) {
      // Set dropdown menu
      const dropdownMenu = this.getChild<MenuComponent>("#dropdown-menu");
      if (dropdownMenu) {
        dropdownMenu.target = menuButton;
        dropdownMenu.addOnLoad((value) => {
          if (!value) return;
          this.setMenuButtonActions();
        });

        // Set click listener
        menuButton.addEventListener("click", () => {
          dropdownMenu.visible = true;
        });
      }

      // Set icon
      const icon = menuButton.querySelector<IconComponent>("app-icon");
      if (icon) {
        icon.icon = "menu";
      }

      // Set tooltip
      const menuTooltip = this.getChild<TooltipComponent>("#menu-tooltip");
      if (menuTooltip) {
        menuTooltip.target = menuButton;
        menuTooltip.tooltipText = "Menu";
      }
    }

    const homeButton = this.getChild<HTMLButtonElement>("#home-button");
    if (homeButton) {
      // Set click listener
      homeButton.addEventListener("click", () => {
        RouterService.route("/");
      });

      // Set icon
      this.appEmojiIcon.bindElementProperty(homeButton, "innerHTML");

      // Set tooltip
      const homeTooltip = this.getChild<TooltipComponent>("#home-tooltip");
      if (homeTooltip) {
        homeTooltip.target = homeButton;
        homeTooltip.tooltipText = "Home";
      }
    }

    const searchButton = this.getChild<HTMLButtonElement>("#search-button");
    if (searchButton) {
      // Set click listener

      // Set icon
      const icon = searchButton.querySelector<IconComponent>("app-icon");
      if (icon) {
        icon.icon = "search";
      }

      // Set tooltip
      const searchTooltip = this.getChild<TooltipComponent>("#search-tooltip");
      if (searchTooltip) {
        searchTooltip.target = searchButton;
        searchTooltip.tooltipText = "Search";
      }
    }

    const themeButton = this.getChild<HTMLButtonElement>("#theme-button");
    if (themeButton) {
      // Set click listener
      themeButton.addEventListener("click", () => {
        AppState.dispatch("theme", (theme) =>
          theme === "dark" ? "light" : "dark"
        );
      });

      // Set icon
      const icon = themeButton.querySelector<IconComponent>("app-icon");
      if (icon) {
        this.theme.bindElementPropertyWith(icon, "icon", (theme) =>
          theme === "dark" ? "light_mode" : "dark_mode"
        );
      }

      // Set tooltip
      const themeTooltip = this.getChild<TooltipComponent>("#theme-tooltip");
      if (themeTooltip) {
        themeTooltip.target = themeButton;
        this.theme.bindElementPropertyWith(
          themeTooltip,
          "tooltipText",
          (theme) => (theme === "dark" ? "Light Mode" : "Dark Mode")
        );
      }
    }
  }

  private setMenuButtonActions() {
    const viewDocumentationButton =
      this.getChild<HTMLButtonElement>("#getting-started");
    if (viewDocumentationButton) {
      viewDocumentationButton.addEventListener("click", () => {
        RouterService.route("/docs");
      });
    }
  }
}

window.customElements.define("app-header", HeaderComponent);
