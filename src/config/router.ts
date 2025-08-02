import { RouterService } from "@craiglington/sapling";
import { PrivacyComponent } from "../components/routes/privacy/privacy.component";
import { HomeComponent } from "../components/routes/home/home.component";

RouterService.init({
  routes: [
    {
      path: new RegExp(/^\/privacy$/),
      component: PrivacyComponent
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
