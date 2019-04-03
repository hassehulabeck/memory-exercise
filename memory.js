/* Data */
var clickedCards = [];
var main = document.querySelector('ul');
var resultat = {
    clicks: 0,
    time: 0
}
var timer;
var resultatDiv = document.getElementById("resultat");
var message = "";

var deck = [{
        image: "https://cdn.pixabay.com/photo/2017/02/23/13/23/bear-2092165_960_720.png",
        pairId: 1,
        id: 1
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/02/23/13/23/bear-2092165_960_720.png",
        pairId: 1,
        id: 36
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/01/31/22/27/anemone-2027735_960_720.png",
        pairId: 5,
        id: 31
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/01/10/20/29/lady-bug-1970114_960_720.png",
        pairId: 6,
        id: 3
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/01/31/22/27/anemone-2027735_960_720.png",
        pairId: 5,
        id: 36333
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/01/10/20/29/lady-bug-1970114_960_720.png",
        pairId: 6,
        id: 49
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Cow_cartoon_04.svg",
        pairId: 7,
        id: 311
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/2/21/Cow_cartoon_04.svg",
        pairId: 7,
        id: 90
    },
    {
        image: "https://www.goodfreephotos.com/albums/vector-images/cartoon-dog-vector-file.png",
        pairId: 8,
        id: 34534
    },
    {
        image: "https://www.goodfreephotos.com/albums/vector-images/cartoon-dog-vector-file.png",
        pairId: 8,
        id: 3745
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/08/08/21/28/cat-3593240_960_720.png",
        pairId: 2,
        id: 6
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/08/08/21/28/cat-3593240_960_720.png",
        pairId: 2,
        id: 4
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/10/30/04/10/cartoon-3782736_960_720.png",
        pairId: 3,
        id: 5
    },
    {
        image: "https://cdn.pixabay.com/photo/2018/10/30/04/10/cartoon-3782736_960_720.png",
        pairId: 3,
        id: 7
    },
    {
        image: "https://cdn.pixabay.com/photo/2016/12/19/19/03/deer-1918895_960_720.png",
        pairId: 4,
        id: 2
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
        }, 1300)
    } else {
        setTimeout(function() {
            flipCards()
        }, 1300)
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
        if (resultat.time > 60) {
            var millis = new Date(resultat.time * 1000);
            let mins = millis.getMinutes();
            let secs = leadingZero(millis);
            let tens = millis.getMilliseconds() / 100;
            var tidsInfo = `${mins}:${secs}:${tens}`;
        } else {
            var tidsInfo = resultat.time.toFixed(1);
        }
        resultatDiv.innerHTML =
            `Antal försök: ${resultat.clicks/2}
        <br />Tid: ${tidsInfo}`;
    }
}

main.addEventListener('click', function(e) {
    // Starta timern vid första klicket.
    if (resultat.time == 0) {
        let rec = localStorage.getItem('timeRecord').split(",");
        var recordStr = "Aktuellt rekord: " + rec[0] + " sekunder";
        timer = setInterval(() => {
            resultat.time += 0.1;
            if (resultat.time > 60) {
                var millis = new Date(resultat.time * 1000);
                let mins = millis.getMinutes();
                let secs = leadingZero(millis);
                let tens = (millis.getMilliseconds() / 100).toFixed(0);
                resultatDiv.innerHTML = `${recordStr}<p>${mins}:${secs}:${tens}`;
            } else {
                resultatDiv.innerHTML = recordStr + "<p>" + resultat.time.toFixed(1)
            }
        }, 100)
    }
    if (clickedCards.length < 2) {
        if (e.target.nodeName != "UL") {
            let id = e.target.parentNode.parentNode.id;
            e.target.parentNode.classList.add('active', 'unclickable');
            clickedCards.push(id);
            resultat.clicks++;
            if (clickedCards.length == 2) {
                checkMatch();
                clickedCards = [];
            }
        }
    }
})

function stopTimer() {
    clearInterval(timer);
    if (localStorage.getItem('timeRecord') != null) {
        var topTreStr = localStorage.getItem('timeRecord');
        var topTre = topTreStr.split(",");
        var prev = resultat.time;
        topTre.forEach((tid, index) => {
            if (prev < tid) {
                message = "Ny rekordnotering!";
                if (index < 2) {
                    topTre[index + 1] = tid;
                }
                topTre[index] = prev.toFixed(1);
                prev = tid;
            }
        })
        localStorage.setItem('timeRecord', topTre)
    }
    if (message.length > 0) {
        setTimeout(() => {
            resultatDiv.innerHTML = `<p>${message}</p>`;
            message = "";
        }, 2500)
    }
}

function leadingZero(millis) {
    return (millis.getSeconds() < 10 ? '0' : '') + millis.getSeconds();
}
// Init.
shuffle(deck);
render();