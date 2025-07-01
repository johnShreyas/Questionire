const startButton = document.getElementById("start-btn");
const nextbutton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreTracker = document.getElementById("score-tracker");
const scoreUpElement = document.getElementById("score-up");
const feedback = document.getElementById("feedback");
const restartButton = document.getElementById("Restart");

let shuffledQuestions, currentQuestionIndex;

var sec = 60;
var time = setInterval(myTimer, 1000);

function processResults(isCorrect) {
  if (!isCorrect) {
    feedback.textContent = "Wrong";
    return;
  } else {
    feedback.textContent = "correct";
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
    questionElement.classList.add("hide");
    feedback.classList.add("hide");
    restartButton.classList.remove("hide");
    showResult();
  }
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", () => {
  window.location.href = "Welcome.html";
  startGame();
});

nextbutton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("started");
  console.log("shuffledQuestions", shuffledQuestions);
  startButton.classList.add("hide");
  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
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
    answerButtonsElement.classList.add("hide");
    startButton.classList.add("hide");
    questionContainerElement.classList.add("hide");
    clearInterval(time);

    alert("Try Again? ");
    window.location.href = "Welcome.html";
    showResult();
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

function showResult() {
  const score = parseInt(scoreUpElement.textContent, 10) || 0;
  const totalQuestions = shuffledQuestions.length;
  const pointsPerQuestion = 100;
  const correctAnswers = score / pointsPerQuestion;
  const percent = (correctAnswers / totalQuestions) * 100;

  let message = "";
  if (percent >= 90) {
    message = " Outstanding!";
  } else if (percent >= 70) {
    message = " Great job! Your smart.";
  } else if (percent >= 50) {
    message = " Not bad! You are doing good.";
  } else {
    message = " Don’t give up! Try again.";
  }

  finalMessage.textContent = message;
  finalMessage.classList.remove("hide");
  restartButton.classList.remove("hide");
}

const questions = [
  {
    question: " who is the father of computer?",
    answers: [
      { text: "Steve jobs", correct: false },
      { text: "Elon Musk", correct: false },
      { text: "Charles Babbage", correct: true },
      { text: "Bob khan", correct: false },
    ],
  },
  {
    question: " which is more popular Apple or Andorid?",
    answers: [
      { text: "Apple", correct: false },
      { text: "Andorid", correct: true },
    ],
  },
  {
    question: " Who is the owner of tesla? ",
    answers: [
      { text: "Larry page", correct: false },
      { text: "Volkswagan", correct: false },
      { text: "Elon Musk", correct: true },
      { text: "Mercedes-Benz Group", correct: false },
    ],
  },
  {
    question: " When did the Gaza war started?",
    answers: [
      { text: "November 2022", correct: false },
      { text: "February 2023", correct: false },
      { text: "October 2023", correct: true },
      { text: "April 2023", correct: false },
    ],
  },
  {
    question: " What is the capital of France?",
    answers: [
      { text: "berlin", correct: false },
      { text: "Beijing", correct: false },
      { text: " Washington, D.C", correct: false },
      { text: "Paris", correct: true },
    ],
  },
  {
    question: " In Which year Trump became President again?",
    answers: [
      { text: "December 2023", correct: false },
      { text: "January 2025", correct: true },
      { text: "November 2023", correct: false },
      { text: "October 2023", correct: false },
    ],
  },
  {
    question: " Which is the most popular programing language?",
    answers: [
      { text: "C++", correct: false },
      { text: "SQL", correct: false },
      { text: "Java", correct: false },
      { text: "Python", correct: true },
    ],
  },
  {
    question: " When was the first smartPhone launched?",
    answers: [
      { text: "september 2008", correct: true },
      { text: "september 2020", correct: false },
      { text: "september 2007", correct: false },
      { text: "none of the above", correct: false },
    ],
  },
  {
    question: " In which year World war 1 ended?",
    answers: [
      { text: "1919", correct: true },
      { text: "1921", correct: false },
      { text: "1915", correct: false },
      { text: "1922", correct: false },
    ],
  },
  {
    question: " On Which day USA got Independence?",
    answers: [
      { text: "July 15", correct: false },
      { text: "July 4", correct: true },
      { text: "July 2", correct: false },
      { text: "July 10", correct: false },
    ],
  },
  {
    question: " What is most spoken language in the World",
    answers: [
      { text: "English", correct: true },
      { text: "Hindi", correct: false },
      { text: "Spanish", correct: false },
      { text: "Japanase", correct: false },
    ],
  },
  {
    question: " Who is known as 'Father of Modern Physics",
    answers: [
      { text: "Albert Einstein", correct: true },
      { text: "Isaac Newton", correct: false },
      { text: "Dr James Naismith", correct: false },
      { text: "galileo galilei", correct: false },
    ],
  },
  {
    question: " Who is the owner of Facebook?",
    answers: [
      { text: "Bill gates", correct: false },
      { text: "Mark Zuckerberg", correct: true },
      { text: "Jeff Bezos", correct: false },
      { text: "Warren Buffett", correct: false },
    ],
  },
  {
    question: " In Which year did corona started?",
    answers: [
      { text: "2018", correct: false },
      { text: "2015", correct: false },
      { text: "2020", correct: false },
      { text: "2019", correct: true },
    ],
  },
  {
    question: " Who is the CEO of Apple?",
    answers: [
      { text: "Jeff Bezos", correct: false },
      { text: "Elon Musk", correct: false },
      { text: "Tim cook", correct: true },
      { text: "None Of the Above", correct: false },
    ],
  },
  {
    question: " Who invented telephone?",
    answers: [
      { text: "Alexander Graham Bell", correct: true },
      { text: "Thomas Edison", correct: false },
      { text: "Stephen Hawking", correct: false },
      { text: "Albert Einstein", correct: false },
    ],
  },
  {
    question: " Who was the main character in the Book of Romeo and Juliet",
    answers: [
      { text: "Juliet", correct: true },
      { text: "Capulet", correct: false },
      { text: "Friar Lawrence", correct: false },
      { text: "Romeo", correct: false },
    ],
  },
  {
    question: " When did India got Independence?",
    answers: [
      { text: "July 5", correct: false },
      { text: "August 15", correct: true },
      { text: "January 26", correct: false },
      { text: "March 28", correct: false },
    ],
  },
  {
    question: " Who was the first person who landed on the moon?",
    answers: [
      { text: "Sunita Williams", correct: false },
      { text: "Rakesh Sharma", correct: false },
      { text: "Kalpana Chawla", correct: false },
      { text: "Neil Armstrong", correct: true },
    ],
  },
  {
    question: " How many countries are there in the World?",
    answers: [
      { text: "750", correct: false },
      { text: "195", correct: true },
      { text: "165", correct: false },
      { text: "120", correct: false },
    ],
  },
];
