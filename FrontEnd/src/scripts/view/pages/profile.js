import $ from "jquery";
import logoutSVG from "../../../template/logout-svg.html";
import imgR from "../../../assets/img/dev/rasyad.png";
import avatar from "../../../assets/img/dump/avatar.png";
import editSVG from "../../../template/edit-svg.html";
import editProfilSVG from "../../../template/editProfil-svg.html";
import eyeCloseSVG from "../../../template/eyeClose-svg.html";
import eyeOpenSVG from "../../../template/eyeOpen-svg.html";
import lockSVG from "../../../template/lock-svg.html";

const profile = {
  index({ root, currentURL }) {
    $("nav .menu_container a").removeClass("isActive");
    $("nav .menu_container #nav_option a:last-of-type").addClass("isActive");
    const html = `
      <section id="profile_page">
        <form id="edit_profil_form">
          <div class="page_header mobile">
            <h1 class="title">Profil</h1>
            <a href="/#/logout">${logoutSVG}<span>Keluar Akun</span></a>
          </div>
          <div class="page_header desktop">
              <div class="placeholder">
                <label class="border" for="user_image">
                  <img src="${avatar}" alt="avatar.png"/>
                </label>
              </div>
              <div class="content" >
                <span class="user_name">Jhon Doe</span>
                <span class="email">johndoe@example.com</span>
                <a href="/#/logout">${logoutSVG}<span>Keluar Akun</span></a>
              </div>
          </div>
          <div class="main_nav">
            <button class="nav_item active" data-target="question_div_section">
              ${editSVG}
              <span>Pertanyaan</span>
            </button>
            <button class="nav_item" data-target="comment_div_section">
              ${editSVG}
              <span>Jawaban</span>
            </button>
            <button class="nav_item" data-target="edit_profil_div_section">
              ${editSVG}  
              <span>Sunting Profil</span>
            </button>
          </div>
          <div class="container_section">
          
            <!-- section pertanyaan -->
            <div class="active" id="question_div_section">
              <span class="title"><span>2</span><span>Kontribusi</span></span>
              <div class="content">
                <question-card data-id="8a9dfqj4f0wqh9jerqn" data-img="${imgR}" data-author="Jhon doe" data-date="19 Juli 2023" data-title="Lorem ipsum dolor sit amet consectetur adipisicing elit." data-summary="Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiaadjsdi ewuaowe dfsd tkldaiu werxfd werawet daweradf wtrgasdf afwdjubwef wqwesdaawf" data-countComment="3" data-categories="lahan kering, lahan basah, mangga, jeruk"></question-card>
                <question-card data-id="8a9dfqj4f0wqh9jerqn" data-img="" data-author="Jhon doe" data-date="19 Juli 2023" data-title="Lorem ipsum dolor sit amet consectetur adipisicing elit." data-summary="Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiaadjsdi ewuaowe dfsd tkldaiu werxfd werawet daweradf wtrgasdf afwdjubwef wqwesdaawf" data-countComment="3" data-categories="lahan kering, lahan basah, mangga, jeruk"></question-card>
              </div>
            </div>

            <!-- section jawaban -->
            <div id="comment_div_section">
              <span class="title"><span>2</span><span>Kontribusi</span></span>
              <div class="content">
              </div>
            </div>

            <!-- section edit profil -->
            <div id="edit_profil_div_section">
              <div class="name_email">
                <span class="title">${editProfilSVG}<span>Profil</span></span>
                <div class="image_mobile">
                  <div class="placeholder">
                    <label class="border" for="user_image">
                      <img src="${avatar}" alt="avatar.png"/>
                    </label>
                    <input type="file" id="user_image" name="user_image" hidden/>
                  </div>
                </div>
                <div class="content">
                  <div class="input_grup">
                    <label for="user_name_input">Nama Anda</label>
                    <input id="user_name_input" type="text" name="user_name" value="Jhon Doe"/>
                  </div>
                  <div class="input_grup">
                    <label for="user_email_input">Alamat Email</label>
                    <input id="user_email_input" type="text" name="user_email" value="johndoe@example.com"/>
                  </div>
                </div>
              </div>

              <div class="password">
                <span class="title">${lockSVG}<span>Ubah Password</span></span>
                <div class="content">
                  <div class="input_grup">
                    <label for="user_current_password_input">Password Lama</label>
                    <input id="user_current_password_input" type="password" name="user_current_password" value="*******"/>
                    <button class="type_change" data-target="user_current_password_input">
                      ${eyeCloseSVG}
                    </button>
                  </div>

                  <div class="input_grup">
                    <label for="user_new_password_input">Password Baru</label>
                    <input id="user_new_password_input" type="password" name="user_new_password" value="*******"/>
                    <button class="type_change" data-target="user_new_password_input">
                      ${eyeCloseSVG}
                    </button>
                  </div>
                </div>
              </div>
              <button class="disable" id="send">Update</button>
            </div>
          </div>
        </form>
      </section>
    `;
    $(root).html(html);
    this.afterRender();
  },

  afterRender() {
    const mainNavButtons = $("#profile_page .main_nav > button");
    const toggleVisibleButtons = $("#profile_page .input_grup button");

    // preventDefault
    $("#edit_profil_form button").click((ev) => {
      ev.preventDefault();
    });

    // handler
    mainNavButtons.click(this.mainNavHandler);
    toggleVisibleButtons.click(this.toggleVisibility);
  },

  mainNavHandler() {
    const target = $(`#profile_page .container_section > #${this.dataset.target}`);
    // remove all state active
    $("#profile_page .main_nav > button").removeClass("active");
    $("#profile_page .container_section > div").removeClass("active");

    // add target state active
    $(this).addClass("active");
    $(target).addClass("active");
  },

  toggleType(el, triggerer, type) {
    if (type === "password") {
      el.attr("type", type);
      triggerer.html(eyeCloseSVG);
    } else if (type === "text") {
      el.attr("type", type);
      triggerer.html(eyeOpenSVG);
    }
  },

  toggleVisibility() {
    const target = $(`#profile_page .password .input_grup > #${this.dataset.target}`);
    const inputNonTarget = $(`#profile_page .password .input_grup input`).not(`#${this.dataset.target}`);
    const buttonNonTarget = $(`#profile_page .password .input_grup button`).not(`[data-target="${this.dataset.target}"]`);
    // reset state non target
    profile.toggleType(inputNonTarget, buttonNonTarget, "password");

    // set state
    let state = "password";
    if (target.attr("type") === "password") {
      state = "text";
    } else {
      state = "password";
    }

    profile.toggleType(target, $(this), state);
  },
};

export default profile;
