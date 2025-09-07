import { Constants } from "../../config/constants";
import { Component, Value } from "@craiglington/sapling";

import footerTemplate from "./footer.component.html?raw";
import footerStyles from "./footer.component.css?raw";

export class FooterComponent extends Component {
  private appTitle = new Value(`${Constants.TITLE} ${Constants.EMOJI_ICON}`);

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
      sloganParagraph.innerText = Constants.SLOGAN;
    }

    const npmLink = this.getChild<HTMLAnchorElement>("#npm-link");
    if (npmLink) {
      npmLink.href = Constants.NPM_URL;
    }

    const srcLink = this.getChild<HTMLAnchorElement>("#source-link");
    if (srcLink) {
      srcLink.href = Constants.SOURCE_CODE_URL;
    }

    const docsLink = this.getChild<HTMLAnchorElement>("#documentation-link");
    if (docsLink) {
      docsLink.href = Constants.DOCUMENTATION_SOURCE_CODE_URL;
    }

    const contactLink = this.getChild<HTMLAnchorElement>("#contact-link");
    if (contactLink) {
      contactLink.href = `mailto:${Constants.SUPPORT_EMAIL}`;
      contactLink.innerText = Constants.SUPPORT_EMAIL;
    }
  }
}

window.customElements.define("app-footer", FooterComponent);
