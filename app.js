"use strict";

window.addEventListener("load", function () {
  document.querySelector("body").classList.add("loaded");
});



const timer = document.getElementById('time');
  let timeCount;

  function startTimer() {
 
    clearInterval(timeCount);

    let second = 0,
      minute = 0,
      hour = 0;
  

    timeCount = setInterval(function () {

      timer.innerHTML =
        (hour ? hour + ":" : "") +
        (minute < 10 ? "0" + minute : minute) +
        ":" +
        (second < 10 ? "0" + second : second);

      second++;
  

      if (second == 60) {
        minute++;
        second = 0;
      }

      if (minute == 60) {
        hour++;
        minute = 0;
      }
    }, 1000);


  };

  function stopTime() {
      clearInterval(timeCount);
  }



const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;

let lockCards = false;

let firstCard;
let secondCard;

var cardPairs = [];

var popUp = document.getElementsByClassName('congrats-pop')[0];

var timeufo = document.getElementsByClassName('timer')[0];

function flipCard() {
  if (lockCards) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
} 

}

function checkForMatch() {

    if (firstCard.id === secondCard.id) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        cardPairs.push(firstCard.id);
        cardPairs.push(secondCard.id);

        isItDone();

    } else {

        lockCards = true;

  setTimeout( function() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetCards();
  }, 1200);
    }

}


function resetCards() {
    hasFlippedCard = false;
    lockCards = false;
    firstCard = null;
    secondCard = null;
  }


  
  function shuffle() {
    cards.forEach(function(card){
      let randomPosition = Math.floor(12 * Math.random());
      card.style.order = randomPosition;
    });
  };

  function isItDone() {
    if (cardPairs.length === 12){

    setTimeout(Congrats, 1200);

    stopTime();

    }

  }

  function Congrats() {
    popUp.classList.add('visible');
    timeufo.classList.add('large');
}

    function resetGame() {
        popUp.classList.remove('visible');
        timeufo.classList.remove('large');

        location.reload();

    }

  startTimer();
  shuffle();
  
  cards.forEach(function(card) { card.addEventListener('click', flipCard)});

  
  






/*

// different method
//but couldnt make them rotate - flip - nicely

const cardArray = [
    {
        name: 'angry',
        img: 'img/card1.png'
    },
    {
        name: 'angry',
        img: 'img/card1.png'
    },
    {
        name: 'happy',
        img: 'img/card2.png'
    },
    {
        name: 'happy',
        img: 'img/card2.png'
    },
    {
        name: 'silly',
        img: 'img/card3.png'
    },
    {
        name: 'silly',
        img: 'img/card3.png'
    },
    {
        name: 'awkward',
        img: 'img/card4.png'
    },
    {
        name: 'awkward',
        img: 'img/card4.png'
    },
    {
        name: 'dead',
        img: 'img/card5.png'
    },
    {
        name: 'dead',
        img: 'img/card5.png'
    },
    {
        name: 'thinking',
        img: 'img/card6.png'
    },
    {
        name: 'thinking',
        img: 'img/card6.png'
    }
];

cardArray.sort( function() { 
    return 0.5 - Math.random()
});

var popUp = document.getElementsByClassName('congrats-pop')[0];
  

function Congrats() {
    popUp.classList.add('visible');
}


const cardGameGrid = document.querySelector('#card-grid');

function createGrid() {
    for (let i=0; i < cardArray.length; i++) {
        var card = document.createElement('img');
        card.className = 'card-img';
        card.setAttribute('src', 'img/cardback.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        cardGameGrid.appendChild(card);
    }
};

var cardsChosen = [];
var cardsChosenID = [];
var cardPairs = [];

function checkMatch() {
    var cards = document.getElementsByClassName('card-img');
    const optionOneID = cardsChosenID[0];
    const optionTwoID = cardsChosenID[1];

    if (cardsChosen[0] === cardsChosen[1]) {
        cardPairs.push(cardsChosen[0])
        cardPairs.push(cardsChosen[1])

    } else {
        cards[optionOneID].setAttribute('src', 'img/cardback.png')
        cards[optionTwoID].setAttribute('src', 'img/cardback.png')

    };

    cardsChosen = [];
    cardsChosenID = [];

    if (cardPairs.length === 12){
        Congrats();
    }

};


function flipCard() {
    var cardID = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardID].name);
    cardsChosenID.push(cardID);
    this.setAttribute('src', cardArray[cardID].img);
 
    if (cardsChosen.length === 2){
        setTimeout(checkMatch, 1000);
    }   
}

createGrid();

function resetGame() {
    popUp.classList.remove('visible');
    location.reload();
};

*/