/* Data */
var numberOfClicks = 0;
var clickedCards = [];
var main = document.querySelector('ul');
var resultat = {
    clicks: 0,
    time: 0
}
var timer;
var resultatDiv = document.getElementById("resultat");

var deck = [{
        image: "https://cdn.pixabay.com/photo/2017/02/23/13/23/bear-2092165_960_720.png",
        imageIsVisible: false,
        pairId: 1,
        id: 1
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/02/23/13/23/bear-2092165_960_720.png",
        imageIsVisible: true,
        pairId: 1,
        id: 3
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/01/31/22/27/anemone-2027735_960_720.png",
        imageIsVisible: true,
        pairId: 5,
        id: 31
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/01/10/20/29/lady-bug-1970114_960_720.png",
        imageIsVisible: true,
        pairId: 6,
        id: 3
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/01/31/22/27/anemone-2027735_960_720.png",
        imageIsVisible: true,
        pairId: 5,
        id: 36333
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/01/10/20/29/lady-bug-1970114_960_720.png",
        imageIsVisible: true,
        pairId: 6,
        id: 49
    },
    {
        image: "data:image/png;base64,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",
        imageIsVisible: true,
        pairId: 7,
        id: 311
    },
    {
        image: "data:image/png;base64,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",
        imageIsVisible: true,
        pairId: 7,
        id: 90
    },
    {
        image: "https://www.goodfreephotos.com/albums/vector-images/cartoon-dog-vector-file.png",
        imageIsVisible: true,
        pairId: 8,
        id: 34534
    },
    {
        image: "https://www.goodfreephotos.com/albums/vector-images/cartoon-dog-vector-file.png",
        imageIsVisible: true,
        pairId: 8,
        id: 3745
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/08/08/21/28/cat-3593240_960_720.png",
        imageIsVisible: false,
        pairId: 2,
        id: 6
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/08/08/21/28/cat-3593240_960_720.png",
        imageIsVisible: false,
        pairId: 2,
        id: 4
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/10/30/04/10/cartoon-3782736_960_720.png",
        imageIsVisible: true,
        pairId: 3,
        id: 5
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/10/30/04/10/cartoon-3782736_960_720.png",
        imageIsVisible: false,
        pairId: 3,
        id: 7
    },
    {
        image: "https://cdn.pixabay.com/photo/2016/12/19/19/03/deer-1918895_960_720.png",
        imageIsVisible: false,
        pairId: 4,
        id: 2
    },
    {
        image: "https://cdn.pixabay.com/photo/2016/12/19/19/03/deer-1918895_960_720.png",
        imageIsVisible: true,
        pairId: 4,
        id: 8
    }
];

// Render
function render() {
    deck.forEach(function(card) {
        let newCard = document.createElement('li');
        newCard.innerHTML = `
        <div class="flip-card-inner">
            <div class="flip-card-back">        
            </div>
            <div class="flip-card-front">
                <img src="${card.image}">
            </div>
        </div>`;
        newCard.classList.add('flip-card');
        newCard.id = card.id;
        main.appendChild(newCard);
    });
}

// Shuffle
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


// Kolla matchning.
function checkMatch() {
    // Hämta par-id
    let first = deck.find((card) => {
        return card.id == clickedCards[0];
    })
    let second = deck.find((card) => {
        return card.id == clickedCards[1];
    })
    if (first.pairId == second.pairId) {
        setTimeout(function() {
            hideCards(first, second)
        }, 1500)
    } else {
        setTimeout(function() {
            flipCards()
        }, 1500)
    }
}

function flipCards() {
    var cardsToFlip = document.getElementsByClassName("active");
    cardsToFlip[0].classList.remove("active", "unclickable")
    cardsToFlip[0].classList.remove("active", "unclickable")
}

function hideCards(first, second) {
    // Städa html
    var cardsToHide = document.getElementsByClassName("active");
    cardsToHide[0].classList.add("hidden")
    cardsToHide[1].classList.add("hidden")
    cardsToHide[0].classList.remove("active", "unclickable")
    cardsToHide[0].classList.remove("active", "unclickable")

    // Ordna data, dvs ta bort funna par.
    deck.splice(deck.indexOf(first), 1);
    deck.splice(deck.indexOf(second), 1);

    // Kontroll om det är slut.
    if (deck.length == 0) {
        stopTimer();
        resultat.click = numberOfClicks;
        resultatDiv.innerHTML =
            `Antal försök: ${resultat.click/2}
        <br />Tid: ${resultat.time.toFixed(1)}`;
    }
}

main.addEventListener('click', function(e) {
    if (resultat.time == 0) {
        timer = setInterval(() => {
            resultat.time += 0.1;
            resultatDiv.innerHTML = resultat.time.toFixed(1)
        }, 100)
    }
    if (clickedCards.length < 2) {
        if (e.target.nodeName != "UL") {
            let id = e.target.parentNode.parentNode.id;
            e.target.parentNode.classList.add('active', 'unclickable');
            clickedCards.push(id);
            numberOfClicks++;
            if (clickedCards.length == 2) {
                checkMatch();
                clickedCards = [];
            }
        }
    }
})

function stopTimer() {
    clearInterval(timer);
}
// Init.
shuffle(deck);
render();