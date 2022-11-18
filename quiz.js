// variables to keep track of quiz state
var currentQuestionIndex = 0;
console.log(quizQuestions.length);
var time = quizQuestions.length * 15;
console.log(time);
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById('quizQuestions');
var timerEl = document.getElementById('timer');
var choicesEl = document.getElementById('answerChoices');
var submitBtn = document.getElementById('submitInitials');
var startBtn = document.getElementById('startQuiz');
var initialsEl = document.getElementById('initials');

function beginQuiz() {
  // hide and unhide initial screen
  var startScreenEl = document.getElementById('initialDisplay');
  startScreenEl.setAttribute('class', 'hide');

 
  
 //questionsEl.removeAttribute('class');
 // start timer
 timerId = setInterval(clockTick, 1000);
   // show starting time
   timerEl.innerText = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = quizQuestions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById('questionNumber');
  titleEl.textContent = currentQuestion.question;

  // clear out any old question choices
  choicesEl.innerHTML = '';

  // loop over choices
  for (var i = 0; i < currentQuestion.answers.length; i++) {
    // create new button for each choice
    var choice = currentQuestion.answers[i];
    var choiceBtn = document.createElement('button');
    choiceBtn.setAttribute('class', 'answers');
    choiceBtn.setAttribute('value', choice);

    choiceBtn.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesEl.appendChild(choiceBtn);
  }
}

function questionClick(event) {
  var buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches('.answers')) {
    return;
  }

  // check if user guessed wrong
  if (buttonEl.value !== quizQuestions[currentQuestionIndex].correctAnswer) {
    // takes away 15 seconds for every wrong answer
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
  }
  else{
    return;
  }
  //moves onto next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (time <= 0 || currentQuestionIndex === quizQuestions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById('endDisplay');
  endScreenEl.removeAttribute('class');

  // show final score
  var finalScoreEl = document.getElementById('finalScore');
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute('class', 'hide');
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== '') {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = 'scores.html';
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// user clicks button to start quiz
startBtn.onclick = beginQuiz;
//startBtn.addEventListener("click", beginQuiz);


// user clicks button to submit initials
submitBtn.onclick = saveHighscore;
//submitBtn.addEventListener("click", saveHighscore);



// user clicks on element containing choices
choicesEl.onclick = questionClick;
choicesEl.addEventListener("click", questionClick);

//initialsEl.onkeyup = checkForEnter;

    



