//require constructors
var flashcards = require("./flashcards.js");
//require inquirer
var inquirer = require("inquirer");
//require basic flash card questions and answers
var basicQuestions = require("./basicQuestions.json");

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
	}
});

var displayBasicFlashCard = function() {
	if (counter < basicQuestions.basicQuestions.length) {
		inquirer.prompt([
			{
				type: "input",
				message : basicQuestions.basicQuestions[counter].question,
				name: "answer"
			}
		]).then(function(answered) {
			console.log("Your answer:" + answered.answer);
			console.log("Correct answer:" + basicQuestions.basicQuestions[counter].answer)
		});
		counter++;
		displayBasicFlashCard();
	}
}

//console.log(basicQuestions.basicQuestions.length);
