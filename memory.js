/* Data */
var numberOfClicks = 0;
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
var main = document.querySelector('main');
deck.forEach(function(card) {
    let newCard = document.createElement('div');
    newCard.innerHTML = `
    <div class="flip-card-inner">
        <div class="flip-card-back">        
        </div>
        <div class="flip-card-front">
            <img src="${card.image}">
        </div>
    </div>`;
    newCard.classList.add('flip-card');
    main.appendChild(newCard);
});

main.addEventListener('click', function(e) {
    if (numberOfClicks < 2) {
        // Vad är det jag klickar på?
        console.log(e.target);
        if (e.target.nodeName == "DIV") {
            e.target.parentNode.classList.toggle('flip-clicked');
        }
        numberOfClicks++;
    }
})