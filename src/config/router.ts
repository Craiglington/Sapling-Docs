import { RouterService } from "@craiglington/sapling";
import { HomeComponent } from "../components/routes/home/home.component";
import { GettingStartedComponent } from "../components/routes/sapling/getting-started/getting-started.component";
import { ComponentComponent } from "../components/routes/sapling/component/component.component";

export function initRouterService() {
  RouterService.init({
    routes: [
      {
        path: new RegExp(/^\/sapling\/getting-started$/),
        component: GettingStartedComponent
      },
      {
        path: new RegExp(/^\/sapling\/component$/),
        component: ComponentComponent
      },
      {
        path: new RegExp(/^\/$/),
        component: HomeComponent
      },

      // This route must remain last!
      {
        path: new RegExp(/^.*$/),
        redirectTo: "/"
      }
    ]
  });
}
