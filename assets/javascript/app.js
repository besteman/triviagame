
$(document).ready(function(){


var stopwatch = {

    time: 3,
    hour_glass: "00:30",

    
    reset: function () {
        stopwatch.time = 3;
        
        //change the "display" div to "00:00"
          $(".counter").html(hour_glass);
        //empty the "laps" div

    },
    start: function(){
        //Use setInterval to start the count here
       counter = setInterval(stopwatch.count,1000);
       console.log("start :" , stopwatch.time);

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
        $(".counter").html(hi);
  		console.log("Count :" , stopwatch.time);

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




var question1 = {

	question: "What is 4 divided by 4?",
	answer: "1",
	possible: [1,2,3,4],
	boolean: [true,false,false,false]

};

var question2 = {

	question: "What is 4 times 1?",
	answer: "4",
	possible: [1,2,3,4],
	boolean: [false,false,false,true]

};

var question3 = {

	question: "What is 4 minus 1?",
	answer: "3",
	possible: [1,2,3,4],
	boolean: [false,false,true,false]

};

var possible_questions = [question1,question2,question3];

function generate () {

	$(".question").html(question1.question);

	for (var i = 0; i < question1.possible.length; i++) {
		
		var guess_answer = $('<button>');
		guess_answer.addClass("options btn-group-lg");
		guess_answer.attr({
			"data-boolean" : question1.boolean[i]
		});

		guess_answer.text(question1.possible[i]);
		//guess_answer.append(question1.possible[i]);

		$(".guess").append("<p>" + guess_answer.prop("outerHTML") + "</p>");

	}
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

function times_up (){

	$(".guess").html("<p>You are out of time</p>" + question1.answer);	
	stopwatch.reset();

}

function right_answer(){

	$(".guess").html("You got it right");

}

function wrong_answer() {
	
	$(".guess").html("<p>You got it wrong son</p>" + question1.answer);	

}

/* var counter = $(".counter");

function update() {
    var myTime = $(".counter").html();
    var ss = myTime.split(":");
    var dt = new Date();
    dt.setHours(0);
    dt.setMinutes(ss[0]);
    dt.setSeconds(ss[1]);

    var dt2 = new Date(dt.valueOf() - 1000);
    var temp = dt2.toTimeString().split(" ");
    var ts = temp[0].split(":");

    $(".counter").html(ts[1]+":"+ts[2]);
    setTimeout(update, 1000);
}

setTimeout(update, 1000);*/

//$(".counter").click(counter.start);

//stopwatch.start();
generate();

check_answer();





});