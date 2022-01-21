import "./blob/blob.js";
fetch("db.json").then((res) => res.json()).then((data) => {
  let db = data;
  const cardContainer = document.querySelector(".card-container");
  for (let article of db.articles) {
    cardContainer.insertAdjacentHTML("beforeend", Card(article));
  }
}).catch((e) => console.error(`Failed to fetch db.json: ${e}`));
function Card(article) {
  return `
    <div class="card">
        <img src="img/wtf.png">
        <div class="descriptions">
            <h1>${article.title}</h1>
            <h3>${new Date(article.date).toLocaleString("en-US", {dateStyle: "medium"})}</h3>
            <p>${article.short ?? "none"}</p>
        </div>
        <a class="button" href="article.html?article=${article.slug}">Read more</a>
    </div>
    `;
}
