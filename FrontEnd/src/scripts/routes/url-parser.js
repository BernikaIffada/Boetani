const UrlParser = {
  _getHash() {
    const hash = window.location.hash.slice(1).toLowerCase();
    return hash;
  },

  _getHashWithParams(path) {
    const hash = path.hash.slice(1).toLowerCase();
    return hash;
  },

  parseActiveUrlWithCombiner() {
    const url = this._getHash();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = this._getHash();
    return this._urlSplitter(url);
  },

  parseActiveUrlWithoutCombinerWithParams(path) {
    const url = this._getHash(path);
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split("/");
    const search = window.location.search.slice(1);
    const searchVal = search.split("&");

    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
      search: searchVal || null,
    };
  },

  _urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : "/") + (splitedUrl.id ? `/${splitedUrl.id}` : "") + (splitedUrl.verb ? `/${splitedUrl.verb}` : "");
  },
};

export default UrlParser;
