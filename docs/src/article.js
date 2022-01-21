import marked from "../_snowpack/pkg/marked.js";
import hljs from "../_snowpack/pkg/highlightjs.js";
import "../_snowpack/pkg/highlightjs/styles/atom-one-dark.css.proxy.js";
const params = new URLSearchParams(window.location.search);
if (!params.has("article")) {
  location.assign("index.html");
}
fetch("db.json").then((res) => res.json()).then((data) => {
  let db = data;
  let article = db.articles.find((article2) => article2.slug == params.get("article"));
  if (article === void 0) {
    location.assign("index.html");
    return;
  }
  marked.setOptions({
    highlight: function(code, lang) {
      return hljs.highlight(code, {language: lang}).value;
    }
  });
  document.getElementById("md").innerHTML = marked(article.body);
}).catch((e) => {
  console.error(`Failed to fetch db.json: ${e}`);
  location.assign("index.html");
});
