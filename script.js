let questions = []; // Array to store questions loaded from JSON
let currentQuestionIndex = 0; // Tracks the current question
let selectedAnswers = {}; // Stores user answers
let selectedQuestions = []; // Subset of questions for the quiz
let pictureQuestions = []; // Array to store picture-based questions
let selectedPictureQuestions = []; // Subset of picture questions for the quiz

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
    const textQuestionCount = parseInt(document.getElementById("questionCount").value);
    const pictureQuestionCount = parseInt(document.getElementById("pictureQuestionCount").value);

    if (isNaN(textQuestionCount) || textQuestionCount < 1 || textQuestionCount > 300) {
        alert("Please enter a valid number for text questions (1–300).");
        return;
    }
    if (isNaN(pictureQuestionCount) || pictureQuestionCount < 1 || pictureQuestionCount > 50) {
        alert("Please enter a valid number for picture questions (1–50).");
        return;
    }

    selectedQuestions = questions.sort(() => Math.random() - 0.5).slice(0, textQuestionCount);
    selectedPictureQuestions = pictureQuestions.sort(() => Math.random() - 0.5).slice(0, pictureQuestionCount);

    currentQuestionIndex = 0;
    document.getElementById("quizContainer").classList.remove("hidden");
    document.querySelector(".config").classList.add("hidden");
    displayQuestion();
    document.getElementById("returnButton").classList.remove("hidden");
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
document.getElementById("submitQuiz").addEventListener("click", () => {
    const resultContainer = document.getElementById("result");
    let score = 0;

    // Build the result HTML
    const resultHTML = selectedQuestions.map((question, index) => {
        const isCorrect = selectedAnswers[index] === question.answer;
        if (isCorrect) score++;

        return `
            <div class="result-question">
                <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                <p>Your Answer: <span class="${isCorrect ? 'correct' : 'wrong'}">${selectedAnswers[index] || "No Answer"}</span></p>
                <p>Correct Answer: <span class="correct">${question.answer}</span></p>
            </div>
        `;
    }).join("");

    // Display the results
    resultContainer.innerHTML = `
        <h2>Quiz Results</h2>
        <p>You scored ${score} out of ${selectedQuestions.length}!</p>
        ${resultHTML}
        <button id="restartQuiz">Restart Quiz</button>
    `;
    resultContainer.classList.remove("hidden");
    document.getElementById("quizContainer").classList.add("hidden");

    // Add event listener for the restart button
    document.getElementById("restartQuiz").addEventListener("click", () => {
        // Reset variables
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswers = [];

        // Hide result container and show config container
        resultContainer.classList.add("hidden");
        document.querySelector(".config").classList.remove("hidden");
        document.getElementById("quizContainer").classList.add("hidden");
    });
});

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
    returnButton.classList.remove("hidden");
});
