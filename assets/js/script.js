
var myQuestions = [
    {
      question: "What does CSS stand for?",
      answerChoices: ["Cascading Style Sheets", "Class Style Sheet", "Clear Style Structure"],
      correctAnswer: "Cascading Style Sheets"
    },
    {
      question: "Which command do you need to execute to upload content on GitHub?",
      answerChoices: ["`Git pull`", "`Git push`", "`Git add -A`", "`Git commit -m`"],
      correctAnswer: "`Git push`"
    },
    {
      question: "A header element in a HTML file is written like ___ .",
      answerChoices: ["<header/><header>", "</header><header>", "<header></header>", "</header/>"],
      correctAnswer: "<header></header>"
    },
    {
      question: "What is used to iterate a block of code?",
      answerChoices: ["An object", "A `for Loop`", "An array", "`concat()`"],
      correctAnswer: "A `for Loop`"
    },
    {
      question: "What does the `concat()` method do?",
      answerChoices: ["It removes the last element of an array", "It converts a string to uppercase letters", "It adds new items to the beginning of an array", "It joins 2 arrays"],
      correctAnswer: "It joins 2 arrays"
    }
  ];


var questionContainer = document.querySelector(".question");
var answerContainer = document.querySelector(".answer");
var button = document.querySelector(".start-button");
var timer = document.querySelector(".timer-count");
var createUlEl = document.querySelector(".ulList");
var solutionContainer = document.getElementById("solution");
var subContainer = document.querySelector(".quiz-box");
var mainContainer = document.querySelector(".main-container");
var header = document.querySelector("header");
var body = document.querySelector("body");
var btnHighscore = document.querySelector(".view-score");
var headerPEl = document.querySelector(".p-Element");

var timerCount = 60;
var timePenalty = -10;
var timerInterval;
var timeEnd = 0;
var index = 0;
var score = 0;

function renderQuiz () {

  questionContainer.setAttribute("class", "question-start");
  answerContainer.setAttribute("class", "answer-start");
  
  questionContainer.textContent = "";
  createUlEl.textContent = "";

  for (var i = 0; i < myQuestions.length; i++){

    var addQuestion = myQuestions[index].question;
    var addChoices = myQuestions[index].answerChoices;
    questionContainer.textContent = addQuestion;
  }
   
  addChoices.forEach(function (newInput){
    var listEl = document.createElement("li");
    listEl.textContent = newInput;
    createUlEl.appendChild(listEl);
    listEl.addEventListener("click", result);
  })
}
 
function result(event){
  listEl = event.target;
  solutionContainer.setAttribute("class", "solution-container")


    if (listEl.textContent == myQuestions[index].correctAnswer){
      score++; 
      solution.textContent = "Correct! The answer is " +  myQuestions[index].correctAnswer;
    } else {
      timerCount = timerCount + timePenalty;
      solution.textContent = "Wrong! The right answer is " +  myQuestions[index].correctAnswer;
    }

    if (index === 4){
      timerCount = 0; //stop timer count
      showEndScreen();
      return;
    } else {
      index++;
      renderQuiz();
      return;
    }
}

function removeFunction() {
    
    button.remove();
    headerPEl.remove();

    timer.textContent = timerCount;
    renderQuiz();
    startTimer();
}

function startTimer() {
  
    timerInterval = setInterval(function() {
        timerCount--;
        timer.textContent = timerCount;

        if (timerCount === 0){
            clearInterval(timerInterval);
            showEndScreen(); //stop timer count
            return;
        }   
    },1000);

}

