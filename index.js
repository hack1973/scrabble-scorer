const input = require('readline-sync');
let scoringSelection = null;

// Here is the oldPointStructure object:
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

let newPointStructure = {};
transform(oldPointStructure);

// Create your scoringAlgorithms array here:
let scrabbleObject = {name:'Scrabble', description:'The traditional scoring algorithm.', scoreFunction:scrabble};

let simpleScoreObject = {name:'Simple Score', description:'Each letter is worth 1 point.', scoreFunction:simpleScore};

let bonusVowelsObject = {name:'Bonus Vowels', description:'Vowels are 3 pts, consonants are 1 pt.', scoreFunction:bonusVowels};

let scoringAlgorithms = [scrabbleObject, simpleScoreObject,bonusVowelsObject];

// Code your transform function here:
function transform(oldPointStructure) {
  for (eachScore in oldPointStructure) {
    for (let i=0;i<oldPointStructure[eachScore].length;i++) {
      let newValue = oldPointStructure[eachScore][i];
      newPointStructure[newValue.toLowerCase()]= Number(eachScore);
    }
  }
}

function scrabble(word,newPointStructure) {
  let wordArray = word.toLowerCase().split('');
  let score = 0;
  for (let i=0;i<wordArray.length;i++) {
    let letter = wordArray[i];
    score = score + newPointStructure[letter];
  }
  return score;
}

function simpleScore(word) {
  let score = word.length;
  return score;
}

function bonusVowels(word) {
  let wordArray = word.toLowerCase().split('');
  let score = 0;
  for (let i=0;i<wordArray.length;i++) {
    let letter = wordArray[i];
    if (letter === "a" || letter === "e" || letter === "i" || letter === "o" || letter === "u") {
      score = score + 3;
    } else {
      score = score + 1;
    }
  }
  return score;
}

function initialPrompt() {
  console.log(`Welcome to the Scrabble score calculator!\n\nWhich scoring algorithm would you like to use?\n\n0 - Scrabble: The traditional scoring algorithm.\n1 - Simple Score: Each letter is worth 1 point.\n2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.\n\n`);
  scoringSelection = input.question("Enter 0, 1, or 2: ");

  console.log(`\n\nUsing algorithm: ${scoringAlgorithms[scoringSelection].name}`);

  let usersWord = "";

  while (usersWord.toLowerCase() !== "stop" ) {
    usersWord = input.question("\n\nEnter a word to be scored, or 'Stop' to quit: ");
    console.log(`Score for '${usersWord}': ${scoringAlgorithms[scoringSelection].scoreFunction(usersWord,newPointStructure)}`);
  }
}

// Code your runProgram function here:
function runProgram(scoringAlgorithms) {
  initialPrompt();
}

// Call the runProgram function here:
runProgram();