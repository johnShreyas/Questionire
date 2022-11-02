const startButton = document.getElementById("start-btn");
const nextbutton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreTracker = document.getElementById("score-tracker");
const scoreUpElement = document.getElementById("score-up");

let shuffledQuestions, currentQuestionIndex;

var sec = 60;
var time = setInterval(myTimer, 1000);

function processResults(isCorrect) {
  if (!isCorrect) {
    return;
  }

  const scoreUp = parseInt(scoreUpElement.textContent, 10) || 0;

  scoreUpElement.textContent = scoreUp + 100;
}

function myTimer() {
  document.getElementById("timer").innerHTML = sec + "sec";
  sec--;
  console.log(sec);
  if (sec == -1) {
    clearInterval(time);
    alert("Time out!! :(");
    nextbutton.classList.add("hide");
    answerButtonsElement.classList.add("hide");
  }
}

startButton.addEventListener("click", startGame);
nextbutton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("started");
  score = 0;
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random(0.5));
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  scoreTracker.classList.remove("hide");
  setNextQuestion();
  scoreUpElement.textContent = 0;
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
      answerButtonsElement.classList.remove("hide");
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
  processResults(correct);
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextbutton.classList.remove("hide");
    answerButtonsElement.classList.add("hide");
  } else {
    startButton.classList.add("hide");
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
    question: "1. who is the father of computer?",
    answers: [
      { text: "Steve jobs", correct: false },
      { text: "Elon Musk", correct: false },
      { text: "Charles Babbage", correct: true },
      { text: "Bob khan", correct: false },
    ],
  },
  {
    question: "2. which is more popular Apple or Andorid?",
    answers: [
      { text: "Apple", correct: false },
      { text: "Andorid", correct: true },
    ],
  },
  {
    question: "3. Which is most populated conuntry?",
    answers: [
      { text: "India", correct: false },
      { text: "USA", correct: false },
      { text: "China", correct: true },
      { text: "Pakistan", correct: false },
    ],
  },
  {
    question: "4. Which is the largest state in India?",
    answers: [
      { text: "goa", correct: false },
      { text: "Andhra pradesh", correct: false },
      { text: "Rajasthan", correct: true },
      { text: "Bihar", correct: false },
    ],
  },
  {
    question: "5. What is the capital of France?",
    answers: [
      { text: "berlin", correct: false },
      { text: "Beijing", correct: false },
      { text: " Washington, D.C", correct: false },
      { text: "Paris", correct: true },
    ],
  },
  {
    question: "6. What is the most smallest state in india?",
    answers: [
      { text: "Maharastra", correct: false },
      { text: "Goa", correct: true },
      { text: "Madhya Pradesh", correct: false },
      { text: "uttar Pradesh", correct: false },
    ],
  },
  {
    question: "7. Which is the most popular programing language?",
    answers: [
      { text: "C++", correct: false },
      { text: "SQL", correct: false },
      { text: "Java", correct: false },
      { text: "Python", correct: true },
    ],
  },
  {
    question: "8. When was the first smartPhone launched?",
    answers: [
      { text: "september 2008", correct: true },
      { text: "september 2020", correct: false },
      { text: "september 2007", correct: false },
      { text: "none of the above", correct: false },
    ],
  },
  {
    question: "9. In which year World war 1 ended?",
    answers: [
      { text: "1919", correct: true },
      { text: "1921", correct: false },
      { text: "1915", correct: false },
      { text: "1922", correct: false },
    ],
  },
  {
    question: "10. on Which day USA got Independence?",
    answers: [
      { text: "July 15", correct: false },
      { text: "July 4", correct: true },
      { text: "July 2", correct: false },
      { text: "July 10", correct: false },
    ],
  },
  {
    question: "11. What is most spoken language in the World",
    answers: [
      { text: "English", correct: true },
      { text: "Hindi", correct: false },
      { text: "Spanish", correct: false },
      { text: "Japanase", correct: false },
    ],
  },
  {
    question: "12. What is popular food in India?",
    answers: [
      { text: "Masala-Dosa", correct: true },
      { text: "Idle", correct: false },
      { text: "Vada", correct: false },
      { text: "Samosa", correct: false },
    ],
  },
  {
    question: "13. Who is the owner of Facebook?",
    answers: [
      { text: "Bill gates", correct: false },
      { text: "Mark Zuckerberg", correct: true },
      { text: "Jeff Bezos", correct: false },
      { text: "Warren Buffett", correct: false },
    ],
  },
  {
    question: "14. in Which year did corona started?",
    answers: [
      { text: "2018", correct: false },
      { text: "2015", correct: false },
      { text: "2020", correct: false },
      { text: "2019", correct: true },
    ],
  },
  {
    question: "15. Who is the CEO of Apple?",
    answers: [
      { text: "Jeff Bezos", correct: false },
      { text: "Elon Musk", correct: false },
      { text: "Tim cook", correct: true },
      { text: "None Of the Above", correct: false },
    ],
  },
  {
    question: "16. Who invented telephone?",
    answers: [
      { text: "Alexander Graham Bell", correct: true },
      { text: "Thomas Edison", correct: false },
      { text: "Stephen Hawking", correct: false },
      { text: "Albert Einstein", correct: false },
    ],
  },
];
