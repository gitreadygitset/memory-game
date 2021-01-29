const allCards = document.querySelectorAll('.card');  
const cardValues = ['*', '*','?', '?', '!', '!', '#', '#', '&', '&','@', '@', '%', '%', '$', '$'];  //possible values, same for each game
const screenAreas = assignScreenAreas(); //array of HTML .card divs
const cards = assignValues();  //array of card objects 
let flippedCards = []; 
let matches = 0;
let guesses = 0;
let activeMatch = false;
let canHide = false;

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
    console.log(`Target card is ${targetCard.id}`);
    let targetScreen = event.target;
    console.log(`Target div is ${targetScreen.id}`);
    if(!targetCard.flipped && flippedCards.length < 2){
        console.log(`About to flip ${targetCard.id}`);
        flipCard(targetCard, targetScreen);
    }
}
//When a card is flipped, show its value. If it's the second card showing, check for a match
function flipCard(card, div){
    console.log (`Flipping ${card.id}`)
    card.flipped = true;
    div.innerHTML = card.value;
    if(flippedCards.length === 1){
        guesses += 1;
        console.log("About to call check for a match");
        checkMatch(flippedCards[0], card);
        canFlip = true;
  }
  flippedCards.push(card);
  console.log (`Flipped cards: ${flippedCards.length}`);
}

//When there are two cards showing, check if they match
function checkMatch(cardA, cardB){
    console.log(`Checking for a match between ${cardA.id} and ${cardB.id}`);
    if (cardA.value === cardB.value && cardA.id !== cardB.id) {
      matches++;
      document.querySelector('h1').innerHTML = "It's a match!";
      console.log(`${matches} found so far;`)
      activeMatch = true;
      return true;
    }
    else {
      document.querySelector('h1').innerHTML = "No match";
      return false;
    }
}

function everyTwo(){
    console.log("2 cards have been flipped");
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
    console.log(`There are ${flippedCards.length} cards flipped.`)
};


allCards.forEach(card => {card.addEventListener('click', (event) => {
    if(flippedCards.length === 2){
        everyTwo();
    } else {
        processClick(event);
    }
})
});
