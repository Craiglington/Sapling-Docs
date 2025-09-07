import homeTemplate from "./home.component.html?raw";
import homeStyles from "./home.component.css?raw";
import { Component, RouterService, Value } from "@craiglington/sapling";
import { Constants } from "../../../config/constants";

export class HomeComponent extends Component {
  appTitle = new Value(`${Constants.TITLE} ${Constants.EMOJI_ICON}`);
  appSlogan = new Value(Constants.SLOGAN);

  constructor() {
    super({
      template: homeTemplate,
      styles: [homeStyles]
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

    const getStartedButton = this.getChild<HTMLButtonElement>("#get-started");
    if (getStartedButton) {
      getStartedButton.addEventListener("click", () => {
        RouterService.route("/getting-started");
      });
    }
  }
}

window.customElements.define("app-home", HomeComponent);
