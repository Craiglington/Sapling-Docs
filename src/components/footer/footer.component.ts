import { Constants } from "../../config/constants";
import { Component, Value } from "@craiglington/sapling";

import footerTemplate from "./footer.component.html?raw";
import footerStyles from "./footer.component.css?raw";

export class FooterComponent extends Component {
  appTitle = new Value(Constants.TITLE);
  appSlogan = new Value(Constants.SLOGAN);
  privacyURL = new Value(`https://${import.meta.env.VITE_CLIENT_URL}/privacy`);
  supportEmail = new Value(Constants.SUPPORT_EMAIL);

  constructor() {
    super({
      template: footerTemplate,
      styles: [footerStyles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const titleHeading = this.getChild<HTMLHeadingElement>("#app-title");
    if (titleHeading) {
      this.appTitle.bindElementProperty(titleHeading, "innerText");
    }

    const sloganParagraph = this.getChild<HTMLParagraphElement>("#app-slogan");
    if (sloganParagraph) {
      this.appSlogan.bindElementProperty(sloganParagraph, "innerText");
    }

    const privacyLink = this.getChild<HTMLAnchorElement>("#privacy-link");
    if (privacyLink) {
      this.privacyURL.bindElementAttribute(privacyLink, "href");
    }

    const contactLink = this.getChild<HTMLAnchorElement>("#contact-link");
    if (contactLink) {
      this.supportEmail.bindElementAttribute(
        contactLink,
        "href",
        (value) => `mailto:${value}`
      );
      this.supportEmail.bindElementProperty(contactLink, "innerText");
    }
  }
}

window.customElements.define("app-footer", FooterComponent);
