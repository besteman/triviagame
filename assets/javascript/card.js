

/*I give you an array with 51 cards. Each card contains two properties: the suite, and the title (a string of either a number or a ranking: king, ace, so on).
Fifty-two cards form a deck. But I gave you 51. One is missing! How do you find it?
Try to come up with the most efficient steps to solve this.
Hint: Using a for loop against an array of values is not the most efficient solution--what if the cards aren't sorted?*/


array = ["heart 7" , "spades 2" , "diamonds 3" , "clubs 3"];

helper = [2,3,4,5,6,7,8,9,10, "jack" , "queen" , "king" , "ace"];

spades [];
heart = [];
clubs = [];
diamonds = [];


for (var i = 0; i < array.length; i++) {
	
	if (arr.charAt(0) == "s")
		spades.push[i];

	if (arr.charAt(0) == "h")
		heart.push[i];

	if (arr.charAt(0) == "c")
		clubs.push[i];

	if (arr.charAt(0) == "d")
		diamonds.push[i];

}

if (spades.length == 12){

	find(spades);

}

if (heart.length == 12){


	find(heart);

}

if (clubs.length == 12){


	find(clubs);

}

if (diamonds.length == 12){


	find(diamonds);

}




function find(suit) {

	var number = [];

	var suit_type = suit[0];

	for (var i = 0; i < suit.length; i++) {
		
		if (suit[i] == ""){

			number[i + 1];

		}

	}

	var idx = array.indexOf(helper);

	while (idx != -1) {

	  indices.push(idx);

	  idx = array.indexOf(element, idx + 1);

	}

	console.log("The missing card is : " + suit_type + idx);

}