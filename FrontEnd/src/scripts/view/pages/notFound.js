const notFound = {
  index({ root }) {
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
