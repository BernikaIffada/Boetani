import $ from "jquery";
import Auth from "../../routes/middleware";
const registration = {
  index({ root }) {
    $("nav .menu_container a").removeClass("isActive");
    $("nav .menu_container #nav_option a:last-of-type").addClass("isActive");
    const html = `
      <div id="registration_page" tabindex="0">
        <div class="content">
          <h1 class="title_modal">Registrasi Akun Boetani</h1>
          <div class="input_group" tabindex="0">
            <label for="fullname_input">Nama lengkap</label>
            <input name="fullname" type="text" id="fullname_input" placeholder="Masukkan nama lengkap asli"/>
          </div>
          <div class="input_group" tabindex="0">
            <label for="email_input_registration">Email</label>
            <input name="email" type="email" id="email_input_registration" placeholder="Alamat email"/>
          </div>
          <div class="input_group" tabindex="0">
            <label for="password_input_registration">Password</label>
              <input name="password" type="password" id="password_input_registration" placeholder="Masukkan kata sandi baru"/>
              <button data-action="toggle_visibility_password">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.8748 17.4997C16.7927 17.4998 16.7114 17.4837 16.6356 17.4522C16.5598 17.4208 16.4909 17.3747 16.433 17.3165L2.68301 3.56647C2.57074 3.4483 2.50908 3.29096 2.51117 3.12799C2.51326 2.96501 2.57892 2.8093 2.69418 2.69404C2.80943 2.57879 2.96514 2.51312 3.12812 2.51104C3.29109 2.50895 3.44844 2.57061 3.5666 2.68287L17.3166 16.4329C17.4039 16.5203 17.4634 16.6316 17.4875 16.7528C17.5116 16.874 17.4992 16.9996 17.452 17.1138C17.4047 17.228 17.3246 17.3256 17.2219 17.3942C17.1192 17.4629 16.9984 17.4996 16.8748 17.4997Z" fill="#6B6B6B"/>
                  <path d="M9.98652 14.9997C8.36582 14.9997 6.80293 14.52 5.34121 13.5739C4.01035 12.7145 2.8123 11.4837 1.87636 10.0192V10.0161C2.65527 8.90006 3.5084 7.95631 4.4248 7.19538C4.43309 7.18844 4.43985 7.17987 4.44466 7.17019C4.44947 7.16051 4.45222 7.14995 4.45273 7.13915C4.45324 7.12836 4.45151 7.11758 4.44765 7.10749C4.44378 7.0974 4.43787 7.08822 4.43027 7.08053L3.65215 6.30358C3.63832 6.28964 3.61975 6.28141 3.60013 6.28054C3.58052 6.27968 3.56129 6.28623 3.54629 6.29889C2.57285 7.1192 1.66933 8.12545 0.847849 9.30358C0.706515 9.50643 0.628677 9.74672 0.624226 9.99392C0.619774 10.2411 0.688911 10.484 0.822849 10.6919C1.85449 12.3063 3.18222 13.6661 4.66191 14.6235C6.32793 15.7028 8.1209 16.2497 9.98652 16.2497C10.9935 16.2465 11.9934 16.0806 12.9475 15.7583C12.96 15.754 12.9713 15.7466 12.9803 15.7367C12.9892 15.7269 12.9954 15.7149 12.9985 15.702C13.0015 15.689 13.0011 15.6755 12.9975 15.6628C12.9938 15.65 12.9869 15.6384 12.9775 15.629L12.1346 14.786C12.1152 14.7671 12.0912 14.7535 12.0649 14.7467C12.0387 14.7398 12.0111 14.7399 11.985 14.7469C11.3321 14.915 10.6607 15 9.98652 14.9997Z" fill="#6B6B6B"/>
                  <path d="M19.1732 9.31998C18.1396 7.72155 16.7986 6.36373 15.2955 5.39303C13.6326 4.31803 11.7967 3.74967 9.98652 3.74967C8.99018 3.75144 8.00124 3.92086 7.06113 4.25084C7.0486 4.2552 7.0374 4.26268 7.02856 4.27257C7.01972 4.28245 7.01354 4.29443 7.01061 4.30736C7.00768 4.3203 7.00809 4.33377 7.01181 4.3465C7.01552 4.35923 7.02241 4.37081 7.03183 4.38014L7.87363 5.22194C7.89323 5.2412 7.91756 5.25496 7.94417 5.26181C7.97078 5.26867 7.99873 5.26839 8.02519 5.261C8.66463 5.08802 9.3241 5.00015 9.98652 4.99967C11.576 4.99967 13.1342 5.48522 14.6174 6.44498C15.9732 7.31998 17.1854 8.54967 18.1236 9.99967C18.1243 10.0006 18.1247 10.0017 18.1247 10.0028C18.1247 10.0039 18.1243 10.005 18.1236 10.0059C17.4425 11.0782 16.5974 12.0368 15.6189 12.8469C15.6106 12.8538 15.6037 12.8624 15.5988 12.8721C15.594 12.8818 15.5912 12.8924 15.5906 12.9033C15.5901 12.9141 15.5918 12.9249 15.5956 12.9351C15.5995 12.9452 15.6054 12.9545 15.6131 12.9622L16.3904 13.7391C16.4042 13.753 16.4226 13.7612 16.4422 13.7622C16.4617 13.7631 16.4809 13.7567 16.4959 13.7442C17.5404 12.8647 18.4446 11.8309 19.1771 10.6786C19.3066 10.4755 19.3751 10.2395 19.3744 9.99871C19.3737 9.75787 19.3039 9.5223 19.1732 9.31998Z" fill="#6B6B6B"/>
                  <path d="M9.9998 6.24967C9.71891 6.24952 9.4389 6.28097 9.16504 6.34342C9.15121 6.34629 9.13841 6.35286 9.12801 6.36243C9.11762 6.372 9.11001 6.3842 9.106 6.39775C9.102 6.4113 9.10174 6.42568 9.10525 6.43936C9.10877 6.45304 9.11593 6.46552 9.12597 6.47545L13.524 10.8723C13.534 10.8824 13.5464 10.8895 13.5601 10.893C13.5738 10.8966 13.5882 10.8963 13.6017 10.8923C13.6153 10.8883 13.6275 10.8807 13.637 10.8703C13.6466 10.8599 13.6532 10.8471 13.6561 10.8333C13.7813 10.2841 13.7811 9.71371 13.6557 9.16456C13.5303 8.6154 13.2827 8.10157 12.9314 7.66121C12.5802 7.22085 12.1342 6.86529 11.6267 6.62092C11.1192 6.37655 10.5631 6.24966 9.9998 6.24967Z" fill="#6B6B6B"/>
                  <path d="M6.47558 9.12702C6.46565 9.11697 6.45317 9.10981 6.43949 9.1063C6.42581 9.10278 6.41143 9.10304 6.39788 9.10705C6.38434 9.11105 6.37213 9.11866 6.36256 9.12906C6.35299 9.13945 6.34642 9.15225 6.34355 9.16608C6.20189 9.78496 6.21968 10.4297 6.39525 11.0398C6.57082 11.65 6.89843 12.2055 7.34736 12.6545C7.7963 13.1034 8.35187 13.431 8.962 13.6066C9.57213 13.7821 10.2169 13.7999 10.8357 13.6583C10.8496 13.6554 10.8624 13.6488 10.8728 13.6393C10.8832 13.6297 10.8908 13.6175 10.8948 13.6039C10.8988 13.5904 10.899 13.576 10.8955 13.5623C10.892 13.5486 10.8848 13.5362 10.8748 13.5262L6.47558 9.12702Z" fill="#6B6B6B"/>
                </svg>
              </button>
          </div>
          <div class="button_group" tabindex="0">
              <input type="submit" value="Daftar Sekarang"/> 
              <span>atau</span>
              <a href="/#/login">Sudah punya akun? Masuk</a>
          </div>
        </div>
      </div>
    `;
    $(root).html(html);

    // add listener
    $(".input_group button[data-action='toggle_visibility_password']").click(this.toggleVisibilityPassword);
    $("#registration_page input[type='submit']").click(this.sendRegistration);
  },

  async sendRegistration(ev) {
    let inputVal = {};
    const inputElem = $("#registration_page  .input_group > input");
    inputElem.each((index, elem) => {
      inputVal[elem.name] = elem.value;
      elem.value = "";
    });

    // todo registration
    const response = await Auth.registration(inputVal);
    if (response.error === "true") {
      alert(response.msg);
    } else {
      alert(response.msg);
      window.location = "/#/login";
    }
  },
  toggleVisibilityPassword() {
    const passwordField = $(this).parent().find("input");
    const type = passwordField.attr("type");
    let iconButton = "" || null;

    // toggling
    if (type === "text") {
      iconButton = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M16.8748 17.4997C16.7927 17.4998 16.7114 17.4837 16.6356 17.4522C16.5598 17.4208 16.4909 17.3747 16.433 17.3165L2.68301 3.56647C2.57074 3.4483 2.50908 3.29096 2.51117 3.12799C2.51326 2.96501 2.57892 2.8093 2.69418 2.69404C2.80943 2.57879 2.96514 2.51312 3.12812 2.51104C3.29109 2.50895 3.44844 2.57061 3.5666 2.68287L17.3166 16.4329C17.4039 16.5203 17.4634 16.6316 17.4875 16.7528C17.5116 16.874 17.4992 16.9996 17.452 17.1138C17.4047 17.228 17.3246 17.3256 17.2219 17.3942C17.1192 17.4629 16.9984 17.4996 16.8748 17.4997Z" fill="#6B6B6B"/>
        <path d="M9.98652 14.9997C8.36582 14.9997 6.80293 14.52 5.34121 13.5739C4.01035 12.7145 2.8123 11.4837 1.87636 10.0192V10.0161C2.65527 8.90006 3.5084 7.95631 4.4248 7.19538C4.43309 7.18844 4.43985 7.17987 4.44466 7.17019C4.44947 7.16051 4.45222 7.14995 4.45273 7.13915C4.45324 7.12836 4.45151 7.11758 4.44765 7.10749C4.44378 7.0974 4.43787 7.08822 4.43027 7.08053L3.65215 6.30358C3.63832 6.28964 3.61975 6.28141 3.60013 6.28054C3.58052 6.27968 3.56129 6.28623 3.54629 6.29889C2.57285 7.1192 1.66933 8.12545 0.847849 9.30358C0.706515 9.50643 0.628677 9.74672 0.624226 9.99392C0.619774 10.2411 0.688911 10.484 0.822849 10.6919C1.85449 12.3063 3.18222 13.6661 4.66191 14.6235C6.32793 15.7028 8.1209 16.2497 9.98652 16.2497C10.9935 16.2465 11.9934 16.0806 12.9475 15.7583C12.96 15.754 12.9713 15.7466 12.9803 15.7367C12.9892 15.7269 12.9954 15.7149 12.9985 15.702C13.0015 15.689 13.0011 15.6755 12.9975 15.6628C12.9938 15.65 12.9869 15.6384 12.9775 15.629L12.1346 14.786C12.1152 14.7671 12.0912 14.7535 12.0649 14.7467C12.0387 14.7398 12.0111 14.7399 11.985 14.7469C11.3321 14.915 10.6607 15 9.98652 14.9997Z" fill="#6B6B6B"/>
        <path d="M19.1732 9.31998C18.1396 7.72155 16.7986 6.36373 15.2955 5.39303C13.6326 4.31803 11.7967 3.74967 9.98652 3.74967C8.99018 3.75144 8.00124 3.92086 7.06113 4.25084C7.0486 4.2552 7.0374 4.26268 7.02856 4.27257C7.01972 4.28245 7.01354 4.29443 7.01061 4.30736C7.00768 4.3203 7.00809 4.33377 7.01181 4.3465C7.01552 4.35923 7.02241 4.37081 7.03183 4.38014L7.87363 5.22194C7.89323 5.2412 7.91756 5.25496 7.94417 5.26181C7.97078 5.26867 7.99873 5.26839 8.02519 5.261C8.66463 5.08802 9.3241 5.00015 9.98652 4.99967C11.576 4.99967 13.1342 5.48522 14.6174 6.44498C15.9732 7.31998 17.1854 8.54967 18.1236 9.99967C18.1243 10.0006 18.1247 10.0017 18.1247 10.0028C18.1247 10.0039 18.1243 10.005 18.1236 10.0059C17.4425 11.0782 16.5974 12.0368 15.6189 12.8469C15.6106 12.8538 15.6037 12.8624 15.5988 12.8721C15.594 12.8818 15.5912 12.8924 15.5906 12.9033C15.5901 12.9141 15.5918 12.9249 15.5956 12.9351C15.5995 12.9452 15.6054 12.9545 15.6131 12.9622L16.3904 13.7391C16.4042 13.753 16.4226 13.7612 16.4422 13.7622C16.4617 13.7631 16.4809 13.7567 16.4959 13.7442C17.5404 12.8647 18.4446 11.8309 19.1771 10.6786C19.3066 10.4755 19.3751 10.2395 19.3744 9.99871C19.3737 9.75787 19.3039 9.5223 19.1732 9.31998Z" fill="#6B6B6B"/>
        <path d="M9.9998 6.24967C9.71891 6.24952 9.4389 6.28097 9.16504 6.34342C9.15121 6.34629 9.13841 6.35286 9.12801 6.36243C9.11762 6.372 9.11001 6.3842 9.106 6.39775C9.102 6.4113 9.10174 6.42568 9.10525 6.43936C9.10877 6.45304 9.11593 6.46552 9.12597 6.47545L13.524 10.8723C13.534 10.8824 13.5464 10.8895 13.5601 10.893C13.5738 10.8966 13.5882 10.8963 13.6017 10.8923C13.6153 10.8883 13.6275 10.8807 13.637 10.8703C13.6466 10.8599 13.6532 10.8471 13.6561 10.8333C13.7813 10.2841 13.7811 9.71371 13.6557 9.16456C13.5303 8.6154 13.2827 8.10157 12.9314 7.66121C12.5802 7.22085 12.1342 6.86529 11.6267 6.62092C11.1192 6.37655 10.5631 6.24966 9.9998 6.24967Z" fill="#6B6B6B"/>
        <path d="M6.47558 9.12702C6.46565 9.11697 6.45317 9.10981 6.43949 9.1063C6.42581 9.10278 6.41143 9.10304 6.39788 9.10705C6.38434 9.11105 6.37213 9.11866 6.36256 9.12906C6.35299 9.13945 6.34642 9.15225 6.34355 9.16608C6.20189 9.78496 6.21968 10.4297 6.39525 11.0398C6.57082 11.65 6.89843 12.2055 7.34736 12.6545C7.7963 13.1034 8.35187 13.431 8.962 13.6066C9.57213 13.7821 10.2169 13.7999 10.8357 13.6583C10.8496 13.6554 10.8624 13.6488 10.8728 13.6393C10.8832 13.6297 10.8908 13.6175 10.8948 13.6039C10.8988 13.5904 10.899 13.576 10.8955 13.5623C10.892 13.5486 10.8848 13.5362 10.8748 13.5262L6.47558 9.12702Z" fill="#6B6B6B"/>
      </svg>`;

      passwordField.attr("type", "password");
    } else {
      iconButton = `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" viewBox="0 0 25 16" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.05902 7.12966C4.2361 2.57554 8.35553 0.1875 12.4825 0.1875C17.3294 0.1875 21.5046 3.3451 23.9679 7.14961L23.969 7.1514C24.132 7.40469 24.2187 7.69953 24.2187 8.00073C24.2187 8.30139 24.1323 8.5957 23.9699 8.84867C21.5087 12.7022 17.3605 15.8125 12.4825 15.8125C7.55246 15.8125 3.48424 12.7087 1.02912 8.86637C0.862297 8.60733 0.775772 8.30474 0.780454 7.99663C0.785147 7.68776 0.88129 7.3872 1.05673 7.13295L1.05902 7.12966ZM2.34278 8.02038L2.34494 8.02374C4.61258 11.5734 8.24708 14.25 12.4825 14.25C16.6704 14.25 20.3833 11.562 22.6536 8.00677L22.6551 8.00443C22.6558 8.00333 22.6562 8.00204 22.6562 8.00073C22.6562 8.00018 22.6561 7.99963 22.656 7.9991C22.6558 7.99844 22.6556 7.99778 22.6552 7.99719C20.3762 4.47828 16.633 1.75 12.4825 1.75C8.99897 1.75 5.31178 3.7662 2.34278 8.02038ZM12.4991 4.875C10.7732 4.875 9.37407 6.27411 9.37407 8C9.37407 9.72589 10.7732 11.125 12.4991 11.125C14.225 11.125 15.6241 9.72589 15.6241 8C15.6241 6.27411 14.225 4.875 12.4991 4.875ZM7.81157 8C7.81157 5.41117 9.91024 3.3125 12.4991 3.3125C15.0879 3.3125 17.1866 5.41117 17.1866 8C17.1866 10.5888 15.0879 12.6875 12.4991 12.6875C9.91024 12.6875 7.81157 10.5888 7.81157 8Z" fill="#6B6B6B"/>
      </svg>
      `;
      passwordField.attr("type", "text");
    }

    $(this).html(iconButton);
  },
};

export default registration;
