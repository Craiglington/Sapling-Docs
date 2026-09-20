import { Component } from "@craiglington/sapling";
import { CodeBlockComponent } from "./components/common/code-block/code-block.component";
import { CodeSnippetComponent } from "./components/common/code-snippet/code-snippet.component";
import { DividerComponent } from "./components/common/divider/divider.component";
import { DropdownMenuComponent } from "./components/common/dropdown-menu/dropdown-menu.component";
import { IconComponent } from "./components/common/icon/icon.component";
import { MenuComponent } from "./components/common/menu/menu.component";
import { RouterLinkComponent } from "./components/common/router-link/router-link.component";
import { SideNavComponent } from "./components/common/side-nav/side-nav.component";
import { TooltipComponent } from "./components/common/tooltip/tooltip.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MainComponent } from "./components/main/main.component";
import { HomeComponent } from "./components/routes/home/home.component";
import { ComponentComponent } from "./components/routes/sapling/component/component.component";
import { GettingStartedComponent } from "./components/routes/sapling/getting-started/getting-started.component";
import styles from "./styles.css?raw";

// Add global style sheets.
Component.addGlobalStyleSheet(styles);

// Add components as custom elements.
window.customElements.define("app-main", MainComponent);
window.customElements.define("app-home", HomeComponent);
window.customElements.define("app-getting-started", GettingStartedComponent);
window.customElements.define("app-component", ComponentComponent);

window.customElements.define("app-code-block", CodeBlockComponent);
window.customElements.define("app-code-snippet", CodeSnippetComponent);
window.customElements.define("app-divider", DividerComponent);
window.customElements.define("app-dropdown-menu", DropdownMenuComponent);
window.customElements.define("app-icon", IconComponent);
window.customElements.define("app-menu", MenuComponent);
window.customElements.define("app-router-link", RouterLinkComponent);
window.customElements.define("app-side-nav", SideNavComponent);
window.customElements.define("app-tooltip", TooltipComponent);
window.customElements.define("app-footer", FooterComponent);
window.customElements.define("app-header", HeaderComponent);
