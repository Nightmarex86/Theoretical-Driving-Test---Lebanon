// Function to convert English numerals to Arabic numerals
function convertToArabicNumerals(timeText) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return timeText.replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
}

function convertToEnglishNumerals(timeText) {
    const englishNumerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return timeText.replace(/[٠-٩]/g, (digit) => englishNumerals['٠١٢٣٤٥٦٧٨٩'.indexOf(digit)]);
}

function updateTimerLanguage(language) {
    const timerElement = document.getElementById('timer');
    const timeElement = document.getElementById('time');

    const translations = {
        en: "Timer :",
        ar: "الوقت:",
        fr: "Temps:"
    };

    let currentTime = timeElement.textContent;

    timerElement.innerHTML = `${translations[language]} <span id="time">${currentTime}</span>`;

    const updatedTimeElement = document.getElementById('time');

    if (language === 'ar') {
        updatedTimeElement.textContent = convertToArabicNumerals(currentTime);
    } else {
        updatedTimeElement.textContent = convertToEnglishNumerals(currentTime);
    }
}

document.getElementById('language').addEventListener('change', function () {
    updateTimerLanguage(this.value);
});

document.addEventListener("DOMContentLoaded", () => {
    const currentLanguage = document.getElementById('language').value;
    updateTimerLanguage(currentLanguage);
});
