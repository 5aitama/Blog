import marked from "marked";
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css';

marked.setOptions({
    highlight: function (code, lang) {
        return hljs.highlight(code, { language: lang }).value;
    }
})

document.getElementById("md")!.innerHTML = marked("# Marked in browser\n\nRendered by **marked**.\n\nthis is inline code : \n```c\nint x = 0;\n\ntypedef struct MyStruct {\n\n} MyStruct;\n```\n\n```js\nconst x = 0;\nconsole.log(i);\n```");