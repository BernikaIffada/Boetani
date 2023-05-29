import $ from "jquery";
import helper from "../../helper";

const alertlogin = {
  index({ root }) {
    $("body").addClass("modal_open");
    $(".modal").remove();
    const html = `
        <div id="modal_alert_login" class="modal">
            <div class="content">
                <h1 class="title">
                    <span>Oops!</span>
                    <span>Anda Belum Login</span>
                </h1>
                <div class="overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" class="locker" width="284" height="224" viewBox="0 0 284 224" fill="none">
                        <path d="M246.667 126.933V112C246.667 108.039 245.093 104.241 242.293 101.441C239.492 98.64 235.694 97.0667 231.733 97.0667H82.4001C78.4396 97.0667 74.6412 98.64 71.8407 101.441C69.0401 104.241 67.4668 108.039 67.4668 112V201.6C67.4668 205.561 69.0401 209.359 71.8407 212.159C74.6412 214.96 78.4396 216.533 82.4001 216.533H231.733C235.694 216.533 239.492 214.96 242.293 212.159C245.093 209.359 246.667 205.561 246.667 201.6V186.667M246.667 126.933H186.933C179.012 126.933 171.416 130.08 165.815 135.681C160.213 141.282 157.067 148.879 157.067 156.8C157.067 164.721 160.213 172.318 165.815 177.919C171.416 183.52 179.012 186.667 186.933 186.667H246.667M246.667 126.933C254.588 126.933 262.185 130.08 267.786 135.681C273.387 141.282 276.533 148.879 276.533 156.8C276.533 164.721 273.387 172.318 267.786 177.919C262.185 183.52 254.588 186.667 246.667 186.667M112.267 97.0667V52.2667C112.267 40.385 116.987 28.9899 125.388 20.5883C133.79 12.1867 145.185 7.46667 157.067 7.46667C168.949 7.46667 180.344 12.1867 188.745 20.5883C197.147 28.9899 201.867 40.385 201.867 52.2667V97.0667M239.2 156.8H254.133M209.333 156.8H224.267M179.467 156.8H194.4" stroke="black" stroke-width="8"/>
                        <circle cx="47" cy="103" r="47" fill="#FF0000"/>
                        <path d="M69.6895 128H57.5898L45.9688 109.099L34.3477 128H23L39.5771 102.229L24.0596 78.0293H35.749L46.5156 96.0078L57.0771 78.0293H68.4932L52.8047 102.81L69.6895 128Z" fill="white"/>
                    </svg>
                </div>
                <div class="button_group" tabindex="0">
                    <a href="/#/login">Sudah punya akun? Masuk</a>
                    <span>atau</span>
                    <a href="/#/registration">Belum punya akun? Daftar</a>
                </div>
            </div>
        </div>
    `;

    $(root).append(html);
    // add listener
    $("#modal_alert_login").click(this.hiddenModal);

    // back history url
    const prevUrl = sessionStorage.getItem("urlPrev");
    helper.modifyUrl("This page", prevUrl);
  },

  hiddenModal(event) {
    if (event.target === event.currentTarget) {
      $("body").removeClass("modal_open");
      $(this).remove();
    }
  },
};

export default alertlogin;
