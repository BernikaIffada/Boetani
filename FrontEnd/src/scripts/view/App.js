import anime from "animejs";
import UrlParser from "../routes/url-parser.js";
import routing from "../routes/route.js";
import $ from "jquery";
import helper from "../helper.js";

export default class App {
  constructor({ header, main, footer }) {
    this.header = header;
    this.main = main;
    this.footer = footer;

    function menuHandler(elem) {
      const drawer = $("nav > button ~ div")[0];
      const drawerOptions = {
        targets: drawer,
        duration: 400,
        easing: "easeInOutQuad",
        scale: 1,
      };

      if (elem.classList.contains("isCollapse")) {
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
    }

    // drawer transition mobile
    $("nav > button").click(function () {
      $(this).toggleClass("isCollapse");
    });

    // listen class
    helper.addClassNameListener($("nav>button")[0], menuHandler);

    // skip link listener
    $("#tocontent").click((ev) => {
      ev.preventDefault();
      // console.log($("#main").children("*[tabindex='0']"));
      $("#main").focus();
    });

    $(window).scroll(() => {
      if ($(window).scrollTop() >= 60) {
        $("header").addClass("scrolled");
      } else {
        $("header").removeClass("scrolled");
      }
    });

    // skip link listener
    $("#tocontent").click((ev) => {
      ev.preventDefault();
      // console.log($("#main").children("*[tabindex='0']"));
      $("#main").focus();
    });

    $(window).scroll(() => {
      if ($(window).scrollTop() >= 60) {
        $("header").addClass("scrolled");
      } else {
        $("header").removeClass("scrolled");
      }
    });
  }

  renderPage() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const page = routing(url.resource ? url.resource : "/");

    if (page) {
      if (page.hasOwnProperty("index")) {
        page.index({ root: this.main, currentURL: url });
      }
    } else {
      window.location = "/#/404";
    }
    sessionStorage.setItem("urlPrev", `${window.location}`);
  }
}
