import $ from "jquery";
import commentSVG from "../../../template/comment-svg.html";
import upvoteSVG from "../../../template/upvote-svg.html";
import downvoteSVG from "../../../template/downvote-svg.html";
import addFotoSVG from "../../../template/addFoto-svg.html";
import Auth from "../../routes/middleware";
import helper from "../../helper";
import modalAlertLogin from "../modal/alert-login";

class Comment extends HTMLElement {
  connectedCallback() {
    this.targetId = this.getAttribute("data-target");
    this.idComment = this.getAttribute("data-id");
    this.comment = this.getAttribute("data-comment") || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur necessitatibus nam nemo?";
    this.author = this.getAttribute("data-author") || "anonym";
    this.upvote = this.getAttribute("data-upvote") || "0";
    this.downvote = this.getAttribute("data-downvote") || "0";
    this.createdAt = this.getAttribute("data-created_at");
    this.selectability = (this.getAttribute("data-selectability") || "false") === "true";
    this.selected = this.selectability === "true" ? this.getAttribute("data-selected") || "false" : "false";
    this.elementType = this.getAttribute("data-element-type");
    this.render();
  }

  #createSelectButton() {
    if (this.selectability) {
      if (this.selected === "true") {
        return `
          <button id="select_btn" class="selected">Jawaban Terpilih</button>
        `;
      } else {
        return `
          <button id="select_btn" class="select">Tandai Sebagai Jawaban Terpilih</button>
        `;
      }
    }
    return "";
  }

  #isCommentability() {
    const parent = $(this).parents();
    let count = 0;
    parent.each((index) => {
      if (parent[index].tagName.toLowerCase() === "comment-card") {
        count++;
      }
    });

    if (count <= 1) {
      return true;
    } else {
      return false;
    }
  }

  commentFormTrigger(ev) {
    ev.preventDefault();
    const user = Auth.index();

    if (!user) {
      const prevUrl = sessionStorage.getItem("urlPrev");
      helper.modifyUrl("This page", prevUrl);
      // return modal alert login
      modalAlertLogin.index({ root: document.getElementById("main") });
      return 0;
    }

    const form_comment = `
    <div class="form_comment collapsing">
      <span class="user">${user.name || ""}</span>
      <form id="addcomment">
        <input type="text" name="id_comment" id="id_comment" value="${this.idComment}" hidden/>
        <div class="input_group">
            <div class="input_item">
                <label for="fo_input">${addFotoSVG}</label>
                <input type="file" name="foto[]" id="fo_input" hidden multiple/>
            </div>
            <div class="input_item">
                <div id="review_image"></div>
                <textarea name="comment_input" id="com_input" required></textarea>
                <label for="com_input">Ketik jawaban anda...</label>
            </div>
        </div>
        <input type="submit" value="Kirim"/>
      </form>         
    </div>`;

    // checking
    const commentFromDOM = $(`comment-card[data-id="${this.idComment}"] > .form_comment`).length;

    if (commentFromDOM === 0) {
      if ($(`comment-card .form_comment`).length === 0) {
        // collapse
        $(form_comment).insertBefore($(`comment-card[data-id="${this.idComment}"] > .child`));

        setTimeout(() => {
          $(`comment-card[data-id="${this.idComment}"] > .form_comment`).removeClass("collapsing");
          $(`comment-card[data-id="${this.idComment}"] > .form_comment`).addClass("collapse");
        }, 50);
      } else {
        // hidding
        $(`comment-card:not([data-id="${this.idComment}"]) > .form_comment`).removeClass("collapse");
        $(`comment-card:not([data-id="${this.idComment}"]) >.form_comment`).addClass("collapsing");

        setTimeout(() => {
          $(`comment-card:not([data-id="${this.idComment}"]) > .form_comment`).remove();
        }, 310);

        // collapse
        setTimeout(() => {
          $(form_comment).insertBefore($(`comment-card[data-id="${this.idComment}"] > .child`));
        }, 50);

        setTimeout(() => {
          $(`comment-card[data-id="${this.idComment}"] > .form_comment`).removeClass("collapsing");
          $(`comment-card[data-id="${this.idComment}"] > .form_comment`).addClass("collapse");
        }, 150);
      }
    } else {
      $(`comment-card[data-id="${this.idComment}"] > .form_comment`).removeClass("collapse");
      $(`comment-card[data-id="${this.idComment}"] > .form_comment`).addClass("collapsing");

      setTimeout(() => {
        $(`comment-card[data-id="${this.idComment}"] > .form_comment`).remove();
      }, 310);
    }

    this.#afterRender();
  }

  render() {
    // binding
    this.commentFormTrigger = this.commentFormTrigger.bind(this);

    const ww = $(window).width();
    // get child
    const child = this.innerHTML || "";

    const commentButton = this.#isCommentability()
      ? `
      <button id="comment">${commentSVG}<span>Balas</span></button>
    `
      : "";

    const upvote =
      Number(this.upvote) === 0
        ? `
          <button id="upvote">${upvoteSVG}</button>
      `
        : `
          <button id="upvote" class="active">${upvoteSVG}<span>${this.upvote}</span></button>
        `;

    const downvote =
      Number(this.downvote) === 0
        ? `
          <button id="downvote">${downvoteSVG}</button>
      `
        : `
          <button id="downvote" class="active">${downvoteSVG}<span>${this.downvote}</span></button>
        `;
    const html = `
      <div class="content">
        <div class="detail">
          <div class="author_date">
            <span class="author">${this.author}</span>
            <span class="date">${this.createdAt}</span>
          </div>
          <span>${this.comment}</span>
        </div>
        ${this.#createSelectButton()}
      </div>
      <div class="action">
        ${commentButton}
        ${upvote}
        ${downvote}
      </div>
        
      <div class="child">
        ${child}
      </div>
    `;
    $(this).html(html);

    this.#afterRender();
  }

  #afterRender() {
    // binding
    this.sendComment = this.sendComment.bind(this);
    // handler
    $(`comment-card[data-id='${this.idComment}'] > .action> #comment`).off("click");
    $(`comment-card[data-id='${this.idComment}'] > .action> #comment`).click(this.commentFormTrigger);
    $("#addcomment input[type='submit']").click(this.sendComment);
  }

  sendComment(ev) {
    ev.preventDefault();
    // collecting input
    const textAreaInputVal = $("#addcomment textarea#com_input").val();

    let newChildThis;
    if (this.elementType === "jawaban") {
      newChildThis = {
        id_pertanyaan: this.targetId,
        id_user: Auth.index(),
        isi: textAreaInputVal,
      };
    }

    console.log(newChildThis);

    // do hit api
  }
}

customElements.define("comment-card", Comment);
