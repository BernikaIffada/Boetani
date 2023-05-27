import anime from "animejs";
import UrlParser from "../routes/url-parser.js";
import routing from "../routes/route.js";

export default class App {
  constructor({ header, main, footer }) {
    this.header = header;
    this.main = main;
    this.footer = footer;

    // drawer transition mobile
    $("nav > button").click(function () {
      $(this).toggleClass("isCollapse");
      const drawer = $("nav > button ~ div")[0];
      const drawerOptions = {
        targets: drawer,
        duration: 400,
        easing: "easeInOutQuad",
        scale: 1,
      };

      if (this.classList.contains("isCollapse")) {
        drawer.style.display = "flex";
        drawer.style.flexDirection = "column";
        anime({
          ...drawerOptions,
          rotateX: "0deg",
        });
      } else {
        anime({
          ...drawerOptions,
          rotateX: "90deg",
        });
        setTimeout(() => {
          drawer.style.display = "none";
        }, 410);
      }
    });
  }

  renderPage() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const page = routing(url.resource ? url.resource : "/");

    if (page) {
      page.index({ root: this.main, currentURL: url });
    } else {
      window.location = "/#/404";
    }
    sessionStorage.setItem("urlPrev", `${window.location}`);
  }
}
