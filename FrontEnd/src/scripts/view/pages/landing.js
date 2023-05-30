import $ from "jquery";
import html from "../../../template/landing.html";

// splide library
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";

const landing = {
  index({ root }) {
    $("body").addClass("landing_session");
    $(root).html(html);

    this.splideInit();

    // build splide if mobile and destroy if desktop
    window.addEventListener("resize", (ev) => {
      ev.preventDefault();
      this.splideInit();
    });
  },

  splideInit() {
    const windowWidth = window.innerWidth;
    const splide = document.getElementById("anggota_splide");
    if (splide) {
      const anggota = new Splide(splide, {
        arrows: false,
        type: "loop",
        focus: "center",
        autoWidth: true,
        lazyLoad: "nearby",
        gap: "3rem",
        updateOnMove: "true",
        dragMinThreshold: {
          mouse: 0,
          touch: 100,
        },
        pagination: false,
        mediaQuery: "min",
        breakpoints: {
          768: {
            destroy: "completely",
          },
        },
      });

      anggota.mount();
      if (windowWidth >= 768) {
        anggota.destroy();
      }
    }
  },
};

export default landing;
