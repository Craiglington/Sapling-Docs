import { Component, Value } from "@craiglington/sapling";
import { Constants } from "../../../config/constants";

import privacyTemplate from "./privacy.component.html?raw";
import privacyStyles from "./privacy.component.css?raw";

export class PrivacyComponent extends Component {
  appTitle = new Value(Constants.TITLE);
  appSlogan = new Value(Constants.SLOGAN);
  supportEmail = new Value(Constants.SUPPORT_EMAIL);
  clientURL = new Value(`https://${import.meta.env.VITE_CLIENT_URL}`);

  constructor() {
    super({
      template: privacyTemplate,
      styles: [privacyStyles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const titles = this.getChildren(".app-title");
    titles?.forEach((titleElement) => {
      this.appTitle.bindElementProperty(titleElement, "innerHTML");
    });

    const websiteLink = this.getChild("#website-link");
    if (websiteLink) {
      this.clientURL.bindElementAttribute(websiteLink, "href");
      this.clientURL.bindElementProperty(websiteLink, "innerHTML");
    }

    const supportLink = this.getChild("#support-link");
    if (supportLink) {
      this.supportEmail.bindElementAttribute(
        supportLink,
        "href",
        (value) => `mailto:${value}`
      );
      this.supportEmail.bindElementProperty(supportLink, "innerHTML");
    }
  }
}

window.customElements.define("app-privacy", PrivacyComponent);