function showEndScreen (){
  header.remove();
  subContainer.remove();

  var pEl = document.createElement("p");
  pEl.setAttribute("class", "p-Element")
  var formEl = document.createElement("form");
  var labelElName = document.createElement("label");
  var inputElName = document.createElement("input");
  var labelElLastName = document.createElement("label");
  var inputElLastName = document.createElement("input");
  var submitEl = document.createElement("input");
  var hEl = document.createElement("h1");

  mainContainer.setAttribute("class", "container-main");
  
  hEl.textContent = "Time is over!";
  hEl.setAttribute("class", "header-submit")
  
  labelElName.setAttribute("for", "fname");
  labelElName.textContent = "First name:";
  labelElName.setAttribute("class", "label"); 

  inputElName.setAttribute("type", "text");
  inputElName.setAttribute("id", "fname");
  inputElName.setAttribute("name", "fname");
  inputElName.setAttribute("class", "name-Input")

  labelElLastName.setAttribute("for", "lname");
  labelElLastName.textContent = "Last name:";
  labelElLastName.setAttribute("class", "label");

  inputElLastName.setAttribute("type", "text");
  inputElLastName.setAttribute("id", "lname");
  inputElLastName.setAttribute("name", "lname");
  inputElLastName.setAttribute("class", "lastName-Input");

  submitEl.setAttribute("type", "submit");
  submitEl.setAttribute("value", "Submit");
  submitEl.setAttribute("class", "submit-btn");

  pEl.textContent = "Your final score is: " + score + "/5";

  formEl.appendChild(labelElName);
  formEl.appendChild(inputElName);
  formEl.appendChild(labelElLastName);
  formEl.appendChild(inputElLastName);
  formEl.appendChild(submitEl);
  
  mainContainer.appendChild(hEl);
  mainContainer.appendChild(pEl);
  mainContainer.appendChild(formEl);

  submitEl.addEventListener("click", saveData);
}

function saveData (event) {
    submitEl = event.target;
    event.preventDefault();

    var name = document.querySelector(".name-Input").value;
    var lastName = document.querySelector(".lastName-Input").value;

    if (name == "") {
      alert("You must enter a name!")
    } else if (lastName == ""){
      alert("You must enter a last name!")
    } else {
      var finalScore = {
        fname: name,
        laName: lastName,
        scoreData: score
      }

      var allScores = localStorage.getItem("allScores");
      if (allScores === null){
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);

      showHighscore();

    }
  }

function showHighscore () {
  mainContainer.remove();
  header.remove();

  var highScoreHeader = document.createElement("h1");
  highScoreHeader.setAttribute("class", "header-highscore")
  var btnWebpage = document.createElement("button");
  var btnClearScore = document.createElement("button");
  var ulElCreate = document.createElement("ul");
  ulElCreate.setAttribute("class", "ul-score")

  btnWebpage.setAttribute("type", "button");
  btnWebpage.setAttribute("id", "button-goBack");
  btnWebpage.textContent = "Go Back";

  btnClearScore.setAttribute("type", "button");
  btnClearScore.setAttribute("id", "button-clear");
  btnClearScore.textContent = "Clear Highscores"

  highScoreHeader.textContent = "Last 5 Games"

  var allScores = localStorage.getItem("allScores");
  allScores = JSON.parse(allScores);

  document.body.appendChild(highScoreHeader);

    if (allScores !== null){

      for (var i = 0; i <allScores.length; i++){
        var liElCreate = document.createElement("li");
        liElCreate.textContent = allScores[i].scoreData + "/5" + " " + allScores[i].fname + " " + allScores[i].laName;
        ulElCreate.appendChild(liElCreate);
        liElCreate.setAttribute("class", "score-list-el")
      }
    }
    
  document.body.appendChild(ulElCreate);
  document.body.appendChild(btnWebpage);
  document.body.appendChild(btnClearScore);
  
  btnWebpage.addEventListener("click", showWebpage);
  btnClearScore.addEventListener("click", clearScore);
}

function clearScore(event){
  btnHighscore = event.target;
  localStorage.clear();
  location.reload();
}

function showWebpage(){
  location.reload();
}

btnHighscore.addEventListener("click", showHighscore);
button.addEventListener("click", removeFunction);
