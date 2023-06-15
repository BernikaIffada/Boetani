import $ from "jquery";
import logoutSVG from "../../../template/logout-svg.html";
import avatar from "../../../assets/img/dump/avatar.png";
import editSVG from "../../../template/edit-svg.html";
import editProfilSVG from "../../../template/editProfil-svg.html";
import eyeCloseSVG from "../../../template/eyeClose-svg.html";
import eyeOpenSVG from "../../../template/eyeOpen-svg.html";
import lockSVG from "../../../template/lock-svg.html";

import Auth from "../../routes/middleware";
import APIHELPER from "../../data/api-helper";

const profile = {
  async pre() {
    const active = Auth.index();
    const questionsUser = await APIHELPER.getQuestionByUser(active.id);
    const dataUser = await APIHELPER.getUser(active.id);

    this.dataLoad = {
      user: dataUser.user,
      qUser: questionsUser.error === "true" ? null : questionsUser.pertanyaan,
    };
  },
  async index({ root, currentURL }) {
    $("nav .menu_container a").removeClass("isActive");
    $("nav .menu_container #nav_option a:last-of-type").addClass("isActive");
    // preload
    await this.pre();
    const elQuestions = this.dataLoad.qUser?.map((q) => {
      const elm = document.createElement("question-card");
      elm.dataset.id = q.id_pertanyaan;
      elm.dataset.img = q.img ? APIHELPER.getImagePath(q.img[0]) : false;
      elm.dataset.author = this.dataLoad.user.name;
      elm.dataset.date = q.created_at;
      elm.dataset.title = q.judul;
      elm.dataset.title = q.judul;
      elm.dataset.summary = q.isi;
      elm.dataset.countComment = 0;
      elm.dataset.categories = "";

      return elm;
    });

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
                  <img src="${APIHELPER.getImagePath(this.dataLoad.user.image) || avatar}" alt="avatar.png"/>
                </label>
              </div>
              <div class="content" >
                <span class="user_name">${this.dataLoad.user.name}</span>
                <span class="email">${this.dataLoad.user.email}</span>
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
              <span class="title"><span>${this.dataLoad.qUser?.length || 0}</span><span>Kontribusi</span></span>
              <div class="content">
              </div>
            </div>

            <!-- section jawaban -->
            <div id="comment_div_section">
              <span class="title"><span>0</span><span>Kontribusi</span></span>
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
                      <img src="${APIHELPER.getImagePath(this.dataLoad.user.image) || avatar}" alt="avatar.png"/>
                    </label>
                    <input type="file" id="user_image" name="user_image" value="${APIHELPER.getImagePath(this.dataLoad.user.image) || null}" hidden/>
                  </div>
                </div>
                <div class="content">
                  <div class="input_grup">
                    <label for="user_name_input">Nama Anda</label>
                    <input id="user_name_input" type="text" name="user_name" value="${this.dataLoad.user.name}"/>
                  </div>
                  <div class="input_grup disabled">
                    <label for="user_email_input">Alamat Email</label>
                    <input id="user_email_input" type="text" name="user_email" value="${this.dataLoad.user.email}"/>
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
              <button class="disabled" id="send">Update</button>
            </div>
          </div>
        </form>
      </section>
    `;
    $(root).html(html);
    this.afterRender();

    // append
    $("#question_div_section>.content").append(elQuestions);

    // handler
    $("#user_image").change(this.addFotoHandler);
    $("#send").click(this.send);
  },

  async send(ev) {
    const { user } = profile.dataLoad;
    ev.preventDefault();
    if (!user.id) {
      return true;
    }

    // collecting input
    const updateOBJ = {
      image: profile.fileArr.length ? profile.fileArr[0] : [],
      name: $("#user_name_input").val(),
      email: $("#user_email_input").val(),
      id: user.id,
    };

    // do send
    const response = await APIHELPER.editProfile(updateOBJ);
    alert(response.msg);
    window.location = `/#/profile/${user.id}`;
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

  addFotoHandler() {
    profile.fileArr = [...this.files];
    let validateFile;

    // validating and push file
    profile.fileArr.forEach((file) => {
      if (file?.type?.includes("image")) {
        validateFile = file;
      } else {
        alert("Must image format (jpg/jpeg/png)");
        validateFile = false;
      }
    });

    if (!validateFile) {
      return 0;
    }

    // review file
    $("label[for='user_image'] > img").attr("src", URL.createObjectURL(validateFile));
  },
};

export default profile;
