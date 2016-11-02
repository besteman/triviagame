$(document).ready(function(){



/**
 * Object to hold time of the countdown
 * It will append to the page the time
 * Handle the logic if the players runs out of time
 * @type {Object}
 */
var stopwatch = {

    time: 15,
    hour_glass: "00:15",

    
    reset: function () {

        stopwatch.time = 15;
        
          $(".info_panel").html(this.hour_glass);

    },
    start: function(){
  
       counter = setInterval(stopwatch.count,1000);

    },
    stop: function(){
  
        clearInterval(counter);

    },

    count: function(){

        stopwatch.time--;
 
        var hi = stopwatch.timeConverter(stopwatch.time);

        $(".info_panel").html(hi);

  		if (stopwatch.time == 0) {

  			times_up();

  		}


    },
    timeConverter: function(t){
     
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



/**
 * Will pick a random question from the possible question array
 * @return {Object of the Question}
 */
function question_pick (){

	var turns = number_of_questions;

	if (turns > 0 ) {

		var rand = Math.floor(Math.random() * possible_questions.length);

		var rand_pick = possible_questions[rand];

		possible_questions.splice(rand , 1);

		number_of_questions--;

		return rand_pick;

	} else {

		rounds();

		setTimeout(game_over_man_game_over , 2000 );

	}

}


/**
 * Will take the question pick and append it to the page
 * @param  {Object} rand_pick Object of the question
 * @return {None}           Will go to the function check answer after completion
 */
function generate (rand_pick) {

	$(".question").html(rand_pick.question);

	for (var i = 0; i < rand_pick.possible.length; i++) {
		
		var guess_answer = $('<button>');
		guess_answer.addClass("options btn-group-lg btn btn-primary");
		guess_answer.attr({
			"data-boolean" : rand_pick.boolean[i]
		});

		guess_answer.text(rand_pick.possible[i]);

		$(".guess").append("<p>" + guess_answer.prop("outerHTML") + "</p>");

	}

	$(".question").html(rand_pick.question);

	$(".info_title").html("Try to guess before the timer is done");

    stopwatch.start();

	check_answer();

}


/**
 * Will check if the user selected the right or wrong answer
 * @return {None} Will go to the right answer or wrong answer function base of the user this
 */
function check_answer () {

	$(".options").on("click" , function(){

		var user_guess = $(this);
		user_check = user_guess.data("boolean");

		if (user_check == true) {

			$(".guess").html("");
			right_answer();

		} else {
			$(".guess").html("");
			wrong_answer();
		}


	});

}


/**
 * Stops the stopwatch and html to the screen the total score
 * @return {None} Will go to the get ready for action function
 */
function game_over_man_game_over(){

	stopwatch.stop();

	$(".info-title").html("Round Done");

	$(".info_panel").html("<h2> Right Anwsers: " +  wins +"</h2>" + "<h2>  Wrong Anwser is: " +  wrongs +"</h2>");

	setTimeout(get_ready_for_action, 2000);

}


/**
 * Reset the variables for the second round
 * @return {None} Will go to generate function or the rounds function base of the number if rounds played
 */
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

		rounds();

	}

}


/**
 * Sees the number of rounds 
 * @return {None} Will html to the screen the final score if game is done or tells the user the round number
 */
function rounds(){

	if (num_rounds == 3) {

		$(".info_title").html("<h1>Game Done</h1>");

		$(".info_panel").html( "<h1>Final score" + "<h2> Right Anwsers: " +  wins +"</h2>" + "<h2>  Wrong Anwser is: " +  wrongs +"</h2>");

	} else {

		num_rounds++;

		$(".info_panel").html("<h1> Round " + num_rounds + "</h1>");

	}

}


/**
 * Will get the next questions ready in between rounds
 * @return {None} Will go the generate function
 */
function rinse_and_repeat(){

	$(".guess").html("");

	stopwatch.reset();

	the_pick_is = question_pick();

	generate(the_pick_is);


}


/**
 * Handles the logic for if the user runs out of time 
 * @return {None} Calls rinse and repeat 
 */
function times_up (){

	$(".info-title").html("Times up the answer was " + the_pick_is.answer);

	$(".info_panel").html("<img src=" + the_pick_is.img + " width='300px'>");

	stopwatch.stop();

	setTimeout(rinse_and_repeat , testing);

}


function right_answer(){

	$(".info-title").html("Good Job! It was        " + the_pick_is.answer);

	$(".info_panel").html("<img src=" + the_pick_is.img + " width='300px'>");

	stopwatch.stop();

	wins++;

	setTimeout(rinse_and_repeat , testing);

}


/**
 * Handles logic if the user selects the wrong answer
 * @return {None} Calls rinse and repeat 
 */
function wrong_answer() {
	
	$(".info-title").html("Wrong! The answer was       " + the_pick_is.answer);

	$(".info_panel").html("<img src=" + the_pick_is.img + " width='300px'>");

	stopwatch.stop();

	wrongs++;

	setTimeout(rinse_and_repeat , testing);

}


var testing = 5000;


$(".reset").on("click" , function (){

	location.reload();

});



/**
 * Starts the game duh
 * @return {None} Calls rounds then generate
 */
function start (){


	$(".start_btn").on("click" , function(){

		wins = 0;

		wrongs = 0;

		possible_questions = [question1,question2,question3];

		number_of_questions = possible_questions.length;

		num_rounds = 0;
		total_rounds = 2;

		rounds();

		the_pick_is = question_pick();

		setTimeout(generate.bind(null , the_pick_is), 2000);

	});

}


start();

});