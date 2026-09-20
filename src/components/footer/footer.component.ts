import { Component, Value } from "@craiglington/sapling";
import {
  DOCUMENTATION_SOURCE_CODE_URL,
  NPM_URL,
  SLOGAN,
  SOURCE_CODE_URL,
  SUPPORT_EMAIL,
  TITLE
} from "../../constants";
import footerStyles from "./footer.component.css?raw";
import footerTemplate from "./footer.component.html?raw";

export class FooterComponent extends Component {
  private appTitle = new Value(`${TITLE} LOGO`);

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
      sloganParagraph.innerText = SLOGAN;
    }

    const npmLink = this.getChild<HTMLAnchorElement>("#npm-link");
    if (npmLink) {
      npmLink.href = NPM_URL;
    }

    const srcLink = this.getChild<HTMLAnchorElement>("#source-link");
    if (srcLink) {
      srcLink.href = SOURCE_CODE_URL;
    }

    const docsLink = this.getChild<HTMLAnchorElement>("#documentation-link");
    if (docsLink) {
      docsLink.href = DOCUMENTATION_SOURCE_CODE_URL;
    }

    const contactLink = this.getChild<HTMLAnchorElement>("#contact-link");
    if (contactLink) {
      contactLink.href = `mailto:${SUPPORT_EMAIL}`;
      contactLink.innerText = SUPPORT_EMAIL;
    }
  }
}
