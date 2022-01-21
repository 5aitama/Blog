import "./blob/blob";

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

fetch("db.json")
    .then(res => res.json())
    .then(data => {
        let db = (data as IDatabase);
        
        const cardContainer = document.querySelector(".card-container") as HTMLDivElement;

        for (let article of db.articles) {
            cardContainer.insertAdjacentHTML('beforeend', Card(article));
        }
    })
    .catch(e => console.error(`Failed to fetch db.json: ${e}`));

function Card(article: IArticle) {
    return `
    <div class="card">
        <img src="img/wtf.png">
        <div class="descriptions">
            <h1>${article.title}</h1>
            <h3>${new Date(article.date).toLocaleString('en-US', { dateStyle: "medium" })}</h3>
            <p>${article.short ?? "none"}</p>
        </div>
        <a class="button" href="article.html?article=${article.slug}">Read more</a>
    </div>
    `;
}