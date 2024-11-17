const quizQuestions = [
    {
      question: "What is the capital of France?",
      options: ["Madrid", "Paris", "Rome", "Berlin"],
      correctAnswer: 1 // Index of the correct answer
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Jupiter", "Venus", "Mars", "Saturn"],
      correctAnswer: 2
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["CO2", "H2O2", "H2", "H2O"],
      correctAnswer: 3
    },
    {
      question: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correctAnswer: 1
    }
  ];

///////////
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

function startRestart(){
    icon.classList.add("hidden");
    feedback.classList.add("hidden");
    console.log(score)
  if(startBtn.innerHTML === "START"){
      startBtn.innerHTML = "RESTART Quiz";
      startBtn.style.backgroundColor = "grey";
      resetButtons();

      if (currentQuestion === 0) toggleAnswerBtn();

      counter.innerHTML = "Question #" + (currentQuestion + 1);
      question.innerHTML = quizQuestions[currentQuestion].question;
      option0.innerHTML = quizQuestions[currentQuestion].options[option0.id];
      option1.innerHTML = quizQuestions[currentQuestion].options[option1.id];
      option2.innerHTML = quizQuestions[currentQuestion].options[option2.id];
      option3.innerHTML = quizQuestions[currentQuestion].options[option3.id];
      nextSubmit.innerHTML = "Submit Answer";
      nextSubmit.classList.remove("hidden");
  } else{
      startBtn.innerHTML = "START";
      startBtn.style.backgroundColor = "rgb(1, 143, 8)";
      //manually disable answer buttons
      option0.disabled = true;
      option1.disabled = true;
      option2.disabled = true;
      option3.disabled = true;
      
      resetButtons();
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
}

function nextQuestion(){
  currentQuestion ++;
  startBtn.innerHTML = "START";
  startRestart();
}

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

    if (submitted.id == correctOptionId){ // If Correct answer
        score ++;
        showScore(score);
        feedback.innerHTML = "CORRECT!";
        submitted.style.backgroundColor = "green";
        icon.src = "images/correct-icon.png";
        icon.classList.remove("hidden");

        if ((currentQuestion + 1) == quizQuestions.length){ // If last question
            nextSubmit.innerHTML = "Finish";
            nextSubmit.style.backgroundColor = "green";
        } else{
            nextSubmit.innerHTML = "Next Question";
            nextSubmit.style.backgroundColor = "orangered";
        }        
        
    } else { // If Wrong
        feedback.innerHTML = "Wrong Answer";
        // display and highlight correct answer and icon
        document.getElementById(correctOptionId).style.backgroundColor = "green";
        submitted.style.backgroundColor = "red";
        icon.src = "images/wrong-icon.png";
        icon.classList.remove("hidden");
        if ((currentQuestion + 1) == quizQuestions.length){ // If last question
            nextSubmit.innerHTML = "Finish";
            nextSubmit.style.backgroundColor = "green";
        } else{
            nextSubmit.innerHTML = "Next Question";
            nextSubmit.style.backgroundColor = "orangered";
        }        
        showScore(score);
    }
  } else if (nextSubmit.innerHTML === "Finish"){
    nextSubmit.disabled = true;
    nextSubmit.innerHTML = "The End";

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
function resetButtons(){
  option0.style.backgroundColor = "white";
  option1.style.backgroundColor = "white";
  option2.style.backgroundColor = "white";
  option3.style.backgroundColor = "white";
}
function showScore(score){
  if (score > 0 || currentQuestion > 0){
      scoreElement.innerHTML = "Your Score: " + score + " out of 5";
  } else {
      scoreElement.innerHTML = "** Your Score will display here.";
  }
};