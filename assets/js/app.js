/* 
GAME STRUCTURE:
===============
01. The game starts when the player hits the START button.
02. Once the game starts the is a clock countdown.
03. The time given is the total time to finish the whole game.
04. The game ends if the time runs out, Game Over.
05. The player can only guess one answer per question.
06. Include the timer so the player can see it.
07. All the questions are displayed at once.
08. There is a DONE button at the end, if the user is finished before the timer stops.
*/

//IMPORTANT!
$(document).ready(function(){

// GLOBAL VARIABLES
// ================

	//Define all global variables and objects
	var currentQuestion; 
	var correctAnswer; 
	var incorrectAnswer; 
	var unanswered; 
	var seconds; 
	var time; 
	var answered; 
	var userSelect;
	var messages = {
		correct: "恭喜你答对了！赞美太阳！",
		incorrect: "That's not the right answer." + "<br>" + '"No. No. It Okay. Don\'t Be Cry"',
		endTime: "Looks like you ran out of time!" + "<br>" + "But... It's never too late, it's never too late for now!",
		finished: "感谢参加敏捷领导力基础知识测试挑战。"
	};

	//All questions inside an array of objects
	var triviaQuestions = [
		{	question: "Scrum Master 参与 Daily Scrum的主要原因是？（选择最佳答案）",
			answerList: [	
						"A. 确保所有团队成员都回答了“那三个问题”。",
						"B. 收集状态与进度信息以报告管理层。",
						"C. 他/她其实没有必要到场；但他/她需要确保开发团队有进行 Daily Scrum 仪式。",
						"D. 记录下所有冲刺挤压表中的所有变更，包括新增的内容，并追踪燃尽图的状态。"
						],
			answer: 2,
			image: "assets/images/Q1_Kenneth.gif",
			answerText: "Scrum Master所要保障的是————开发团队成员在24小时内完成至少一次Daily Scrum仪式。"
		},
	];


// FUNCTIONS
// =========

	//This hides the game area on page load
	$("#gameCol").hide();
	
	//This captures user click on start button to create a new game
	$("#startBtn").on("click", function(){
		$(this).hide();
		newGame();
	});

	//This captures the user's click on the reset button to create a new game
	$("#startOverBtn").on("click", function(){
		$(this).hide();
		newGame();
	});

	//This function sets up the page for a new game emptying all areas and showing game area
	function newGame(){
		$("#gameCol").show();
		$("#finalMessage").empty();
		$("#correctAnswers").empty();
		$("#incorrectAnswers").empty();
		$("#unanswered").empty();
		$("#gif").hide();
		$("#gifCaption").hide();
		currentQuestion = 0;
		correctAnswer = 0;
		incorrectAnswer = 0;
		unanswered = 0;
		newQuestion();
	}

	//This function displays the next question
	function newQuestion(){
		$("#message").empty();
		$("#correctedAnswer").empty();
		$("#gif").hide();
		$("#gifCaption").hide();
		answered = true;
		
		//This function displays the new question
		$("#currentQuestion").html("答题进度 " + (currentQuestion+1) + " of " + triviaQuestions.length);
		$(".question").html(triviaQuestions[currentQuestion].question);

		//This function displays the new questions's answer options in multiple choice type
		for(var i = 0; i <= 5; i++){

			var choices = $("<div>");
			choices.text(triviaQuestions[currentQuestion].answerList[i]);
			choices.attr({"data-index": i });
			choices.addClass("thisChoice");
			$(".answerList").append(choices);
		}

		//This sets the timer
		countdown();

		//When user clicks on n answer this will pause the time and display the correct answer to the question 
		$(".thisChoice").on("click",function(){
				userSelect = $(this).data("index");
				clearInterval(time);
				answerPage();
			});
		}

	//This function is for the timer countdown
	function countdown(){
		seconds = 10;
		$("#timeLeft").html("00:" + seconds);
		answered = true;
		//Sets a delay of one second before the timer starts
		time = setInterval(showCountdown, 1000);
	}

	//This function displays the countdown
	function showCountdown(){
		seconds--;

		if(seconds < 10) {
			$("#timeLeft").html("00:0" + seconds);	
		} else {
			$("#timeLeft").html("00:" + seconds);	
		}
		
		if(seconds < 1){
			clearInterval(time);
			answered = false;
			answerPage();
		}
	}

	//This function takes the user to the answer page after the user selects an answer or timer runs out
	function answerPage(){
		$("#currentQuestion").empty();
		$(".thisChoice").empty(); //Clears question page
		$(".question").empty();
		$("#gif").show();
		$("#gifCaption").show();

		var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
		var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

		//This adds the gif that corresponds to this quesiton
		var gifImageLink = triviaQuestions[currentQuestion].image;
		var newGif = $("<img>");
		newGif.attr("src", gifImageLink);
		newGif.addClass("gifImg");
		$("#gif").html(newGif);

		//STILL TO DO
		//This adds a line of text below the gif that talks about why the answer is correct.
		var gifCaption = triviaQuestions[currentQuestion].answerText;
			newCaption = $("<div>");
			newCaption.html(gifCaption);
			newCaption.addClass("gifCaption");
			$("#gifCaption").html(newCaption);
		
		//This checks to see if user choice is correct, incorrect, or unanswered
		if((userSelect == rightAnswerIndex) && (answered === true)){
			correctAnswer++;
			$('#message').html(messages.correct);
		} else if((userSelect != rightAnswerIndex) && (answered === true)){
			incorrectAnswer++;
			$('#message').html(messages.incorrect);
			$('#correctedAnswer').html('正确答案： ' + rightAnswerText);
		} else{
			unanswered++;
			$('#message').html(messages.endTime);
			$('#correctedAnswer').html('正确答案：' + rightAnswerText);
			answered = true;
		}
		
		if(currentQuestion == (triviaQuestions.length-1)){
			setTimeout(scoreboard, 6000);
		} else{
			currentQuestion++;
			setTimeout(newQuestion, 6000);
		}	
	}

	//This fucntion displays all the game stats
	function scoreboard(){
		$('#timeLeft').empty();
		$('#message').empty();
		$('#correctedAnswer').empty();
		$('#gif').hide();
		$("#gifCaption").hide();

		$('#finalMessage').html(messages.finished);
		$('#correctAnswers').html("回答正确: " + correctAnswer);
		$('#incorrectAnswers').html("回答错误: " + incorrectAnswer);
		$('#unanswered').html("没有回答: " + unanswered);
		$('#startOverBtn').addClass('reset');
		$('#startOverBtn').show();
		$('#startOverBtn').html("再次挑战");
	}

// MAIN PROCESS
//=============

}); //IMPORTANT!