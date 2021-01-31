let allCards;  
const cardValues = ['*', '*','?', '?', '!', '!', '#', '#', '&', '&','@', '@', '%', '%', '$', '$'];  //possible values, same for each game
let screenAreas; 
const matchDisplay = document.getElementById('matches_found');
const guessDisplay = document.getElementById('total_guesses');
const resetButton = document.querySelector('button');
const gridSpace = document.querySelector('.grid');
const gridView = gridSpace.innerHTML;
const header = document.querySelector('h1');
let cards;   
let flippedCards;
let matches;
let guesses;
let activeMatch;
setup();

function setup() {
  allCards = document.querySelectorAll('.card');
  screenAreas = assignScreenAreas();  //array of HTML .card divs
  cards = assignValues();  //array of card objects
  flippedCards = [];
  matches = 0;
  guesses = 0;
  activeMatch = false;
  gridSpace.className = 'grid';
  allCards.forEach(card => {card.addEventListener('click', (event) => {
      if(flippedCards.length === 2){
        console.log(`There are ${flippedCards.length} cards flipped`);
          everyTwo();
      } else {
          console.log(`There are ${flippedCards.length} cards flipped`);
          processClick(event);
      }
  })
  });
  resetButton.addEventListener('click', restart);

}

// create array of buttons corresponding to card locations
function assignScreenAreas(){
    let screenAreas = [];
    for (i=1; i<17; i++){
      screenAreas.push(document.getElementById(`card-${i}`));
    }
    return screenAreas;
  }
  
//card factory function
function cardFactory(id, value){
    return {
      id,
      value,
      flipped: false
    }
}

//create 16 card objects with random values using copy of values array, and store in array
function assignValues(){
    let game_array = cardValues.map(item => item); 
    let cards = []
    for (i=1; i<17; i++){
      let index = Math.floor(Math.random()*game_array.length); 
      cards.push(cardFactory(`card${i}`, game_array[index]));
      game_array.splice(index, 1); 
    }
    return cards;
}
//When a card is clicked, assign it to targetCard and flip it
function processClick(event){
    let targetCard = cards[screenAreas.indexOf(event.target)];
    let targetScreen = event.target;
    if(!targetCard.flipped && flippedCards.length < 2){
        flipCard(targetCard, targetScreen);
    }
}
//When a card is flipped, show its value. If it's the second card showing, check for a match
function flipCard(card, div){
    card.flipped = true;
    div.innerHTML = card.value;
    if(flippedCards.length === 1){
        guesses += 1;
        guessDisplay.innerHTML = `Total Guesses: ${guesses}`;
        checkMatch(flippedCards[0], card);
        //canFlip = true;
  }
  flippedCards.push(card);
}

//When there are two cards showing, check if they match, increment matches and show match/no match message
function checkMatch(cardA, cardB){
    if (cardA.value === cardB.value && cardA.id !== cardB.id) {
      matches++;
      matchDisplay.innerHTML = `Matches Found: ${matches}`;
      header.innerHTML = "It's a match!";
      activeMatch = true;
    }
    else {
      header.innerHTML = "No match";
      return false;
    }
}

function everyTwo(){
    console.log('Every two!');
    let div1 = screenAreas[cards.indexOf(flippedCards[0])];
    let div2 = screenAreas[cards.indexOf(flippedCards[1])]; 
    if(activeMatch){
        div1.style.visibility = "hidden";
        div2.style.visibility = "hidden";
        activeMatch = false;
    } else{
        div1.innerHTML = "";
        div2.innerHTML = "";
    }
    flippedCards[0].flipped = false;
    flippedCards[1].flipped = false;
    flippedCards=[];
    if(matches === 8){
      youWin();
      debugger
    }
};

function youWin(){
  gridSpace.className = 'win';
  document.querySelector('h1').innerHTML = "";
  gridSpace.innerHTML = 'You did it!';
  resetButton.innerHTML = 'Play again';
}

function restart(){
  gridSpace.innerHTML = gridView;
  allCards.forEach(card => {
    card.style.visibility = 'visible';
    card.innerHTML = '';
  });
  setup();
  guessDisplay.innerHTML = `Total Guesses: ${guesses}`;
  matchDisplay.innerHTML = `Matches Found: ${matches}`;
  header.innerHTML = "Let's play a memory game!";
  resetButton.innerHTML = 'Start Over';
}
