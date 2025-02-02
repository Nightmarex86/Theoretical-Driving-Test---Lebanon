// Function to convert English numerals to Arabic numerals
function convertToArabicNumerals(timeText) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return timeText.replace(/\d/g, (digit) => arabicNumerals[digit]);
}

// Function to convert Arabic numerals to English numerals
function convertToEnglishNumerals(timeText) {
    const englishNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return timeText.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (digit) => englishNumerals['٠١٢٣٤٥٦٧٨٩'.indexOf(digit)]);
}

// Function to update the timer label and numbers based on language
function updateTimerLanguage(language) {
    const timerElement = document.getElementById('timer');
    const timeElement = document.getElementById('time');

    // Translations for "Time Left:"
    const translations = {
        en: "Timer :",
        ar: "الوقت:",
        fr: "Temps:"
    };

    // Keep the current time value before updating the label
    let currentTime = timeElement.textContent;

    // Update only the "Time Left:" text while keeping the timer numbers intact
    timerElement.innerHTML = `${translations[language]} <span id="time">${currentTime}</span>`;

    // Re-select the #time element after modifying innerHTML
    const updatedTimeElement = document.getElementById('time');

    // Convert the timer numbers based on language
    if (language === 'ar') {
        updatedTimeElement.textContent = convertToArabicNumerals(currentTime);
    } else {
        updatedTimeElement.textContent = convertToEnglishNumerals(currentTime);
    }
}

// Event listener for language change
document.getElementById('language').addEventListener('change', function () {
    updateTimerLanguage(this.value);
});

// Ensure the timer is updated correctly on page load
document.addEventListener("DOMContentLoaded", () => {
    const currentLanguage = document.getElementById('language').value;
    updateTimerLanguage(currentLanguage);
});
