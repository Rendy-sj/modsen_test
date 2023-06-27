const questions = [
  {
    question: "What year was the UN founded?",
    options: ["1945", "1951", "1960", "1975"],
    correctAnswer: 0
  },
  {
    question: "How many planets are in the solar system?",
    options: ["7", "8", "9", "10"],
    correctAnswer: 1
  },
  {
    question: "What chemical element is represented by the symbol 'Fe'?",
    options: ["Oxygen", "Iron", "Nitrogen", "Silver"],
    correctAnswer: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Dante Alighieri", "Howard Phillips Lovecraft", "William Shakespeare", "John Ronald Tolkien"],
    correctAnswer: 2
  },
  {
    question: "What scientific instrument is used to magnify small objects?",
    options: ["Microscope", "Telescope", "Barometer", "Thermometer"],
    correctAnswer: 0
  },
  {
    question: "What programming language is the most popular?",
    options: ["Java", "Python", "C++", "JavaScript"],
    correctAnswer: 1
  },
  {
    question: "Who is on the US $100 bill?",
    options: ["Abraham Lincoln", "George Washington", "Benjamin Franklin", "Alexander Hamilton"],
    correctAnswer: 2
  },
  {
    question: "Which planet is considered the largest in the solar system?",
    options: ["Mars", "Jupiter", "Venus", "Uranus"],
    correctAnswer: 1
  },
  {
    question: "Which city is the capital of France",
    options: ["London", "Rome", "Madrid", "Paris"],
    correctAnswer: 3
  },
  {
    question: "What number is represented by the Roman numerals 'V'?",
    options: ["1", "5", "10", "50"],
    correctAnswer: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question").textContent = currentQuestion.question;

  const questionCounterElement = document.getElementById("question-counter");
  questionCounterElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  const optionsElement = document.getElementById("options");
  optionsElement.innerHTML = "";
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = document.createElement("div");
    option.classList.add("option");
    option.textContent = currentQuestion.options[i];
    option.addEventListener("click", handleAnswer);
    optionsElement.appendChild(option);
  }

  document.getElementById("next-button").style.display = "block";
}

function handleAnswer(event) {
  const selectedOption = event.target;
  const selectedAnswer = Array.from(document.getElementById("options").children).indexOf(selectedOption);
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
    selectedOption.classList.add("correct");
  } else {
    selectedOption.classList.add("incorrect");
  }

  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.removeEventListener("click", handleAnswer);
  });

  document.getElementById("next-button").disabled = false;
}

function goToNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();

    const options = document.querySelectorAll(".option");
    options.forEach((option) => {
      option.classList.remove("correct", "incorrect");
    });

    document.getElementById("next-button").disabled = true;
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("question").textContent = `You answered ${score} out of ${questions.length} questions correctly.`;

  const optionsElement = document.getElementById("options");
  optionsElement.style.display = "none";
  document.getElementById("next-button").style.display = "none";
  document.getElementById("restart-button").style.display = "inline-block";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();

  const optionsElement = document.getElementById("options");
  optionsElement.style.display = "flex";
  document.getElementById("next-button").style.display = "block";
  document.getElementById("restart-button").style.display = "none";

  const options = document.querySelectorAll(".option");
  options.forEach(option => {
    option.classList.remove("correct", "incorrect");
    option.addEventListener("click", handleAnswer);
  });
}

showQuestion();

document.getElementById("next-button").addEventListener("click", goToNextQuestion);

document.getElementById("restart-button").addEventListener("click", restartQuiz);