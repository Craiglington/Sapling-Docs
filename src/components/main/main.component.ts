import { Component } from "@craiglington/sapling";

import template from "./main.component.html?raw";
import styles from "./main.component.css?raw";
import { initRouterService } from "../../config/router";
import type { SideNavComponent } from "../common/side-nav/side-nav.component";
import { StateService } from "../../services/state.service";

export class MainComponent extends Component {
  constructor() {
    super({
      template: template,
      styles: [styles]
    });
  }

  override async connectedCallback() {
    await super.connectedCallback();

    const sideNav = this.getChild<SideNavComponent>("app-side-nav");
    if (sideNav) {
      StateService.subscribe("showNav", (showNav) => {
        sideNav.showNav = showNav;
      });
    }

    initRouterService();
  }
}
