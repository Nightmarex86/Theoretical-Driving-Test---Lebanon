document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // Check if the user is on the login page
    if (window.location.pathname.endsWith('index.html')) {
        console.log("User is on the login page");
        return; // Do nothing if already on the login page
    }

    // Check if the user is logged in
    if (!localStorage.getItem('loggedIn')) {
        console.log("User is not logged in, redirecting to login page");
        // If not logged in, redirect to the login page
        window.location.href = 'index.html';
    } else {
        console.log("User is logged in");
    }
});

// Login functionality
async function handleLogin(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const userCode = document.getElementById("loginCode").value;
    const messageElement = document.getElementById("loginMessage");

    const ACCESS_CODES = ["apple", "banana", "cherry","Houry777"]; // Example access codes, replace with dynamic or secure method

    if (ACCESS_CODES.includes(userCode)) {
        console.log("Access code is correct, logging in");
        // Set login status in localStorage
        localStorage.setItem('loggedIn', 'true');
        
        // Redirect to the quiz page (quiztab.html)
        window.location.href = "quiztab.html"; 
    } else {
        console.log("Invalid access code");
        messageElement.textContent = "Invalid code. Please try again.";
        messageElement.style.color = "red"; // Error message in red
    }
}

// Add event listener for form submission
document.getElementById("loginForm").addEventListener("submit", handleLogin);
