import marked from "marked";
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';

interface IArticle {
    slug: string,
    title: string,
    date: string,
    short?: string,
    body: string, 
}

interface IDatabase {
    articles: IArticle[],
}

const params = new URLSearchParams(window.location.search);

if (!params.has("article")) {
    location.assign("index.html");
}

fetch("db.json")
    .then(res => res.json())
    .then(data => {
        let db = (data as IDatabase);
        
        let article = db.articles.find(article => article.slug == params.get("article"));

        if (article === undefined) {
            location.assign("index.html");
            return;
        }

        marked.setOptions({
            highlight: function (code, lang) {
                return hljs.highlight(code, { language: lang }).value;
            }
        });
        
        document.getElementById("md")!.innerHTML = marked(article.body);
    })
    .catch(e => {
        console.error(`Failed to fetch db.json: ${e}`);
        location.assign("index.html");
    });