/* Data */
var numberOfClicks = 0;
var clickedCards = [];
var resultat = {
    time: 0,
    clicks: 0
};
var playerCards = [];
var main = document.querySelector('main');
var deck = [{
        image: "https://cdn.pixabay.com/photo/2017/02/23/13/23/bear-2092165_960_720.png",
        pairId: 1,
        id: 1
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/02/23/13/23/bear-2092165_960_720.png",
        pairId: 1,
        id: 2
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/08/08/21/28/cat-3593240_960_720.png",
        pairId: 2,
        id: 3
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/08/08/21/28/cat-3593240_960_720.png",
        pairId: 2,
        id: 498
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/10/30/04/10/cartoon-3782736_960_720.png",
        pairId: 3,
        id: 52
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/10/30/04/10/cartoon-3782736_960_720.png",
        pairId: 3,
        id: 6
    },
    {
        image: "https://cdn.pixabay.com/photo/2016/12/19/19/03/deer-1918895_960_720.png",
        pairId: 4,
        id: 7
    },
    {
        image: "https://cdn.pixabay.com/photo/2016/12/19/19/03/deer-1918895_960_720.png",
        pairId: 4,
        id: 8
    }
];

// Render
function render() {
    deck.forEach(function(card) {
        let newCard = document.createElement('div');
        /*
        Nedan lägger jag in ett "ofarligt" id-värde som inte går att koppla
        till något särskilt. Det är bättre än att lägga in pairId, som
        i det här fallet är "känslig information", dvs som en 
        användare inte ska ha tillgång till. */
        newCard.innerHTML = `
        <div class="flip-card-inner">
            <div class="flip-card-back" id="${card.id}">        
            </div>
            <div class="flip-card-front">
                <img src="${card.image}">
            </div>
        </div>`;
        newCard.classList.add('flip-card');
        main.appendChild(newCard);
    });
}

main.addEventListener('click', function(e) {
    resultat.clicks++;
    if (numberOfClicks < 2) {
        if (e.target.nodeName == "DIV") {
            e.target.parentNode.classList.add('active', 'unclickable');
            clickedCards.push(e.target.id);
        }
        numberOfClicks++;
        if (numberOfClicks == 2) {
            checkMatch();
        }
    }
})

function checkMatch() {
    /*
    Här använder jag id från HTML-elementet 
    för att leta fram rätt card-objekt, 
    och i nästa skede kolla det objektets pairId.
    På så vis håller jag den känsliga informationen skyddad.
    */
    let first = deck.find((card) => {
        return card.id == clickedCards[0];
    })
    let second = deck.find((card) => {
        return card.id == clickedCards[1];
    })
    if (first.pairId == second.pairId) {
        setTimeout(() => {
            removeCards();
        }, 1000)
        playerCards.push(first, second);
        // Kontrollera om spelet är slut.
        if (deck.length == playerCards.length) {
            console.log("Spelet är slut");
        }

    } else {
        setTimeout(() => {
            resetCards();
        }, 1000)

    }
    clickedCards = [];
}

function removeCards() {
    var cardsToFlip = document.getElementsByClassName("active");
    cardsToFlip[0].classList.add("hidden")
    cardsToFlip[1].classList.add("hidden")
    cardsToFlip[0].classList.remove("active", "unclickable")
    cardsToFlip[0].classList.remove("active", "unclickable")

    numberOfClicks = 0;
}

function resetCards() {
    var cardsToFlip = document.getElementsByClassName("active");
    cardsToFlip[0].classList.remove("active", "unclickable")
    cardsToFlip[0].classList.remove("active", "unclickable")
    numberOfClicks = 0;
}
// Shuffle
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
// INIT
shuffle(deck);
render();