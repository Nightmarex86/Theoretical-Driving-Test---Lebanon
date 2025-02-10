// Translation object for different languages
document.addEventListener("DOMContentLoaded", () => {
    updateLanguage(currentLanguage);

    // Ensure that all DOM elements are available before attaching event listeners
    const languageSelect = document.getElementById('language');
    const selectedLanguageText = document.getElementById("selected-language");
    const dropdownItems = document.querySelectorAll(".dropdown-content a");

    // Check if the elements exist before proceeding
    if (languageSelect && selectedLanguageText && dropdownItems.length > 0) {
        // Event listener for language change via <select> dropdown
        languageSelect.addEventListener('change', function() {
            updateLanguage(this.value);

            // Update the dropdown button text
            selectedLanguageText.textContent = this.options[this.selectedIndex].text;
        });

        // Event listeners for language selection from the dropdown links
        dropdownItems.forEach(item => {
            item.addEventListener("click", function (event) {
                event.preventDefault();
                const selectedLanguage = this.getAttribute("data-lang");

                // Update the language on the page
                updateLanguage(selectedLanguage);

                // Update the dropdown button text
                selectedLanguageText.textContent = this.textContent.trim();

                // Sync the <select> element's value with the dropdown selection
                languageSelect.value = selectedLanguage;
            });
        });
    }
});

// Translation object for different languages
const translations = {
    en: {
        quizTitle: "Quiz",
        startQuiz: "Start Quiz",
        submit: "Submit",
        prev: "Previous",
        next: "Next",
        timeLeft: "Timer",
        enterNumber: "Enter a number between 1 to 100",
        numberOfQuestions: "Number of Questions:",
        numberOfSigns: "Number of Signs:",
        about: "About us",
        contact: "Contact",
        enterValidNumber: "Please enter a valid number between 1-100",
        timeUp: "Time's up!",

        quizResults: "Quiz Results",
        scoreMessage: "You scored {score} out of {total}!",
        timeOutMessage: "Time's Up! You didn't finish in time.",
        restartButton: "Restart Quiz"
    },
    ar: {
        quizTitle: "اختبار",
        startQuiz: "ابدأ الاختبار",
        submit: "إرسال",
        prev: "السابق",
        next: "التالي",
        timeLeft: "الوقت المتبقي:",
        enterNumber: "أدخل رقمًا من ١ إلى ١٠٠",
        numberOfQuestions: "عدد الأسئلة:",
        numberOfSigns: "عدد الإشارات:",
        contact: "اتصل بنا",
        enterValidNumber: "أدخل رقمًا من ١ إلى ١٠٠",
        timeUp: "انتهى الوقت!",

        quizResults: "نتائج الاختبار",
        scoreMessage: "لقد حصلت على {score} من {total}!",
        timeOutMessage: "انتهى الوقت! لم تنته في الوقت المحدد.",
        restartButton: "إعادة الاختبار"
    },
    fr: {
        quizTitle: "Quiz",
        startQuiz: "Commencer le quiz",
        submit: "Soumettre",
        prev: "Précédent",
        next: "Suivant",
        timeLeft: "Temps restant:",
        enterNumber: "Entrez un nombre entre 1 et 100",
        numberOfQuestions: "Nombre de questions:",
        numberOfSigns: "Nombre de panneaux:",
        about: "À propos de nous",
        contact: "Contact",
        enterValidNumber: "Veuillez entrer un nombre valide entre 1 et 100",
        timeUp: "Le temps est écoulé!",

        quizResults: "Résultats du quiz",
        scoreMessage: "Vous avez marqué {score} sur {total}!",
        timeOutMessage: "Le temps est écoulé! Vous n'avez pas fini à temps.",
        restartButton: "Redémarrer le quiz"
    }
    // Add more languages here if needed
};

// Default language is English
let currentLanguage = 'en';

// Function to update the text content of the page based on selected language
function updateLanguage(language) {
    currentLanguage = language;

    // Ensure the elements exist before updating
    const elements = {
        quizTitle: document.getElementById('quizTitle'),
        startQuiz: document.getElementById('startQuiz'),
        submitQuiz: document.getElementById('submitQuiz'),
        prevQuestion: document.getElementById('prevQuestion'),
        nextQuestion: document.getElementById('nextQuestion'),
        questionCount: document.getElementById('questionCount'),
        pictureQuestionCount: document.getElementById('pictureQuestionCount'),
        questionCountLabel: document.getElementById('questionCountLabel'),
        pictureQuestionCountLabel: document.getElementById('pictureQuestionCountLabel'),
        enterValidNumber: document.getElementById('enterValidNumber'),
        timeUp: document.getElementById('timeUp'),
        timer: document.getElementById('timer'),
        time: document.getElementById('time')
    };

    // Update the page title and all text content if elements are found
    if (elements.quizTitle) elements.quizTitle.textContent = translations[language].quizTitle;
    if (elements.startQuiz) elements.startQuiz.textContent = translations[language].startQuiz;
    if (elements.submitQuiz) elements.submitQuiz.textContent = translations[language].submit;
    if (elements.prevQuestion) elements.prevQuestion.textContent = translations[language].prev;
    if (elements.nextQuestion) elements.nextQuestion.textContent = translations[language].next;

    // Update placeholders if elements are found
    if (elements.questionCount) elements.questionCount.placeholder = translations[language].enterNumber;
    if (elements.pictureQuestionCount) elements.pictureQuestionCount.placeholder = translations[language].enterNumber;

    // Update text for the number of questions and signs if elements are found
    if (elements.questionCountLabel) elements.questionCountLabel.textContent = translations[language].numberOfQuestions;
    if (elements.pictureQuestionCountLabel) elements.pictureQuestionCountLabel.textContent = translations[language].numberOfSigns;

    // Update additional texts if elements are found
    if (elements.enterValidNumber) elements.enterValidNumber.textContent = translations[language].enterValidNumber;
    if (elements.timeUp) elements.timeUp.textContent = translations[language].timeUp;

    // Update the "Time Left:" label (specific for timer)
    if (elements.timer) elements.timer.textContent = translations[language].timeLeft;

    // If language is Arabic, convert the timer numbers to Arabic numerals
    if (elements.time) {
        if (language === 'ar') {
            elements.time.textContent = convertToArabicNumerals(elements.time.textContent);  // Convert the current time to Arabic numerals
        } else {
            elements.time.textContent = convertToEnglishNumerals(elements.time.textContent);  // Convert the current time to English numerals
        }
    }
}

// Example function to convert numbers to Arabic numerals
function convertToArabicNumerals(number) {
    return number.replace(/[0-9]/g, function(match) {
        const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return arabicNumerals[parseInt(match)];
    });
}

// Example function to convert numbers to English numerals
function convertToEnglishNumerals(number) {
    return number.replace(/[٠-٩]/g, function(match) {
        const englishNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        return englishNumerals[parseInt(match)];
    });
}
