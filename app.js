//require constructors
var flashcards = require("./flashcards.js");
//require inquirer
var inquirer = require("inquirer");
//require basic flash card questions and answers
var basicQuestions = require("./basicQuestions.json");
//require cloze flash card full text and cloze
var clozeQuestions = require("./clozeQuestions.json");

//construct Basic Questions array
var basicQuestionsArray = [];
for (var i = 0; i < basicQuestions.basicQuestions.length; i++) {
	var basicObject =  flashcards.BasicCard(basicQuestions.basicQuestions[i].question, basicQuestions.basicQuestions[i].answer);
	basicQuestionsArray.push(basicObject);
}

//construct Cloze flashcard array
var clozeFlashCardArray = [];
for (var i = 0; i < clozeQuestions.clozeQuestions.length; i++) {
	var clozeObject = flashcards.ClozeCard(clozeQuestions.clozeQuestions[i].fullText, clozeQuestions.clozeQuestions[i].cloze);
	clozeFlashCardArray.push(clozeObject);
}

var counter = 0;	

inquirer.prompt([

  // Create a basic text prompt.
  {
    type: "input",
    message: "What is your name?",
    name: "name"
  },

    // Give the user a list to choose which flash cards to use.
  {
    type: "list",
    message: "What type of flashcards do you want to use?",
    choices: ["Basic Flashcards", "Cloze Flashcards"],
    name: "flashcards"
  },

  // User confirmation.
  {
    type: "confirm",
    message: "Are you sure:",
    name: "confirm",
    default: true
  }
]).then(function(user) {
	if(user.confirm) {
		
		if(user.flashcards === "Basic Flashcards") {
			displayBasicFlashCard();
		}
		if(user.flashcards === "Cloze Flashcards") {
			displayClozeFlashCard();
		}
	}
});

var displayBasicFlashCard = function() {
	if (counter < basicQuestionsArray.length) {
		inquirer.prompt([
			{
				type: "input",
				message : basicQuestionsArray[counter].front,
				name: "answer"
			}
		]).then(function(answered) {
			console.log("Your answer: " + answered.answer);
			console.log("Correct answer: " + basicQuestionsArray[counter].back);
			counter++;
			displayBasicFlashCard();
		});
	} else {
		inquirer.prompt([
			{
				type: "confirm",
				message: "Studied all flashcards, would you like to study them again?",
				name: "confirm",
				default: true
			}
		]).then(function(user) {
			if (user.confirm) {
				counter = 0;
				console.log(counter);
				displayBasicFlashCard();
			} else {
				console.log("Go out and play!");
			}
		});
	}
}

var displayClozeFlashCard = function() {
	if (counter < clozeFlashCardArray.length) {
		inquirer.prompt([
			{
				type: "input",
				message : clozeFlashCardArray[counter].partial(),
				name: "answer"
			}
		]).then(function(answered) {
			console.log("Your answer: " + answered.answer);
			console.log("Complete answer: " + clozeFlashCardArray[counter].fullText());
			counter++;
			displayClozeFlashCard();
		});
	} else {
		inquirer.prompt([
			{
				type: "confirm",
				message: "Studied all flashcards, would you like to study them again?",
				name: "confirm",
				default: true
			}
		]).then(function(user) {
			if (user.confirm) {
				counter = 0;
				displayClozeFlashCard();
			} else {
				console.log("Go out and play!");
			}
		});
	}
}


