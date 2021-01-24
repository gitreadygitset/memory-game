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

//possible values, same for each game
const cardValues = ['*', '*','?', '?', '!', '!', '#', '#', '&', '&','@', '@', '%', '%', '$', '$'];

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
const cards = assignValues();

function displayValue(event){
  let index = screenAreas.indexOf(event.target);
  event.target.innerHTML = cards[index].value;
}

function changeColor(event){
  event.target.style.backgroundColor = 'Red';
}

allCards.forEach(card => {card.addEventListener('click', displayValue)});
//screenAreas[0].onclick = changeColor;


/*function revealCard(event){
  event.target.style.display = 'flex';
}
*/

playButton.addEventListener('click', assignValues);

