//scope-safe constructor for basic flash cards
function BasicCard(front, back) { 
  if (!(this instanceof BasicCard)) { 
    return new BasicCard(front, back);
  }
  this.front = front;
  this.back = back;
}
//scope-safe constructor for cloze flash cards
function ClozeCard(text, cloze) { 
  if (!(this instanceof ClozeCard)) { 
    return new ClozeCard(text, cloze);
  }
  this.text = text;
  this.cloze = cloze;
}

//prototype function to return the cloze portion of the flash card to the console
ClozeCard.prototype.clozeText = function() {
	return this.cloze;
}

//prototype function to return the partial text portion of the flash card to the console
ClozeCard.prototype.partial = function() {
	var completeText = this.text;
	if (completeText.includes(this.cloze)) {
		return completeText.replace(this.cloze, "...");
	} else {
		var error = "Cloze not found in text, try again"
		return error;
	}
}

//prototype function to return the full text of the flash card to the console
ClozeCard.prototype.fullText = function() {
	return this.text;
}

//var firstPresident = BasicCard("Who was the first president of the United States?", "George Washington");

//var firstPresidentCloze = ClozeCard("George Washington was the first president of the United States.", "George Washington");

//console.log(firstPresidentCloze.fullText());

//console.log(firstPresidentCloze.clozeText());

//console.log(firstPresidentCloze.partial());

//var brokenCloze = ClozeCard("This doesn't work", "oops");

//console.log(brokenCloze.partial());

//module.exports.BasicCard = BasicCard;
//module.exports.ClozeCard = ClozeCard;

module.exports = {
  BasicCard: BasicCard, 
  ClozeCard: ClozeCard
}

// window === global