import { Component } from "@craiglington/sapling";

import template from "./main.component.html?raw";
import styles from "./main.component.css?raw";
import { initRouterService } from "../../config/router";

export class MainComponent extends Component {
  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();
    initRouterService();
    // const sideNav = this.getChild<SideNavComponent>("app-side-nav");
    // if (sideNav) {
    //   sideNav.loadingComplete((complete) => {
    //     if (!complete) return;
    //     initRouterService();
    //   });
    //   AppState.subscribe("showNav", (showNav) => {
    //     sideNav.showNav = showNav;
    //   });
    // }
  }
}

window.customElements.define("app-main", MainComponent);
