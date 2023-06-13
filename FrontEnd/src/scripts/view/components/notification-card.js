import $ from "jquery";
class notificationcard extends HTMLElement {
  connectedCallback() {
    this.link = this.getAttribute("href") || "#";
    this.title = this.getAttribute("data-title") || null;
    this.summary = this.getAttribute("data-notification") || null;
    this.render();
  }

  render() {
    const html = `
        <a href="${this.link}">
            <span class="title">${this.title}</span>
            <span class="summary">${this.summary}</span>
        </a>
    `;
    $(this).html(html);
  }
}

customElements.define("notification-card", notificationcard);
