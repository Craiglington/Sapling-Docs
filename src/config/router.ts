import { RouterService } from "@craiglington/sapling";
import { PrivacyComponent } from "../components/routes/privacy/privacy.component";
import { LoginComponent } from "../components/routes/login/login.component";

RouterService.init({
  routes: [
    {
      path: new RegExp(/^\/privacy$/),
      component: PrivacyComponent
    },
    {
      path: new RegExp(/^\/login$/),
      component: LoginComponent
    },

    // This route must remain last!
    {
      path: new RegExp(/^.*$/),
      redirectTo: "/login"
    }
  ]
});
