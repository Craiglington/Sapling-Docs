import { RouterService } from "@craiglington/sapling";
import { DocsComponent } from "../components/routes/docs/docs.component";
import { HomeComponent } from "../components/routes/home/home.component";

RouterService.init({
  routes: [
    {
      path: new RegExp(/^\/docs$/),
      component: DocsComponent
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
