import $ from "jquery";
import plusSVG from "../../../template/plus-svg.html";
import searchSVG from "../../../template/search-svg.html";
import APIHELPER from "../../data/api-helper";
const question = {
  async pre() {
    this.dataQuestions = await APIHELPER.getAllQuestions();
  },
  async index({ root }) {
    $("nav .menu_container a").removeClass("isActive");
    $("nav .menu_container .nav_fix a:last-of-type").addClass("isActive");

    // preload
    await this.pre();

    // viewing data
    let dataView = [];
    if (this.dataQuestions.error === "false") {
      dataView = this.dataQuestions.pertanyaan.map((q) => {
        const element = document.createElement("question-card");
        element.dataset.id = q.id_pertanyaan;
        element.dataset.author = q.user_name;
        element.dataset.date = q.created_at;
        element.dataset.title = q.judul;
        element.dataset.summary = q.isi;
        element.dataset.countComment = q.jawaban;
        element.dataset.categories = q.kategori?.join(", ");

        let img;
        if (q.image.includes("[")) {
          img = JSON.parse(q.image);

          img = img.length === 0 ? null : img;
        }
        element.dataset.img = img === null ? "false" : APIHELPER.getImagePath(img);
        return element;
      });
    }

    // const container = document.createElement("div");
    // $(container).addClass("content");
    // $(container).html(dataView);

    console.log(dataView);
    const ww = window.innerWidth;
    const html = `
        <section id="postingan_page">
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
         
            <div class="container_postingan">
                <div class="title_container">
                    <span>Pertanyaan</span>
                </div>
                <div class="content">
                </div>
            </div>
        </section>
    `;
    $(root).html(html);

    // append view
    dataView.forEach((element) => {
      $("#postingan_page > .container_postingan > .content").append(element);
    });

    if ($(window).width() >= 768) {
      $("#postingan_page > .title").remove();
    }
  },
};

export default question;
