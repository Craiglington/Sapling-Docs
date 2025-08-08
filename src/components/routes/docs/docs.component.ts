import { Component, Value } from "@craiglington/sapling";
import { Constants } from "../../../config/constants";

import docsTemplate from "./docs.component.html?raw";
import docsStyles from "./docs.component.css?raw";

export class DocsComponent extends Component {
  appTitle = new Value(Constants.TITLE);
  clientURL = new Value(`https://${import.meta.env.VITE_CLIENT_URL}`);

  constructor() {
    super({
      template: docsTemplate,
      styles: [docsStyles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const titles = this.getChildren(".app-title");
    if (titles) {
      titles.forEach((title) => {
        this.appTitle.bindElementProperty(title, "innerHTML");
      });
    }
  }
}

window.customElements.define("app-docs", DocsComponent);
