import $ from "jquery";
const profile = {
  index({ root }) {
    $("nav .menu_container a").removeClass("isActive");
    $("nav .menu_container #nav_option a:last-of-type").addClass("isActive");
    $(root).html("");
  },
};

export default profile;
