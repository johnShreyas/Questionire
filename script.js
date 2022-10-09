const startButton = document.getElementById("start-btn");
const nextbutton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextbutton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random(0.5));
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusCLass(document.body);
  nextbutton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextbutton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}
function setStatusClass(element, correct) {
  clearStatusCLass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusCLass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "who is the father of computer?",
    answers: [
      { text: "Steve jobs", correct: false },
      { text: "Elon Musk", correct: false },
      { text: "Charles Babbage", correct: true },
      { text: "Bob khan", correct: false },
    ],
  },
  {
    question: "which is more popular Apple or Andorid?",
    answers: [
      { text: "Apple", correct: false },
      { text: "Andorid", correct: true },
    ],
  },
  {
    question: "Which is most populated conuntry?",
    answers: [
      { text: "India", correct: false },
      { text: "USA", correct: false },
      { text: "China", correct: true },
      { text: "Pakistan", correct: false },
    ],
  },
  {
    question: "Which is the largest state in India?",
    answers: [
      { text: "goa", correct: false },
      { text: "Andhra pradesh", correct: false },
      { text: "Rajasthan", correct: true },
      { text: "Bihar", correct: false },
    ],
  },
];
