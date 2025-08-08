import homeTemplate from "./home.component.html?raw";
import homeStyles from "./home.component.css?raw";
import { Component, RouterService, Value } from "@craiglington/sapling";
import { AppState, type Layout } from "../../../config/state";
import { Constants } from "../../../config/constants";

export class HomeComponent extends Component {
  layout = new Value<Layout>("horizontal");
  mobile = new Value(false);
  appTitle = new Value(`${Constants.TITLE} ${Constants.EMOJI_ICON}`);
  appSlogan = new Value(Constants.SLOGAN);

  constructor() {
    super({
      template: homeTemplate,
      styles: [homeStyles]
    });

    AppState.subscribe("layout", (value) => {
      this.layout.value = value;
    });
    AppState.subscribe("mobile", (value) => {
      this.mobile.value = value;
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const titleElement = this.getChild<HTMLHeadingElement>("#app-title");
    if (titleElement) {
      this.appTitle.bindElementProperty(titleElement, "innerText");
    }

    const sloganElement = this.getChild<HTMLParagraphElement>("#app-slogan");
    if (sloganElement) {
      this.appSlogan.bindElementProperty(sloganElement, "innerText");
    }

    const homePageElement = this.getChild<HTMLParagraphElement>("#home-page");
    if (homePageElement) {
      this.layout.bindElementClass(
        homePageElement,
        "vertical",
        (value) => value === "vertical"
      );
    }

    const getStartedButton = this.getChild<HTMLButtonElement>("#get-started");
    if (getStartedButton) {
      getStartedButton.addEventListener("click", () => {
        RouterService.route("/docs");
      });
    }
  }
}

window.customElements.define("app-home", HomeComponent);
