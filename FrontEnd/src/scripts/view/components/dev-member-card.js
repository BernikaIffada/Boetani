import $ from "jquery";
import linkedinSVG from "../../../template/linkedin-svg.html";
import emailSVG from "../../../template/email-svg.html";
import instagramSVG from "../../../template/instagram-svg.html";

class devmembercard extends HTMLElement {
  connectedCallback() {
    this.href = this.getAttribute("href") || null;
    this.imgpath = this.getAttribute("src") || null;
    this.name = this.getAttribute("data-name") || null;
    this.kelas = this.getAttribute("data-kelas") || null;
    this.jobdesk = this.getAttribute("data-jobdesk") || null;
    this.instagram = this.getAttribute("data-instagram") || null;
    this.email = this.getAttribute("data-email") || null;
    this.linkedin = this.getAttribute("data-linkedin") || null;
    this.render();
  }

  render() {
    const html = `
        <div class="container_member">
            <img src="${this.imgpath}" alt="${this.name.toLowerCase()}.png"/>
            <div class="content">
                <div class="detail">
                    <span class="nama">${this.name}</span>
                    <span class="jobdesk">${this.jobdesk}</span>
                    <div class="sosmed">
                        <a class="linkedin" href="${this.linkedin}">${linkedinSVG}</a>
                        <a class="email" href="${this.email}">${emailSVG}</a>
                        <a class="instagram" href="${this.instagram}">${instagramSVG}</a>
                    </div>
                </div>
                <span class="kelas">${this.kelas}</span>
            </div>
        </div>
    `;
    $(this).html(html);
  }
}

customElements.define("dev-member-card", devmembercard);
