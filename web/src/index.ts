import "./blob/blob";

const cardContainer = document.querySelector(".card-container") as HTMLDivElement;

function GetMaxCardsIn(element: HTMLElement, cardSettings: { width: number, margin: number }) {
    const extra = 10;
    return Math.floor(element.clientWidth / (cardSettings.width + cardSettings.margin + extra));
}

function Card() {
    return `
    <div class="card">
        <img src="img/wtf.png">
        <div class="descriptions">
            <h1>Gold Road</h1>
            <h3>Mon 22 Jul 2021</h3>
            <p>How to generate procedural road with B...</p>
        </div>
        <a class="button" href="#">Read more</a>
    </div>
    `;
}

// console.log(GetMaxCardsIn(cardContainer, { width: 300, margin: 40 }));

// const maxCards = Math.max(1, Math.min(3, GetMaxCardsIn(cardContainer, { width: 300, margin: 40 })));

// for (let i = 0; i < maxCards; i++)
//     cardContainer.insertAdjacentHTML('beforeend', Card());