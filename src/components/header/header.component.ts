import { Component, RouterService, Value } from "@craiglington/sapling";
import { Constants } from "../../config/constants";
import { AppState, type Theme } from "../../config/state";
import type { IconComponent } from "../common/icon/icon.component";
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
      // Set click listener
      menuButton.addEventListener("click", () => {
        AppState.dispatch("showNav", (value) => !value);
      });
    }

    const homeButton = this.getChild<HTMLButtonElement>("#home-button");
    if (homeButton) {
      // Set click listener
      homeButton.addEventListener("click", () => {
        RouterService.route("/");
      });

      // Set icon
      this.appEmojiIcon.bindElementProperty(homeButton, "innerHTML");
    }

    const searchButton = this.getChild<HTMLButtonElement>("#search-button");
    if (searchButton) {
      // Set click listener
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
        this.theme.bindElementAttribute(themeTooltip, "tooltip", (theme) =>
          theme === "dark" ? "Light Mode" : "Dark Mode"
        );
      }
    }
  }
}

window.customElements.define("app-header", HeaderComponent);
