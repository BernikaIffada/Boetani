import "regenerator-runtime";
import $ from "jquery";
import "../styles/style.scss";
import App from "./view/App.js";

$(document).ready(() => {
  // init app
  const app = new App({
    // init shell
    header: document.getElementById("header"),
    main: document.getElementById("main"),
    footer: document.getElementById("footer"),
  });

  //   if window hashchange or loaded
  window.addEventListener("hashchange", () => {
    app.renderPage();
  });
  window.addEventListener("load", () => {
    app.renderPage();
  });

  // sessionStorage.setItem("user", JSON.stringify({ id: "rasyad" }));
});
