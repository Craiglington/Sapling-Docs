import loginTemplate from "./login.component.html?raw";
import loginStyles from "./login.component.css?raw";
import { Component, Value } from "@craiglington/sapling";
import { AppState, type Layout } from "../../../config/state";
import { Constants } from "../../../config/constants";

export class LoginComponent extends Component {
  layout = new Value<Layout>("horizontal");
  mobile = new Value(false);
  appTitle = new Value(Constants.TITLE);
  appSlogan = new Value(Constants.SLOGAN);

  constructor() {
    super({
      template: loginTemplate,
      styles: [loginStyles]
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

    const frontPageElement = this.getChild<HTMLParagraphElement>("#front-page");
    if (frontPageElement) {
      this.layout.bindElementClass(
        frontPageElement,
        "vertical",
        (value) => value === "vertical"
      );
    }

    const loginElement = this.getChild<HTMLParagraphElement>("#login");
    if (loginElement) {
    }

    const artElement = this.getChild<HTMLParagraphElement>("#art");
    if (artElement) {
    }
  }
}

window.customElements.define("app-login", LoginComponent);
