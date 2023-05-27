import auth from "./middleware";
import landing from "../view/pages/landing";
import notFound from "../view/pages/notFound";
import modalLogin from "../view/modal/login";

function logout() {
  sessionStorage.removeItem("user");
  location = "/";
}

const route = {
  "/": landing,
  404: notFound,
  login: modalLogin,
};

function routing(url = 404) {
  const user = auth.index();

  if (user) {
    const con = $("header > nav  #nav_option");

    con.addClass("lg:w-[37%] xl:w-[32%] 2xl:w-[28%]");

    con.html("");
    con.html(`
    <a href="#/notification" class="font-['opensans-semibold'] relative no-underline text-[#575757] flex items-center font-['Open_Sans'] px-[15px] py-[8px] w-full border border-[#F6F6F6] md:w-fit md:border-0">Notifikasi</a>
    <a
      href="#/profile/${user.id}"
      class="font-['opensans-semibold'] relative rounded-b no-underline text-[#575757] flex items-center font-['Open_Sans'] px-[15px] py-[8px] w-full border border-[#F6F6F6] md:w-fit md:rounded-2xl md:border-[#AE4F18] md:bg-[#AE4F18] md:text-white lg:px-[35px] lg:py-0 "
      >Profil</a
    >
    `);
  }

  const page = route[url];

  if (url === "logout") {
    logout();
    return undefined;
  }

  return page;
}

export default routing;
