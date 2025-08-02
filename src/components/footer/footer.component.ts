import { Constants } from "../../config/constants";
import { Component, Value } from "@craiglington/sapling";

import footerTemplate from "./footer.component.html?raw";
import footerStyles from "./footer.component.css?raw";

export class FooterComponent extends Component {
  private appTitle = new Value(`${Constants.TITLE} ${Constants.EMOJI_ICON}`);
  private appSlogan = new Value(Constants.SLOGAN);
  private npmURL = new Value(Constants.NPM_URL);
  private srcURL = new Value(Constants.SOURCE_CODE_URL);
  private docsURL = new Value(Constants.DOCS_URL);
  private supportEmail = new Value(Constants.SUPPORT_EMAIL);

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

    const npmLink = this.getChild<HTMLAnchorElement>("#npm-link");
    if (npmLink) {
      this.npmURL.bindElementAttribute(npmLink, "href");
    }

    const srcLink = this.getChild<HTMLAnchorElement>("#source-link");
    if (srcLink) {
      this.srcURL.bindElementAttribute(srcLink, "href");
    }

    const docsLink = this.getChild<HTMLAnchorElement>("#documentation-link");
    if (docsLink) {
      this.docsURL.bindElementAttribute(docsLink, "href");
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
