import "regenerator-runtime";
import $ from "jquery";
// import "../styles/posting-view.scss"; 
import "../styles/style.scss";
import App from "./view/App.js";
import Auth from "../scripts/routes/middleware";

// registry custom element
import "./view/components/dev-member-card";
import "./view/components/question-card";
import "./view/components/notification-card";
import "./view/components/comment";

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

  setInterval(() => {
    const user = Auth.index();
    if (user) {
      if (Date.now() >= user.expired) {
        localStorage.removeItem("user");
        setTimeout(() => {
          window.location = "/";
        }, 500);
      }
    }
  }, 2000);
});
