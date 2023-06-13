import $ from "jquery";
import plusSVG from "../../../template/plus-svg.html";
import searchSVG from "../../../template/search-svg.html";
import imgB from "../../../assets/img/dev/bernika.png";
import imgI from "../../../assets/img/dev/intan.png";
import imgL from "../../../assets/img/dev/lukman.png";
import imgR from "../../../assets/img/dev/rasyad.png";
const question = {
  index({ root }) {
    $("nav .menu_container a").removeClass("isActive");
    $("nav .menu_container .nav_fix a:last-of-type").addClass("isActive");
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
                    <question-card data-id="8a9dfqj4f0wqh9jerqn" data-img="${imgB}" data-author="Jhon doe" data-date="19 Juli 2023" data-title="Lorem ipsum dolor sit amet consectetur adipisicing elit." data-summary="Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiaadjsdi ewuaowe dfsd tkldaiu werxfd werawet daweradf wtrgasdf afwdjubwef wqwesdaawf" data-countComment="3" data-categories="lahan kering, lahan basah, mangga, jeruk"></question-card>
                    <question-card data-id="8a9dfqj4f0wqh9jerqn" data-img="${imgI}" data-author="Jhon doe" data-date="19 Juli 2023" data-title="Lorem ipsum dolor sit amet consectetur adipisicing elit." data-summary="Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiaadjsdi ewuaowe dfsd tkldaiu werxfd werawet daweradf wtrgasdf afwdjubwef wqwesdaawf" data-countComment="3" data-categories="lahan kering, lahan basah, mangga, jeruk"></question-card>
                    <question-card data-id="8a9dfqj4f0wqh9jerqn" data-img="${imgL}" data-author="Jhon doe" data-date="19 Juli 2023" data-title="Lorem ipsum dolor sit amet consectetur adipisicing elit." data-summary="Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiaadjsdi ewuaowe dfsd tkldaiu werxfd werawet daweradf wtrgasdf afwdjubwef wqwesdaawf" data-countComment="3" data-categories="lahan kering, lahan basah, mangga, jeruk"></question-card>
                    <question-card data-id="8a9dfqj4f0wqh9jerqn" data-img="${imgR}" data-author="Jhon doe" data-date="19 Juli 2023" data-title="Lorem ipsum dolor sit amet consectetur adipisicing elit." data-summary="Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiaadjsdi ewuaowe dfsd tkldaiu werxfd werawet daweradf wtrgasdf afwdjubwef wqwesdaawf" data-countComment="3" data-categories="lahan kering, lahan basah, mangga, jeruk"></question-card>
                    <question-card data-id="8a9dfqj4f0wqh9jerqn" data-img="" data-author="Jhon doe" data-date="19 Juli 2023" data-title="Lorem ipsum dolor sit amet consectetur adipisicing elit." data-summary="Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiaadjsdi ewuaowe dfsd tkldaiu werxfd werawet daweradf wtrgasdf afwdjubwef wqwesdaawf" data-countComment="3" data-categories="lahan kering, lahan basah, mangga, jeruk"></question-card>
                </div>
            </div>
        </section>
    `;
    $(root).html(html);
    if ($(window).width() >= 768) {
      $("#postingan_page > .title").remove();
    }
  },
};

export default question;
