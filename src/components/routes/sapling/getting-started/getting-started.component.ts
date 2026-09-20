import { Component } from "@craiglington/sapling";
import {
  DOCUMENTATION_SOURCE_CODE_URL,
  NPM_URL,
  SOURCE_CODE_URL,
  TITLE
} from "../../../../constants";
import styles from "./getting-started.component.css?raw";
import template from "./getting-started.component.html?raw";

export class GettingStartedComponent extends Component {
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
      title.innerHTML = TITLE;
    });

    const sourceCodeLinks =
      this.getChildren<HTMLAnchorElement>(".source-code-link");
    sourceCodeLinks?.forEach((link) => {
      link.href = SOURCE_CODE_URL;
    });

    const documentationSourceCodeLinks = this.getChildren<HTMLAnchorElement>(
      ".documentation-source-code-link"
    );
    documentationSourceCodeLinks?.forEach((link) => {
      link.href = DOCUMENTATION_SOURCE_CODE_URL;
    });

    const npmLinks = this.getChildren<HTMLAnchorElement>(".npm-link");
    npmLinks?.forEach((link) => {
      link.href = NPM_URL;
    });
  }
}
