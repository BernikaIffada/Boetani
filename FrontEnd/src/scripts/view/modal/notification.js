import $ from "jquery";
import commentSVG from "../../../template/comment-svg.html";
import crossSVG from "../../../template/cross-svg.html";
import helper from "../../helper";

const notification = {
  index({ root }) {
    const ww = $(window).width();
    this.container_section = `
        <div class="container_section">
          <div class="before_read">
            <span>${commentSVG}<span>Balasan Belum Dibaca</span></span>
            <div class="content">
              <notification-card href="#" data-title="ini title" data-notification="ini summary"></notification-card>
            </div>
          </div>
          <div class="after_read">
            <span>${commentSVG}<span>Balasan Sudah Dibaca</span></span>
            <div class="content">
              <notification-card href="#" class="after_read" data-title="ini title" data-notification="ini summary"></notification-card>
              <notification-card href="#" class="after_read" data-title="ini title" data-notification="ini summary"></notification-card>
            </div>
          </div>
        </div>
    `;

    if (ww < 768) {
      this.showPage(root);
    } else {
      this.showModal();
    }

    $("#notification_modal button.cancel_btn").click(() => {
      $("#notification_modal").remove();
    });
  },

  showModal() {
    $("body").addClass("landing_session");
    const html = `
        <section id="notification_modal">
          <div class="title_section">
            <button class="cancel_btn">${crossSVG}</button>
            <span>Notifikasi</span>
          </div>
          ${this.container_section}
        </section>
    `;

    if (!$("#header > nav > #notification_modal").get(0)) {
      $("#header > nav").append(html);
    }

    // back history url
    const prevUrl = sessionStorage.getItem("urlPrev");
    helper.modifyUrl("This page", prevUrl);
    return null;
  },
  showPage(root) {
    $("nav .menu_container a").removeClass("isActive");
    $("nav .menu_container #nav_option a:first-of-type").addClass("isActive");
    const html = `
      <section id="notification_page">
        <h1 class="title_section">Notifikasi</h1>
        ${this.container_section}
      </section>
    `;
    $(root).html(html);
    return null;
  },
};

export default notification;
