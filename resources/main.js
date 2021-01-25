let playButton = document.querySelector('button');
let allCards = document.querySelectorAll('.card');

// create array of buttons corresponding to card locations
function assignScreenAreas(){
  let screenAreas = [];
  for (i=1; i<17; i++){
    screenAreas.push(document.getElementById(`card-${i}`));
  }
  return screenAreas;
}
const screenAreas = assignScreenAreas();

//card factory function
function cardFactory(id, value){
  return {
    id,
    value,
    flipped: false
  }
}

//possible values, same for each game
const cardValues = ['*', '*','?', '?', '!', '!', '#', '#', '&', '&','@', '@', '%', '%', '$', '$'];

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
const cards = assignValues();

function displayValue(event){
  let index = screenAreas.indexOf(event.target);
  event.target.innerHTML = cards[index].value;
  console.log(`Here I am in displayValue, displaying ${event.target.id}`);
}

function checkMatch(cardA, cardB){
  if (cardA.value == cardB.value) {
    return true;
  }
  else {
    return false;
  }
}

/*function hideValues(cardA, cardB){
 cardA.innerHTML = "";
 cardB.innerHTML = "";
}*/

//keep track of number of flipped cards, check for a match when there are 2
let flippedCards = [];
let matches = 0;

function flipCard(event){
  //Show the card you just clicked
    console.log("About to display the first value");
    displayValue(event);
  
  //Add to array of already flipped cards
  flippedCards.push(event.target);
  //Check if there are now two cards showing
  if (flippedCards.length == 2) {
    //If so, check if they match
    let index1 = screenAreas.indexOf(flippedCards[0]);
    let index2 = screenAreas.indexOf(flippedCards[1]);
    if (checkMatch(cards[index1], cards[index2])){
      matches += 1;
      document.querySelector('h1').innerHTML = "It's a match!";
      screenAreas[index1].style.visibility = "hidden";
      screenAreas[index2].style.visibility = "hidden";
    } else {
      document.querySelector('h1').innerHTML = "No match";
      //hideValues(screenAreas[index1], screenAreas[index2]);
    }
    //flippedCards=[];
  }
}
//When you click on any card, execute flipCard()
allCards.forEach(card => {card.addEventListener('click', ()=> {
  console.log(`${flippedCards.length} cards have been flipped`);
  if (flippedCards.length < 2){
    console.log("About to flip a card");
    flipCard(event);
    } else {
      allCards.forEach(card => {card.innerHTML = ""});
      flippedCards=[];
    }
  }
  )
});


playButton.addEventListener('click', assignValues);


/*function changeColor(event){
  event.target.style.backgroundColor = 'Red';
}*/
