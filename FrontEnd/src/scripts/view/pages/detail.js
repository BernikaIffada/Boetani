import plusSVG from "../../../template/plus-svg.html";
import searchSVG from "../../../template/search-svg.html";
import commentSVG from "../../../template/comment-svg.html";
import addFotoSVG from "../../../template/addFoto-svg.html";
import imgDump from "../../../assets/img/dump/img1.png";
import $ from "jquery";
import APIHELPER from "../../data/api-helper";
import Auth from "../../routes/middleware";
import helper from "../../helper";
import modalAlertLogin from "../modal/alert-login";

const detail = {
  fotoFiles: [],
  async pre(url) {
    $("nav .menu_container a").removeClass("isActive");
    $("nav .menu_container .nav_fix a:last-of-type").addClass("isActive");
    const questionResponse = await APIHELPER.getDetailQuestion(url.id);
    let question = [];
    if (questionResponse.error === "false") {
      question = questionResponse.pertanyaan;
    }

    // user jangan lupa ganti name
    this.dataPreLoad = {
      user: Auth.index(),
      question: question,
      url: url,
    };
  },

  async index({ root, currentURL }) {
    // initialize
    const ww = $(window).width();

    // preloading
    await this.pre(currentURL);

    const { user, question } = this.dataPreLoad;

    const detailView =
      ww >= 768
        ? `
        <span class="title">${question.judul}</span>
        <div class="author_date">
            <span class="description">${question.isi}</span>
            <div>
                <span class="author">${question.user_name}</span>
                <span class="date">${question.created_at}</span>
            </div>
        </div>
        <picture>
            <img src="${imgDump}" alt="dump" >
        </picture>
        `
        : `
            <div class="author_date">
                <span class="author">${question.user_name}</span>
                <span class="date">${question.created_at}</span>
            </div>
            <span class="title">${question.judul}</span>
            <span class="description">${question.isi}</span>
            <picture>
                <img src="${imgDump}" alt="dump" >
            </picture>
        `;

    // converting diskusi
    let elDisscuss = question.jawabans.map((jawaban) => {
      //<comment-card selectability="false" data-downvote="2" data-id="2" data-target="2" data-author="Jhon Doe" data-created_at="20 Jun 2023" data-comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem..."></comment-card>
      let balasan = jawaban.balasans.map((balasan) => {
        const balasanElement = document.createElement("comment-card");
        balasanElement.selected = "false";
        balasanElement.selectability = "false";
        balasanElement.dataset.downvote = 0;
        balasanElement.dataset.upvote = 0;
        balasanElement.dataset.author = balasan.user_name;
        balasanElement.dataset.created_at = balasan.created_at;
        balasanElement.dataset.comment = balasan.isi;
        balasanElement.dataset.id = balasan.id_balasan;

        return balasanElement;
      });

      const jawabanELement = document.createElement("comment-card");
      jawabanELement.selected = "false";
      jawabanELement.selectability = user ? "true" : "false";
      jawabanELement.dataset.downvote = 0;
      jawabanELement.dataset.upvote = 0;
      jawabanELement.dataset.author = jawaban.user_name;
      jawabanELement.dataset.created_at = jawaban.created_at;
      jawabanELement.dataset.comment = jawaban.isi;
      jawabanELement.dataset.id = jawaban.id_jawaban;

      $(jawabanELement).html(balasan);

      return jawabanELement;
    });

    // viewing
    const html = `
        <section id="detail_page">
            <h1 class="title">Postingan</h1>
            <form action="/#/search" class="nav_page">
                <div class="search_group" tabindex="0">
                    <input name="q" class="search_input" placeholder="${ww >= 768 ? "Cari kata kunci pertanyaan..." : "Masukan kata kunci..."}" autocomplete="off"/>
                    <button type="submit">${searchSVG}</button>
                </div>
                <div>
                    <a href="/#/addposting">
                        ${plusSVG}
                        <span>Tambahkan Pertanyaan</span>
                    </a>
                    <button type="submit">${searchSVG}</button>
                </div>
            </form>

            <div class="container_detail">
                <div class="title_container">
                    <span>Pertanyaan</span>
                </div>
                <div class="content">
                    <div class="detail">
                        ${detailView}
                    </div>
                    <div class="category">
                        <span>Lahan Basah</span>
                    </div>
                </div>
            </div>

            <div class="container_comment">
                <div class="title_container">
                    <span>${commentSVG} Tambahkan Jawaban</span>
                </div>
                <div class="content">
                    <span class="user">${user?.name || ""}</span>
                    <form id="addcomment" >
                        <div class="input_group">
                            <div class="input_item">
                                <label for="foto_input">${addFotoSVG}</label>
                                <input type="file" name="foto[]" id="foto_input" hidden multiple/>
                            </div>
                            <div class="input_item">
                                <div id="review_image">
                                </div>
                                <textarea name="comment_input" id="comment_input" required></textarea>
                                <label for="comment_input">Ketik jawaban anda...</label>
                            </div>
                        </div>
                        <input type="submit" value="Kirim"/>
                    </form>
                </div>
            </div>

            <div class="container_dicussion">
                <div class="title_container">
                    <span>${commentSVG} Diskusi</span>
                </div>
                <div class="content">
                    <comment-card selected="false" data-upvote="2" selectability="true" data-id="1" data-target="2" data-author="Jhon Doe" data-created_at="20 Jun 2023" data-comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem...">
                        <comment-card selectability="false" data-downvote="2" data-id="3" data-target="2" data-author="Jhon Doe" data-created_at="20 Jun 2023" data-comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem..."></comment-card>
                    </comment-card>
                </div>
            </div>
        </section>
    `;
    $(root).html(html);
    if ($(window).width() >= 768) {
      $("#detail_page > .title").remove();
    }

    // append jawaban

    $("#detail_page > .container_dicussion > .content").html(elDisscuss);

    $("#foto_input").change(this.addFotoHandler);
    $("form#addcomment input[type='submit']").click(this.addComment);
  },

  addFotoHandler() {
    const files = Array.from(this.files);

    // validating and push file
    files.forEach((file) => {
      if (file?.type.includes("image")) {
        detail.fotoFiles.push(file);
        console.log(detail.fotoFiles);
      } else {
        alert("Must image format (jpg/jpeg/png)");
      }
    });

    // review file
    if (detail.fotoFiles.length >= 1) {
      const review = $("#addcomment .input_item > #review_image");

      const elImageHolder = detail.fotoFiles.map((file) => {
        const div = document.createElement("div");
        $(div).addClass("image_holder");
        $(div).html(`
            <img src="${URL.createObjectURL(file)}"/>
        `);

        return div;
      });

      const container = document.createElement("div");
      $(container).addClass("container");
      $(container).html(elImageHolder);

      //   store
      $(review).html(container);

      $(".input_item label[for='comment_input']").addClass("review_image_active");
    } else {
      $(".input_item label[for='comment_input']").removeClass("review_image_active");
    }
  },

  //   kerjakan!
  addComment(ev) {
    const { user, question } = detail.dataPreLoad;
    ev.preventDefault();
    if (!user) {
      const prevUrl = sessionStorage.getItem("urlPrev");
      helper.modifyUrl("This page", prevUrl);
      // return modal alert login
      modalAlertLogin.index({ root: document.getElementById("main") });
      return 0;
    }

    // collecting input
    const newComment = {
      idPertanyaan: question.id_pertanyaan,
      idUser: user.id,
      files: detail.fotoFiles,
      comment: $("#addcomment  .input_item>#comment_input").val(),
    };

    // do send comment
  },
};

export default detail;
