import UrlParser from "./url-parser";
import auth from "./middleware";
import landing from "../view/pages/landing";
import notFound from "../view/pages/notFound";
import modalLogin from "../view/modal/login";
import modalAlertLogin from "../view/modal/alert-login";
import registration from "../view/pages/registration";
import questions from "../view/pages/questions";
import posting from "../view/pages/posting";
import comment from "../view/pages/comment";
import detail from "../view/pages/detail";
import profile from "../view/pages/profile";
import notification from "../view/modal/notification";
import helper from "../helper";
import notificationSVG from "../../template/notification-svg.html";

import $ from "jquery";

function logout() {
  sessionStorage.removeItem("user");
  location = "/";
}

// regis route
const route = {
  "/": landing,
  404: notFound,
  questions: questions,
  detail: detail,
  needAuth: {
    // addposting: posting,
    profile: profile,
    notification: notification,
    comment: comment,
  },
  dontAuth: {
    registration: registration,
    login: modalLogin,
  },
};

function routing(url = 404) {
  const user = auth.index();

  if (user) {
    const ww = innerWidth;
    const con = $("header > nav  #nav_option");

    con.addClass("lg:w-[37%] xl:w-[32%] 2xl:w-[28%]");
    let notificationElement = `<a href="#/notification" class="font-['opensans-semibold'] relative no-underline text-[#575757] flex items-center px-[15px] py-[8px] w-full border border-[#F6F6F6] md:w-fit md:border-0">Notification</a>`;
    if (ww > 768) {
      con.addClass("has_login");
      notificationElement = `<a href="#/notification" class="notification_anchor">${notificationSVG}</a>`;
    }

    con.html("");
    con.html(`
      ${notificationElement}
    <a
      href="#/profile/${user.id}"
      class="font-['opensans-semibold'] relative rounded-b no-underline text-[#575757] flex items-center px-[15px] py-[8px] w-full border border-[#F6F6F6] md:w-fit md:rounded-2xl md:border-[#AE4F18] md:bg-[#AE4F18] md:text-white lg:px-[35px] lg:py-0 "
      >Profil</a
    >
    `);
  }

  if (url === "logout") {
    logout();
    return undefined;
  }

  const urlLandingIgnore = ["/", "modalalertlogin", "login"];
  if (!urlLandingIgnore.includes(url)) {
    $("body").removeClass("landing_session");
  }

  // remove collapse navbar if change page
  $("nav > button").removeClass("isCollapse");

  // routing url need auth
  if (route.needAuth.hasOwnProperty(url)) {
    if (user) {
      // return page
      return route.needAuth[url];
    } else {
      // back history url
      const prevUrl = sessionStorage.getItem("urlPrev");
      helper.modifyUrl("This page", prevUrl);
      // return modal alert login
      return modalAlertLogin;
    }
  }

  // routing url don't need auth!
  if (route.dontAuth.hasOwnProperty(url)) {
    if (user) {
      // back history url
      const prevUrl = sessionStorage.getItem("urlPrev");
      helper.modifyUrl("This page", prevUrl);

      // create new url
      const new_url = new URL(prevUrl);
      const new_url_parse = UrlParser.parseActiveUrlWithoutCombinerWithParams(new_url);
      // redirect page;
      const page = route[new_url_parse.resource] || route.needAuth[new_url_parse.resource];
      page.index({ root: document.getElementById("main"), currentURL: new_url_parse });
      return { redirect: page };
    } else {
      // return page
      return route.dontAuth[url];
    }
  }

  // return page doesn't need a authentication
  const page = route[url];
  return page;
}

export default routing;
