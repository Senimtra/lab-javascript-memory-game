// ########################################
// ## Iteration 3: HTML/CSS Interactions ##
// ########################################

const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

// get the DOM score elements
const scorePairsClickedElement = document.querySelector('#pairs-clicked');
const scorePairsGuessedElement = document.querySelector('#pairs-guessed');
const scoreHeadingElement = document.querySelector('#score h2');

const memoryGame = new MemoryGame(cards);

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.shuffleCards();
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      // add class 'turned' to picked card
      card.classList.toggle('turned');
      // push card to pickedCards array
      memoryGame.pickedCards.push(card);
      // check if there are two cards in the array
      if (memoryGame.pickedCards.length === 2) {
        // increment pairsClicked and update score
        memoryGame.pairsClicked++;
        scorePairsClickedElement.innerText = memoryGame.pairsClicked;
        // setTimeout to flip back all cards that are not guessed ('blocked') and not just picked
        setTimeout(() => [...document.querySelectorAll('.card:not(.blocked)')]
          .filter(n => !memoryGame.pickedCards.includes(n))
          .forEach(card => card.classList.remove('turned')), 1000);
        // check if the cards are the same
        if (memoryGame.pickedCards[0]
          .getAttribute('data-card-name') === memoryGame.pickedCards[1]
            .getAttribute('data-card-name')) {
          // increment pairsGuessed and update score
          memoryGame.pairsGuessed++;
          scorePairsGuessedElement.innerText = memoryGame.pairsGuessed;
          // add class 'blocked' to both cards
          memoryGame.pickedCards.forEach(n => n.classList.add('blocked'))
          // check if all pairs are guessed + print msg
          if (memoryGame.checkIfFinished()) scoreHeadingElement.innerText = 'YOU WON!';
        };
        // clear the pickedCards array
        memoryGame.pickedCards = [];
      }
    });
  });
});
