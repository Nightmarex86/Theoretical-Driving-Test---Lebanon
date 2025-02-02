// Get elements
const dropdown = document.querySelector(".dropdown");
const dropdownContent = dropdown.querySelector(".dropdown-content");
const languageButton = dropdown.querySelector(".dropbtn");
const languageLinks = dropdownContent.querySelectorAll("a");
const languageSelect = document.getElementById("language");
const selectedLanguageSpan = document.getElementById("selected-language");

// Toggle dropdown visibility
languageButton.addEventListener("click", () => {
    dropdownContent.classList.toggle("show");
});

// Close dropdown if clicked outside
window.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
        dropdownContent.classList.remove("show");
    }
});

// Update language selection and reload content
languageLinks.forEach(item => {
    item.addEventListener("click", function (event) {
        event.preventDefault();

        // Get selected language
        const selectedLanguage = this.getAttribute("data-lang");

        // Update the selected language text
        selectedLanguageSpan.textContent = this.textContent.trim();

        // Update the <select> element value
        languageSelect.value = selectedLanguage;

        // Load questions based on selected language
        loadQuestions(selectedLanguage);  // Reload questions in the selected language
        updateTimerLanguage(selectedLanguage);  // Update timer numbers instantly
    });
});

// Sync the dropdown with the <select> language changes
languageSelect.addEventListener("change", function () {
    const selectedLanguage = this.value;

    // Update the selected language text in the dropdown
    selectedLanguageSpan.textContent = this.options[this.selectedIndex].text;

    // Load questions and update the timer
    loadQuestions(selectedLanguage);
    updateTimerLanguage(selectedLanguage);
});

// Function to load questions (dummy function)
async function loadQuestions(language) {
    console.log(`Loading questions for language: ${language}`);
    // Your code to load questions based on selected language goes here...
}

// Function to update timer language (dummy function)
function updateTimerLanguage(language) {
    console.log(`Updating timer language to: ${language}`);
    // Your code to update the timer language goes here...
}
