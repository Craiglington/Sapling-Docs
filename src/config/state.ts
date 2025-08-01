import { Constants } from "./constants.js";
import { State } from "@craiglington/sapling";

export type Theme = "light" | "dark";
let theme = localStorage.getItem("theme") as Theme | null;
if (!theme || theme !== "light") theme = "dark";

export type Layout = "horizontal" | "vertical";

export const AppState = new State<{
  theme: Theme;
  mobile: boolean;
  layout: Layout;
}>({
  theme: theme,
  mobile: false,
  layout: "horizontal"
});

AppState.subscribe("theme", (theme) => {
  if (theme === "light") {
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});

const windowResizeEvent = () => {
  AppState.dispatchValue("mobile", window.innerWidth <= Constants.MOBILE_WIDTH);
  AppState.dispatchValue(
    "layout",
    window.innerWidth >= window.innerHeight ? "horizontal" : "vertical"
  );
};
windowResizeEvent();

window.addEventListener("resize", windowResizeEvent);
