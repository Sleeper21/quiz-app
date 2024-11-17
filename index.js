import { quizQuestions } from "./assets/src/quiz.js"; 

///////////
let numberOfQuestions = document.getElementById("questionQtt");
let counter = document.getElementById("counter");
let startBtn = document.getElementById("start");
let scoreElement = document.getElementById("score");
let feedback = document.getElementById("feedback");
let icon = document.getElementById("feedbackIcon");
let question = document.getElementById("question");
let nextSubmit = document.getElementById("nextSubmit");
let option0 = document.getElementById("0");
let option1 = document.getElementById("1");
let option2 = document.getElementById("2");
let option3 = document.getElementById("3");

let currentQuestion = 0;
let score = 0;
let submitted = "";
showScore(score);

numberOfQuestions.innerHTML = quizQuestions.length;

startBtn.addEventListener("click", startRestart);
option0.addEventListener("click", selected);
option1.addEventListener("click", selected);
option2.addEventListener("click", selected);
option3.addEventListener("click", selected);
nextSubmit.addEventListener("click", submit);

function startRestart(){
    icon.classList.add("hidden");
    feedback.classList.add("hidden");
    
  if(startBtn.innerHTML === "START"){ // Start from new
      startBtn.innerHTML = "RESTART Quiz";
      startBtn.style.backgroundColor = "grey";
      resetButtonsBackgroundColor();

      if (currentQuestion === 0) toggleAnswerBtn();

      counter.innerHTML = "Question #" + (currentQuestion + 1);
      question.innerHTML = quizQuestions[currentQuestion].question;
      option0.innerHTML = quizQuestions[currentQuestion].options[option0.id];
      option1.innerHTML = quizQuestions[currentQuestion].options[option1.id];
      option2.innerHTML = quizQuestions[currentQuestion].options[option2.id];
      option3.innerHTML = quizQuestions[currentQuestion].options[option3.id];
      nextSubmit.innerHTML = "Submit Answer";
      nextSubmit.classList.remove("hidden");

  } else{ // Restart

      resetAll();
  };
};

function nextQuestion(){
  currentQuestion ++;
  startBtn.innerHTML = "START";
  startRestart();
};

function toggleAnswerBtn(){
  if (option0.disabled){
      option0.disabled = false;
      option1.disabled = false;
      option2.disabled = false;
      option3.disabled = false;
  } else{
      option0.disabled = true;
      option1.disabled = true;
      option2.disabled = true;
      option3.disabled = true;
  }
};

function selected(event){
  let selectedId = event.srcElement.id;
  let btnSelected = event.srcElement;
  let index = 0;
  nextSubmit.disabled = false;
  while (index < 4) { // Only highligh the selected button.
      btnSelected.style.backgroundColor = "yellow";
      if (index != selectedId){
          document.getElementById(index).style.backgroundColor = "white";
      }
      index ++;
  }
  submitted = btnSelected;
};

function submit(){
  if (nextSubmit.innerHTML === "Submit Answer"){

    let correctOptionId = quizQuestions[currentQuestion].correctAnswer;
    feedback.classList.remove("hidden");
    
    toggleAnswerBtn();
    checkIfCorrect(correctOptionId);

  } else if (nextSubmit.innerHTML === "Finish"){
    nextSubmit.disabled = true;
    nextSubmit.style.backgroundColor = "grey";
    nextSubmit.innerHTML = "The End";
    startBtn.style.backgroundColor = "orangered";

    switch (score) {
        case 0:
            question.innerHTML = "You got no correct questions. Try Again.";
            break;
        case 1:
            question.innerHTML = "You got 1 correct question. You should try again.";
            break;
        case quizQuestions.length:
            question.innerHTML = "Well Done! You answered all questions correctly!!";
            break;
        default:
            question.innerHTML = "You got " + score + " correct questions!";
            break;
    }
  } else {
    toggleAnswerBtn();   
    nextQuestion();
  }
  
}

function checkIfCorrect(correctOptionId){
  if (submitted.id == correctOptionId){ // If Correct answer
    console.log(submitted)
    score ++;
    showScore(score);
    feedback.innerHTML = "CORRECT!";
    submitted.style.backgroundColor = "green";
    icon.src = "/assets/images/correct-icon.png";
    icon.classList.remove("hidden");

    adjustNextBtn();
    
  } else { // If Wrong
    feedback.innerHTML = "Wrong Answer";
    // display and highlight correct answer and icon
    document.getElementById(correctOptionId).style.backgroundColor = "green";
    submitted.style.backgroundColor = "red";
    icon.src = "assets/images/wrong-icon.png";
    icon.classList.remove("hidden");

    adjustNextBtn();     
    showScore(score);
  }
}

function adjustNextBtn(){
  if ((currentQuestion + 1) == quizQuestions.length){ // If last question
    nextSubmit.innerHTML = "Finish";
    nextSubmit.style.backgroundColor = "green";
  } else {
    nextSubmit.innerHTML = "Next Question";
    nextSubmit.style.backgroundColor = "orangered";
  }        
};

function resetAll(){
  startBtn.innerHTML = "START";
      startBtn.style.backgroundColor = "rgb(1, 143, 8)";
      //manually disable answer buttons
      option0.disabled = true;
      option1.disabled = true;
      option2.disabled = true;
      option3.disabled = true;
      
      resetButtonsBackgroundColor();
      counter.innerHTML = "Can you take the 5 Questions Quiz?";
      nextSubmit.classList.add("hidden");
      score = 0;
      currentQuestion = 0;
      question.innerHTML = "Press Start";
      option0.innerHTML = "A";
      option1.innerHTML = "B";
      option2.innerHTML = "C";
      option3.innerHTML = "D";
}

function resetButtonsBackgroundColor(){
  option0.style.backgroundColor = "white";
  option1.style.backgroundColor = "white";
  option2.style.backgroundColor = "white";
  option3.style.backgroundColor = "white";
}
function showScore(score){
  if (score > 0 || currentQuestion > 0){
      scoreElement.innerHTML = "Your Score: " + score + " out of " + quizQuestions.length;
  } else {
      scoreElement.innerHTML = "** Your Score will display here.";
  }
};