import { State } from "@craiglington/sapling";

export type Theme = "light" | "dark";
export type Layout = "horizontal" | "vertical";

export class StateService {
  private static state = new State<{
    theme: Theme;
    mobile: boolean;
    layout: Layout;
    showNav: boolean;
  }>({
    theme: "light",
    mobile: false,
    layout: "horizontal",
    showNav: false
  });

  private static windowResizeEvent = () => {
    StateService.state.dispatchValue("mobile", window.innerWidth <= 450);
    StateService.state.dispatchValue(
      "layout",
      window.innerWidth >= window.innerHeight ? "horizontal" : "vertical"
    );
  };

  static {
    const storedTheme = localStorage.getItem("theme");
    StateService.state.dispatchValue(
      "theme",
      storedTheme === "dark" ? storedTheme : "light"
    );
    StateService.state.subscribe("theme", (currentTheme) => {
      if (currentTheme === "dark") {
        window.document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        window.document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    });

    StateService.windowResizeEvent();
    window.addEventListener("resize", StateService.windowResizeEvent);
  }

  public static dispatch = StateService.state.dispatch;
  public static dispatchValue = StateService.state.dispatchValue;
  public static subscribe = StateService.state.subscribe;
}
