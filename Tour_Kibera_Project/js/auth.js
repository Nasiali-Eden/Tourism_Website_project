// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIJZgmMUuz9tE7979iEFp_riSiGRjOpsY",
  authDomain: "tesla-ae311.firebaseapp.com",
  projectId: "tesla-ae311",
  storageBucket: "tesla-ae311.appspot.com",
  messagingSenderId: "433238092555",
  appId: "1:433238092555:web:ef224ef3c32cd8b93d900e",
  measurementId: "G-4BRJZBYBWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const analytics = getAnalytics(app); // Initialize analytics

const main = document.getElementById("main");
const returnBtn = document.getElementById("return-btn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacct = document.getElementById("create-acct");

// Start with this
const createacctbtn = document.getElementById("create-acct-btn");

// Event listeners for account creation
createacctbtn.addEventListener("click", function () {
  var isVerified = true;

  const signupEmail = signupEmailIn.value;
  const confirmSignupEmail = confirmSignupEmailIn.value;
  if (signupEmail !== confirmSignupEmail) {
    window.alert("Email fields do not match. Try again.");
    isVerified = false;
  }

  const signupPassword = signupPasswordIn.value;
  const confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword !== confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.");
    isVerified = false;
  }

  if (!signupEmail || !confirmSignupEmail || !signupPassword || !confirmSignUpPassword) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        window.alert("Success! Account created.");

        // Log event for account creation
        logEvent(analytics, 'sign_up', { method: 'Email' });

        window.location = "./destinations/destinations.html";
      })
      .catch((error) => {
        const errorMessage = error.message;
        window.alert("Error occurred. Try again.");
        window.alert(errorMessage);
      });
  }
});

// Event listener for login
submitButton.addEventListener("click", function () {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.alert("Success! Welcome back!");

      // Log event for login
      logEvent(analytics, 'login', { method: 'Email' });

      window.location = "./destinations/destinations.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      window.alert("Error occurred. Try again.");
    });
});

// Navigate through the login / Register components
signupButton.addEventListener("click", () => {
  main.style.display = "none";
  createacct.style.display = "block";
});

returnBtn.addEventListener("click", function () {
  main.style.display = "block";
  createacct.style.display = "none";
});
