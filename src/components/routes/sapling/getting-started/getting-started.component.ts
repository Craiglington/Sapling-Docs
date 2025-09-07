import { Component, Value } from "@craiglington/sapling";
import { Constants } from "../../../../config/constants";

import template from "./getting-started.component.html?raw";
import styles from "./getting-started.component.css?raw";

export class GettingStartedComponent extends Component {
  clientURL = new Value(`https://${import.meta.env.VITE_CLIENT_URL}`);

  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const titles = this.getChildren(".app-title");
    titles?.forEach((title) => {
      title.innerHTML = Constants.TITLE;
    });

    const sourceCodeLinks =
      this.getChildren<HTMLAnchorElement>(".source-code-link");
    sourceCodeLinks?.forEach((link) => {
      link.href = Constants.SOURCE_CODE_URL;
    });

    const documentationSourceCodeLinks = this.getChildren<HTMLAnchorElement>(
      ".documentation-source-code-link"
    );
    documentationSourceCodeLinks?.forEach((link) => {
      link.href = Constants.DOCUMENTATION_SOURCE_CODE_URL;
    });

    const npmLinks = this.getChildren<HTMLAnchorElement>(".npm-link");
    npmLinks?.forEach((link) => {
      link.href = Constants.NPM_URL;
    });
  }
}

window.customElements.define("app-getting-started", GettingStartedComponent);
