
$(document).ready(function(){


var question1 = {

	question: "What is Leon's middle name?",
	answer: "Scott",
	possible: ["David","Scott","Sean","Auther"],
	boolean: [false,true,false,false],
		img: "assets/images/leon.jpg"


};

var question2 = {

	question: "What was the gun that was made for an antique collector?",
	answer: "Red 9",
	possible: ["Broken Butterfly","Scarbe","Blacktail","Red 9"],
	boolean: [false,false,false,true],
	img: "assets/images/red9.jpg"

};

var question3 = {

	question: "Who was Leon was trying to save?",
	answer: "The President's Daughter",
	possible: ["His Daughter","A Random stranger","The President's Daughter","His Dad"],
	boolean: [false,false,true,false],
	img: "assets/images/ash.jpg"

};

var question4 = {

	question: "What installment is Resident Evil 4 in the series?",
	answer: "6th",
	possible: ["6th","5th","4th","7th"],
	boolean: [true,false,false,false],
	img: "assets/images/timeline.png"


};

var question5 = {

	question: "Who is the main villain in the game",
	answer: "Osmund Saddler",
	possible: ["Jack Krauser","Verdugo","Ramon Salazar","Osmund Saddler"],
	boolean: [false,false,false,true],
	img: "assets/images/villian.jpg"

};

var question6 = {

	question: "What was the plague or disease called?",
	answer: "Plagas",
	possible: ["T-Virus","Plagas","Zombie","Z-Virus"],
	boolean: [false,true,false,false],
	img: "assets/images/plagas.jpg"

};


var stopwatch = {

    time: 5,
    hour_glass: "00:05",

    
    reset: function () {
        stopwatch.time = 5;
        
        console.log("Reset Time " , this.time);
        //counter = 0;
        //change the "display" div to "00:00"
          $(".info_panel").html(this.hour_glass);
        //empty the "laps" div

    },
    start: function(){
        //Use setInterval to start the count here
       counter = setInterval(stopwatch.count,1000);
       console.log("start :" , stopwatch.time);
       console.log("Counter: " , counter)

    },
    stop: function(){
        //Use clearInterval to stop the count here
        clearInterval(counter);

    },

    count: function(){
        //increment time by 1, remember we cant use "this" here
        stopwatch.time--;
        //Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable
        var hi = stopwatch.timeConverter(stopwatch.time);
        //Use the variable you just created to show the converted time in the "display" div
        $(".info_panel").html(hi);
  		//console.log("Count :" , stopwatch.time);

  		if (stopwatch.time == 0) {
  			times_up();
  		}


    },
    timeConverter: function(t){
        //This function is done. You do not need to touch it. It takes the current time in seconds and converts it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t/60);
        var seconds = t - (minutes * 60);
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        if (minutes === 0){
            minutes = "00";
        } else if (minutes < 10){
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};


function question_pick (){

	var turns = number_of_questions;

	console.log();

	if (turns > 0 ) {

		var rand = Math.floor(Math.random() * possible_questions.length);

		var rand_pick = possible_questions[rand];

		//console.log("Before Splice " , possible_questions);

		possible_questions.splice(rand , 1);

		//console.log("After Splice " , possible_questions);

		console.log("Rand is " , rand);
		console.log("rand_pick is " , rand_pick);

		

		console.log("Both: " , number_of_questions);

		number_of_questions--;

		console.log("Ather " ,number_of_questions);

		return rand_pick;



	} else {


		rounds();
		setTimeout(game_over_man_game_over , 2000 );

	}

}


function generate (rand_pick) {


	$(".question").html(rand_pick.question);

	for (var i = 0; i < rand_pick.possible.length; i++) {
		
		var guess_answer = $('<button>');
		guess_answer.addClass("options btn-group-lg btn btn-primary");
		guess_answer.attr({
			"data-boolean" : rand_pick.boolean[i]
		});

		guess_answer.text(rand_pick.possible[i]);
		//guess_answer.append(question1.possible[i]);

		$(".guess").append("<p>" + guess_answer.prop("outerHTML") + "</p>");


	}
	$(".question").html(rand_pick.question);
	$(".info_panel").html("Try to guess before the timer is done");
    stopwatch.start();
	check_answer();
}



function check_answer () {

	$(".options").on("click" , function(){

		var user_guess = $(this);
		user_check = user_guess.data("boolean");

		console.log(user_guess);
		console.log(user_check);

		if (user_check == true) {

			console.log("hey");
			right_answer();

		} else {
			console.log("bye");
			wrong_answer();
		}


	});

}

function game_over_man_game_over(){

	//$(".guess").html("Round One Done");

	stopwatch.stop();
	$(".panel-title").html("Round Done");

	$(".info_panel").html("<h2> Right Anwsers: " +  wins +"</h2>" + "<h2>  Wrong Anwser is: " +  wrongs +"</h2>");

	setTimeout(get_ready_for_action, 2000);


}

function get_ready_for_action(){

	if (num_rounds == total_rounds){

		possible_questions = [question4,question5,question6];
		number_of_questions = possible_questions.length;

		$(".guess").html("");
		stopwatch.reset();
		the_pick_is = question_pick();
		generate(the_pick_is);

	}

	else{

		$(".info_panel").html( "<h1>Final score" + "<h2> Right Anwsers: " +  wins +"</h2>" + "<h2>  Wrong Anwser is: " +  wrongs +"</h2>");

	}

}



function rounds(){

	num_rounds++;

	$(".info_panel").html("<h1> Round " + num_rounds + "</h1>");

	

}

function rinse_and_repeat(){

	$(".guess").html("");
	stopwatch.reset();
	the_pick_is = question_pick();
	generate(the_pick_is);


}

//$('#image-holder').html('<img src='+images[count]+ ' width="400px">');

function times_up (){

	$(".panel-title").html("Times up the answer was " + the_pick_is.answer);
	$(".info_panel").html("<img src=" + the_pick_is.img + " width='300px'>");
	console.log(the_pick_is.answer);

	//setTimeout($(".guess").html("") , 3000);
	stopwatch.stop();
	setTimeout(rinse_and_repeat , testing);

}


function right_answer(){

	$(".panel-title").html("Good Job " + the_pick_is.answer);
	$(".info_panel").html("<img src=" + the_pick_is.img + " width='300px'>");
	stopwatch.stop();
	wins++;
	setTimeout(rinse_and_repeat , testing);


}

function wrong_answer() {
	
	$(".panel-title").html("Wrong! " + the_pick_is.answer);
	$(".info_panel").html("<img src=" + the_pick_is.img + " width='300px'>");
	stopwatch.stop();
	wrongs++;
	setTimeout(rinse_and_repeat , testing);

}

var num_rounds = 0;
var total_rounds = 2;

var testing = 1000;

var possible_questions = [question1,question2,question3];

var number_of_questions = possible_questions.length;

var wins = 0;
var wrongs = 0;


var the_pick_is;


$(".start_btn").on("click" , function(){


	rounds();

	the_pick_is = question_pick();

	setTimeout(generate.bind(null , the_pick_is), 2000);

	
});







});