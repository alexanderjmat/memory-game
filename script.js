const gameContainer = document.getElementById("game");
const tiles = gameContainer.getElementsByTagName("div");
console.log(tiles);

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    newDiv.style.backgroundColor = 'white';

    gameContainer.append(newDiv);

  }
}

// TODO: Implement this function!
let counter = 0;
const pairs = [];
const allPairs = [];
let attempts = 0; 


function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const div = event.target;
  const color = div.className;
  if (div.style.backgroundColor == 'white') {
    div.style.backgroundColor = `${div.className}`
    pairs.push(div);

    if (pairs.length == 2) {
      attempts++;
      console.log(pairs.length);

      for (let i = 0; i < tiles.length; i++) {
            tiles.item(i).style.pointerEvents = 'none';
          }

      const id = setInterval(function() {
        if (pairs[0].className == pairs[1].className) {
          allPairs.push(pairs[0], pairs[1]);
          pairs.length = 0; 
          mySwitch = true; 
          console.log(allPairs.length);

          if (allPairs.length == 10) {
            alert(`You won in ${attempts} attempts!`)
            window.location.reload();
          }
        }
        else {
          pairs[0].style.backgroundColor = 'white';
          pairs[1].style.backgroundColor = 'white';
          pairs.length = 0;
        }
        clearInterval(id);
        console.log('cleared');
        console.log(pairs.length);
        for (let i = 0; i < tiles.length; i++) {
          tiles.item(i).style.pointerEvents = 'auto';
        }
      }, 1000)

    }
  }
  else {
    div.style.pointerEvents = 'none';
  }
}




// if (pairs.length == 2) {
//   for (let i = 0; i < tiles.length; i++) {
//     tiles.item(i).style.pointerEvents = 'none';
//   }
//   if (pairs[0].className == pairs[1].className) {
//     pairs.length = 0;
//   }
//   else {
//     const id = setTimeout(function() {
//       pairs[0].style.backgroundColor = 'white';
//       pairs[1].style.backgroundColor = 'white';
//       pairs.length = 0;
//     }, 1000)
//   }
// }
  
// if (pairs.length == 2) {
//   for (let i = 0; i < pairs.length; i++) {
//     if (pairs[0].className == pairs[1].className) {
//       pairs.length == 0;
//     }
//     else {
//       setTimeout(function() {
//         pairs[0].style.backgroundColor = 'white';
//         pairs[1].style.backgroundColor = 'white';
//         pairs.length == 0;

//       }, 1000)

//     }
//   }
// }
  


// when the DOM loads
createDivsForColors(shuffledColors);