import $ from "jquery";
import commentSVG from "../../../template/comment-svg.html";
import helper from "../../helper";
class questioncard extends HTMLElement {
  connectedCallback() {
    this.questionId = this.getAttribute("data-id");
    this.img = this.getAttribute("data-img") || "false";
    this.author = this.getAttribute("data-author");
    this.title = this.getAttribute("data-title");
    this.countComment = this.getAttribute("data-count-comment");
    this.summaryRaw = this.getAttribute("data-summary");
    this.date = this.getAttribute("data-date");
    const categoriesRaw = this.getAttribute("data-categories");
    this.categories = categoriesRaw.split(", ").map((val) => `<span class="category">${helper.capitalizeWordOfSentence(val)}</span>`);
    this.render();
  }
  render() {
    const ww = window.innerWidth;
    let img = this.img === "false" ? `<span class="img_holder"></span>` : `<img src="${this.img}"/>`;
    if (ww < 640) {
      img = this.img === "false" ? "<br/>" : `<img src="${this.img}"/>`;
    }
    let summary = null;

    if (this.summaryRaw) {
      if (ww > 768 && ww < 1024) {
        summary = this.summaryRaw.length > 150 ? `${this.summaryRaw.substring(0, 150)}...` : this.summaryRaw;
      } else {
        summary = this.summaryRaw.length > 204 ? `${this.summaryRaw.substring(0, 204)}...` : this.summaryRaw;
      }
    } else {
      summary = "";
    }

    const html = `
        <a href="/#/detail/${this.questionId}">
            <div class="author_date">
                <span class="author">${this.author}</span>
                <span class="date">${this.date}</span>
            </div>
            <span class="title">${this.title}</span>
            <span class="summary">${summary}</span>
            ${img}
            <div class="comment">
                ${commentSVG}
                <span>${this.countComment} Jawaban</span>
            </div>
            <div class="categories">${this.categories.join("")}</div>
        </a>
    `;

    $(this).html(html);
  }
}

customElements.define("question-card", questioncard);
