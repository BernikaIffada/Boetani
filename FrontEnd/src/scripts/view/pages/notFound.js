const notFound = {
  index({ root }) {
    $("nav .menu_container a").removeClass("isActive");
    const html = `
        <div id="notfound">
          <h1>404</h1>
          <h1>Oops... we can't find this page</h1>
        </div> 
    `;

    $(root).html("");
    $(root).append(html);
  },
};

export default notFound;
