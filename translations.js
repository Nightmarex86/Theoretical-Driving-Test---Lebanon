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


    
    // Update the page title and all text content
    document.getElementById('quizTitle').textContent = translations[language].quizTitle;
    document.getElementById('startQuiz').textContent = translations[language].startQuiz;
    document.getElementById('submitQuiz').textContent = translations[language].submit;
    document.getElementById('prevQuestion').textContent = translations[language].prev;
    document.getElementById('nextQuestion').textContent = translations[language].next;

    // Update labels for number of questions and signs
    document.getElementById('questionCount').placeholder = translations[language].enterNumber;
    document.getElementById('pictureQuestionCount').placeholder = translations[language].enterNumber;


    // Update text for the number of questions and signs
    document.getElementById('questionCountLabel').textContent = translations[language].numberOfQuestions;
    document.getElementById('pictureQuestionCountLabel').textContent = translations[language].numberOfSigns;

    // Update additional texts
    document.getElementById('enterValidNumber').textContent = translations[language].enterValidNumber;
    document.getElementById('timeUp').textContent = translations[language].timeUp;

    // Update the "Time Left:" label (specific for timer)
    document.getElementById('timer').textContent = translations[language].timeLeft;


    // If language is Arabic, convert the timer numbers to Arabic numerals
    const timeElement = document.getElementById('time');
    if (language === 'ar') {
        timeElement.textContent = convertToArabicNumerals(timeElement.textContent);  // Convert the current time to Arabic numerals
    } else {
        timeElement.textContent = convertToEnglishNumerals(timeElement.textContent);  // Convert the current time to English numerals
    }
}

// Event listener for language selection from the dropdown
document.querySelectorAll(".dropdown-content a").forEach(item => {
    item.addEventListener("click", function (event) {
        event.preventDefault();
        const selectedLanguage = this.getAttribute("data-lang");

        // Update the language on the page
        updateLanguage(selectedLanguage);

        // Update the dropdown button text
        document.getElementById("selected-language").textContent = this.textContent.trim();

        // Sync the <select> element's value with the dropdown selection
        document.getElementById("language").value = selectedLanguage;
    });
});

// Event listener for language selection from the <select> dropdown
document.getElementById('language').addEventListener('change', function() {
    updateLanguage(this.value);

    // Update the dropdown button text
    document.getElementById("selected-language").textContent = this.options[this.selectedIndex].text;
});

// Initial page load - apply the default language (English)
document.addEventListener("DOMContentLoaded", () => {
    updateLanguage(currentLanguage);
});
