
//Array with objects defining all questions, answer choices and correct answers
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

//Global variables (static HTML elements)
var questionContainer = document.querySelector(".question");
var answerContainer = document.querySelector(".answer");
var buttonStart = document.querySelector(".start-button");
var timer = document.querySelector(".timer-count");
var createUlEl = document.querySelector(".ulList");
var solutionContainer = document.getElementById("solution");
var subContainer = document.querySelector(".quiz-box");
var mainContainer = document.querySelector(".main-container");
var header = document.querySelector("header");
var body = document.querySelector("body");
var btnHighscore = document.querySelector(".view-score");
var headerPEl = document.querySelector(".p-Element");

//Global variables used in more functions
var timerCount = 60;
var timePenalty = -10;
var timerInterval;
var index = 0;
var score = 0;

//When start button clicked, button and p element in header gets removed.
function removeFunction() {
    
    buttonStart.remove();
    headerPEl.remove();
    
    //When buttonStart click event is executed, the timer will be set to 60 and renderQuiz() and startTimer() will be executed.
    timer.textContent = timerCount;
    renderQuiz();
    startTimer();
}

//When timer set to 60 this function will set an interval which so every second the timerCount will be substracted by 1.
function startTimer() {
  
    timerInterval = setInterval(function() {
        timerCount--;
        timer.textContent = timerCount;

        //If the timer is 0 the substrction will stop and browser will go to submit form screen
        if (timerCount === 0){
            clearInterval(timerInterval);
            showEndScreen(); 
            return;
        }   
    },1000);
}

//When the remove function gets executed, the questions and answers will be displayed.
function renderQuiz () {

  questionContainer.setAttribute("class", "question-start");
  answerContainer.setAttribute("class", "answer-start"); //Set Attributes to style container in css
  
  questionContainer.textContent = "";
  createUlEl.textContent = "";

  //Add a for loop to render all questions & the answer choices
  for (var i = 0; i < myQuestions.length; i++){

    var addQuestion = myQuestions[index].question;
    var addChoices = myQuestions[index].answerChoices;
    questionContainer.textContent = addQuestion;
  }
   
  //Create a new li element for each answer choice
  addChoices.forEach(function (newInput){
    var listEl = document.createElement("li");
    listEl.setAttribute("class", "li-answer")
    listEl.textContent = newInput;
    createUlEl.appendChild(listEl);
    listEl.addEventListener("click", result); //Add event listener, so when any li element is clicked the result function gets executed
  })
}
 
//When li element clicked it will check if the answer is correct or wrong
function result(event){
  listEl = event.target; //define li element as target 

  solutionContainer.setAttribute("class", "solution-container")

    //If the li element clicked contains the correct answer the score will increase by 1 and the solution...
    //...container below will contain a text saying that the answer is correct
    if (listEl.textContent == myQuestions[index].correctAnswer){
      score++; 
      solution.textContent = "Correct! The answer is " +  myQuestions[index].correctAnswer;

    //If the li element does not contain the correct answer the timer count will be substracted by 10 seconds...
    //...and the container below will contain a text saying that the answer is wrong
    } else {
      timerCount = timerCount + timePenalty;
      solution.textContent = "Wrong! The right answer is " +  myQuestions[index].correctAnswer;
    }

    //If we reach the last question the bowser will display the submit form screen
    if (index === 4){
      timerCount = 0; 
      showEndScreen();
      return;
    //If the is is not the last question, the renderQuiz function will be executed again and the index will be increased by 1 to go through the whole myQuestion array.
    } else {
      index++;
      renderQuiz();
      return;
    }
}

//When the time is up or the last question is answered the browser will display the submit form screen
function showEndScreen (){
  //Removing container from before
  header.remove();
  subContainer.remove();

  //Creating new HTML elements
  var pEl = document.createElement("p");
  var formEl = document.createElement("form");
  var labelElName = document.createElement("label");
  var inputElName = document.createElement("input");
  var labelElLastName = document.createElement("label");
  var inputElLastName = document.createElement("input");
  var submitEl = document.createElement("input");
  var hEl = document.createElement("h1");
  var main = document.querySelector("main");
 
  //Setting attributes and text content for new HTML elements
  main.setAttribute("class", "main-El");
  pEl.setAttribute("class", "p-Element");
  pEl.textContent = "Your final score is: " + score + "/5";
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

  //Appending all input, label and button elements to form element
  formEl.appendChild(labelElName);
  formEl.appendChild(inputElName);
  formEl.appendChild(labelElLastName);
  formEl.appendChild(inputElLastName);
  formEl.appendChild(submitEl);
  
  //Appending new elements to main container
  mainContainer.appendChild(hEl);
  mainContainer.appendChild(pEl);
  mainContainer.appendChild(formEl);

  submitEl.addEventListener("click", saveData); //Adding event listener, so when the submit button is clicked a new function gets executed
}

//When submit button clicked the function gets executed
function saveData (event) {
    submitEl = event.target;
    event.preventDefault(); //prevent default to reload the page

    var name = document.querySelector(".name-Input").value; //Selecting data from name input
    var lastName = document.querySelector(".lastName-Input").value; //Selecting data from last name input

    //If the first name input is empty an elert will pop up
    if (name == "") {
      alert("You must enter a name!")

    //If the last name input is empty an elert will pop up
    } else if (lastName == ""){
      alert("You must enter a last name!")

    //If there is an input in both input fields, the data will be saved as an object
    } else {
      var finalScore = {
        fname: name,
        laName: lastName,
        scoreData: score
      }

      //Setting local storage key value to save data 

      var allScores = localStorage.getItem("allScores");
      if (allScores === null){
        allScores = []; //If there is no data, it will return an empty array

      } else {
        allScores = JSON.parse(allScores); //If there is a data input the data string will be modified to an object
      }

      //push finalScore object into all scores key value from the local storage
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores); //all new scores will be modified to a string on order to be able to be saved in the local storage
      localStorage.setItem("allScores", newScore);

      showHighscore(); //When button clicked the showHighscores function will get executed
    }
  }

function showHighscore () {
  mainContainer.remove();
  header.remove();

  //Creating new HTML elements for highscore screen
  var highScoreHeader = document.createElement("h1");
  var btnWebpage = document.createElement("button");
  var btnClearScore = document.createElement("button");
  var ulElCreate = document.createElement("ul");

  //Setting attributes and text content for new elements 
  ulElCreate.setAttribute("class", "ul-score");
  highScoreHeader.setAttribute("class", "header-highscore");
  btnWebpage.setAttribute("type", "button");
  btnWebpage.setAttribute("id", "button-goBack");
  btnWebpage.textContent = "Go Back";

  btnClearScore.setAttribute("type", "button");
  btnClearScore.setAttribute("id", "button-clear");

  btnClearScore.textContent = "Clear Highscores";
  highScoreHeader.textContent = "Last Games Scores";

  //Accessing scores from local storage
  var allScores = localStorage.getItem("allScores");
  allScores = JSON.parse(allScores);

  document.body.appendChild(highScoreHeader);

  //If allScores has a value, for each new score an li elemnt will be added to the ul element until the local storage gets cleared
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
  
  btnWebpage.addEventListener("click", showWebpage); //goes to the default start of the webpage
  btnClearScore.addEventListener("click", clearScore); //clears the local storage, so all scores
}

function clearScore(event){
  btnHighscore = event.target;
  localStorage.clear();
  location.reload();
}

function showWebpage(){
  location.reload();
}

btnHighscore.addEventListener("click", showHighscore); //Event to skip quiz and go to the highscore screen
buttonStart.addEventListener("click", removeFunction); //Event to start the quiz
