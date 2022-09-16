//start
var startQuiz = document.querySelector("#Start");
var timer = document.querySelector("#timer");
var secondsRemaining = 60;
var questionDisplay = document.querySelector("#quizQuestions");
var ans1Btn = document.querySelector("#ans1");
var ans2Btn = document.querySelector("#ans2");
var ans3Btn = document.querySelector("#ans3");
var ans4Btn = document.querySelector("#ans4");
let questionNumber = 0;
// Questions and answers in an array of objets
const quizQuestions = [
   { question: "Commonly used data types do NOT include:",
     answers: ["1. Strings", "2. Booleans","3. alerts", "4. numbers"],
     correctAnswer: "2"
    },
    { question: "The condition in an if/else statement is enclosed with ______.",
     answers: ["1. Quotes", "2. curly brackets", "3.parenthesis", "4. square brackets"],
     correctAnswer: "2"
    },
    { question: "Arrays in JavaScript can be used to store_________.",
      answers:["1. numbers and strings", "2. other arrays", "3. booleans","4. all of the above"],
      correctAnswer: "3"
    },
    { question: "String values must be enclosed within_________ when being assigned to variables.",
      answers: ["1. commas", "2. curly brackets","3. quotes", "4. parenthesis"],
      correctAnswer: "2"
    },

    { question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console log"],
      correctAnswer: "3"
    }];

    
    //this function iterates the array of objects to go through each question and answer


 //timer
 startQuiz.addEventListener("click", function(){
var timeInterval = setInterval(function() {
    secondsRemaining--;
   
    if (secondsRemaining <= 0) {
     		clearInterval(timeInterval);
      	$('#timer').html("<h3>Count down complete</h3>");  
        return;
    }else{
    	$('#time').text(secondsRemaining);
      console.log("Timer --> " + secondsRemaining);
    }

    
}, 1000);
function setQuestion(id) {
    if (id < quizQuestions.length) {
        questionDisplay.textContent = quizQuestions[id].question;
        ans1Btn.textContent = quizQuestions[id].answers[0];
        ans2Btn.textContent = quizQuestions[id].answers[1];
        ans3Btn.textContent = quizQuestions[id].answers[2];
        ans4Btn.textContent = quizQuestions[id].answers[3];
    }
}

startQuiz.addEventListener("click", setQuestion);
setQuestion(questionNumber);
 
ans1Btn.style.display= block;
    
 });
