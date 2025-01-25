let questions = []; // Array to store questions loaded from JSON
let currentQuestionIndex = 0; // Tracks the current question
let selectedAnswers = {}; // Stores user answers
let selectedQuestions = []; // Subset of questions for the quiz
let pictureQuestions = []; // Array to store picture-based questions
let selectedPictureQuestions = []; // Subset of picture questions for the quiz

let timer;
let timeLeft = 15 * 60; // 1 minute in seconds

// Add animations to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});

// Fetch questions from JSON file
async function loadQuestions() {
    try {
        const textResponse = await fetch('questions.json');
        questions = await textResponse.json();

        const pictureResponse = await fetch('pictureQuestions.json');
        pictureQuestions = await pictureResponse.json();
    } catch (error) {
        console.error("Error loading questions:", error);
    }
}

// Start the quiz
function startQuiz() {
    const questionCount = parseInt(document.getElementById('questionCount').value);
    const pictureQuestionCount = parseInt(document.getElementById('pictureQuestionCount').value);

    if (questionCount >= 15 && questionCount <= 212 && pictureQuestionCount >= 15 && pictureQuestionCount <= 100) {
        document.getElementById('timer').classList.remove('hidden');
        startTimer();

        selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, questionCount);
        selectedPictureQuestions = pictureQuestions.sort(() => Math.random() - 0.5).slice(0, pictureQuestionCount);

        currentQuestionIndex = 0;
        document.getElementById("quizContainer").classList.remove("hidden");
        document.querySelector(".config").classList.add("hidden");
        displayQuestion();
        document.getElementById("returnButton").classList.remove("hidden");
    } else {
        alert("Please enter valid numbers for the questions and signs.");
    }
}

// Display the current question
function displayQuestion() {
    const quizElement = document.getElementById("quiz");
    const isPictureQuestion = currentQuestionIndex >= selectedQuestions.length;
    const question = isPictureQuestion
        ? selectedPictureQuestions[currentQuestionIndex - selectedQuestions.length]
        : selectedQuestions[currentQuestionIndex];

    // Build the HTML for the current question
    quizElement.innerHTML = `
        <h2>Question ${currentQuestionIndex + 1}</h2>
        ${question.image ? `<img src="${question.image}" alt="Question Image">` : ""}
        <p>${question.question}</p>
        <ul>
            ${question.options.map((option, index) => `
                <li>
                    <label>
                        <input type="radio" name="answer" value="${option}" 
                        ${selectedAnswers[currentQuestionIndex] === option ? "checked" : ""}>
                        ${option}
                    </label>
                </li>
            `).join("")}
        </ul>
    `;

    // Show/hide navigation buttons
    document.getElementById("prevQuestion").classList.toggle("hidden", currentQuestionIndex === 0);
    document.getElementById("nextQuestion").classList.toggle("hidden", currentQuestionIndex === selectedQuestions.length + selectedPictureQuestions.length - 1);
    document.getElementById("submitQuiz").classList.toggle("hidden", currentQuestionIndex !== selectedQuestions.length + selectedPictureQuestions.length - 1);
}

// Navigate through questions
document.getElementById("prevQuestion").addEventListener("click", () => {
    currentQuestionIndex--;
    displayQuestion();
});
document.getElementById("nextQuestion").addEventListener("click", () => {
    currentQuestionIndex++;
    displayQuestion();
});

// Submit the quiz
function submitQuiz() {
    clearInterval(timer); // Stop the timer
    const resultContainer = document.getElementById("result");
    let score = 0;

    // Build the result HTML
    const resultHTML = [...selectedQuestions, ...selectedPictureQuestions].map((question, index) => {
        const isCorrect = selectedAnswers[index] === question.answer;
        if (isCorrect) score++;

        return `
            <div class="result-question">
                <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                ${question.image ? `<img src="${question.image}" alt="Question Image">` : ""}
                <p>Your Answer: <span class="${isCorrect ? 'correct' : 'wrong'}">${selectedAnswers[index] || "No Answer"}</span></p>
                <p>Correct Answer: <span class="correct">${question.answer}</span></p>
            </div>
        `;
    }).join("");

    // Display the results
    resultContainer.innerHTML = `
        <h2>Quiz Results</h2>
        <p>You scored ${score} out of ${selectedQuestions.length + selectedPictureQuestions.length}!</p>
        <div class="result-content">
            ${resultHTML}
        </div>
        <button id="restartQuiz">Restart Quiz</button>
    `;
    resultContainer.classList.remove("hidden");
    document.getElementById("quizContainer").classList.add("hidden");

    // Add event listener for the restart button
    document.getElementById("restartQuiz").addEventListener("click", () => {
        // Reset variables
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswers = {};

        // Hide result container and show config container
        resultContainer.classList.add("hidden");
        document.querySelector(".config").classList.remove("hidden");
        document.getElementById("quizContainer").classList.add("hidden");
    });
}

// Start quiz button event listener
document.getElementById("startQuiz").addEventListener("click", startQuiz);

// Save selected answers
document.getElementById("quiz").addEventListener("change", (event) => {
    selectedAnswers[currentQuestionIndex] = event.target.value;
});

// Load questions on page load
loadQuestions();

document.getElementById("startQuiz").addEventListener("click", () => {
    document.querySelector(".config").classList.add("hidden");
    document.getElementById("quizContainer").classList.remove("hidden");
});

// Show the return button when the quiz starts
document.getElementById("startQuiz").addEventListener("click", () => {
    document.getElementById("returnButton").classList.remove("hidden");
});

function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timeLeft = 15 * 60; // Reset the timer
    updateTimerDisplay();
    updatePulseAnimation();
    timer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Do you want to restart the quiz?");
            if (confirm("Press OK to restart the quiz.")) {
                resetToConfig();
            }
        } else {
            timeLeft--;
            updateTimerDisplay();
            updatePulseAnimation();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updatePulseAnimation() {
    const timerElement = document.getElementById('timer');
    const animationDuration = Math.max(0.5, timeLeft / 60); // Adjust the duration based on remaining time
    timerElement.style.animationDuration = `${animationDuration}s`;
}

function resetToConfig() {
    timeLeft = 15 * 60; // Reset the timer
    updateTimerDisplay();
    clearInterval(timer); // Stop the timer
    document.getElementById("quizContainer").classList.add("hidden");
    document.querySelector(".config").classList.remove("hidden");
    document.getElementById("timer").classList.add("hidden");
}

document.getElementById('startQuiz').addEventListener('click', startQuiz);
document.getElementById('submitQuiz').addEventListener('click', submitQuiz);