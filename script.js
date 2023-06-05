// Questions and Answers
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
    options: ["Dante Alighieri", "Howard Phillips Lovecraft", "William Shakespeare", "John Ronald Tolkien["],
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

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const counterElement = document.getElementById("counter");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

// Function to display the current question
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = document.createElement("div");
    option.classList.add("option");
    option.textContent = currentQuestion.options[i];
    option.addEventListener("click", handleAnswer); // Click event handler for answer buttons
    optionsElement.appendChild(option);
  }

  // Enabling the "Next" button
  nextButton.style.display = "block";
}

// Function to handle answer selection
function handleAnswer(event) {
  const selectedOption = event.target;
  const selectedAnswer = Array.from(optionsElement.children).indexOf(selectedOption);
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
    selectedOption.classList.add("correct"); // Adding "correct" class for correct answer
  } else {
    selectedOption.classList.add("incorrect"); // Adding "incorrect" class for wrong answer
  }

  // Disabling the ability to select an answer after selection
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.removeEventListener("click", handleAnswer);
  });

  // Enabling the "Next" button
  nextButton.disabled = false;
}

// Function to move to the next question
function goToNextQuestion() {
  // Checking if there are any more questions
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();

    // Reset answer button colors and styles
    const options = document.querySelectorAll(".option");
    options.forEach((option) => {
      option.classList.remove("correct", "incorrect");
    });

    // Disabling the "Next" button
    nextButton.disabled = true;
  } else {
    // All questions answered
    showResult();
  }
}

// Function to show results
function showResult() {
  questionElement.textContent = `You answered ${score} out of ${questions.length} questions correctly.`;

  // Hiding answer choice buttons and showing a "Restart" button
  optionsElement.style.display = "none";
  nextButton.style.display = "none";
  restartButton.style.display = "inline-block";
}

// Function to restart the test
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();

  // Showing Choice Buttons and Hiding the Restart Button
  optionsElement.style.display = "flex";
  nextButton.style.display = "block";
  restartButton.style.display = "none";

  // Reset answer button colors and styles
  const options = document.querySelectorAll(".option");
  options.forEach(option => {
    option.classList.remove("correct", "incorrect");
    option.addEventListener("click", handleAnswer);
  });
}

// Test start
showQuestion();

// Assigning a click event handler to the "Next" button
nextButton.addEventListener("click", goToNextQuestion);

// Assigning a click event handler to the "Restart" button
restartButton.addEventListener("click", restartQuiz);
