import { RouterService } from "@craiglington/sapling";
import { HomeComponent } from "../components/routes/home/home.component";
import { GettingStartedComponent } from "../components/routes/sapling/getting-started/getting-started.component";

export function initRouterService() {
  RouterService.init({
    routes: [
      {
        path: new RegExp(/^\/getting-started$/),
        component: GettingStartedComponent
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
