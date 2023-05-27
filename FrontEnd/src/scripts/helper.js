export default {
  addClassNameListener(elem, callback) {
    let lastClassName = elem.className;
    window.setInterval(function () {
      let className = elem.className;
      if (className !== lastClassName) {
        callback();
        lastClassName = className;
      }
    }, 10);
  },

  modifyUrl(title, url) {
    if (typeof history.pushState != "undefined") {
      var obj = {
        Title: title,
        Url: url,
      };
      history.pushState(obj, obj.Title, obj.Url);
    }
  },
};
