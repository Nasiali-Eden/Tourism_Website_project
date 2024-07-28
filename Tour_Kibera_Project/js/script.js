document.addEventListener("DOMContentLoaded", () => {
    const bookButtons = document.querySelectorAll(".book-now");

    bookButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const card = event.target.closest(".card");
            const placeName = card.dataset.place;
            const placeDescription = card.dataset.description;

            openBookingPage(placeName, placeDescription);
        });
    });
});

// Open Booking Page Function
function openBookingPage(placeName, placeDescription) {
    const bookingPage = document.createElement("div");
    bookingPage.classList.add("booking-page");
    bookingPage.innerHTML = `
        <h2>Book your Stay at ${placeName}</h2>
        <p>${placeDescription}</p>
        <form class="booking-form">
            <label for="visitors">Number of Visitors:</label>
            <input type="number" id="visitors" name="visitors" min="1" required>
            <label for="days">Number of Stay Days:</label>
            <input type="number" id="days" name="days" min="1" required>
            <label for="meals">Full board meals:</label>
            <select id="meals" name="meals" required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <label for="additional">Additional Requests:</label>
            <textarea id="additional" name="additional"></textarea>
            <button type="submit" class="intasendPayButton">Confirm Booking</button>
        </form>
        <button class="btn back-btn">Back</button>
    `;
    document.body.innerHTML = "";
    document.body.appendChild(bookingPage);

    document.querySelector(".back-btn").addEventListener("click", () => {
        location.reload(); // Reload the page to go back to the main list
    });

    document.querySelector(".booking-form").addEventListener("submit", handleBookingFormSubmit);
}

// Handle Booking Form Submit Function
function handleBookingFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const bookingDetails = {
        visitors: formData.get("visitors"),
        days: formData.get("days"),
        meals: formData.get("meals"),
        additional: formData.get("additional"),
    };

    // Proceed to Intasend Payment
    triggerIntasendPayment(bookingDetails);
}

// Trigger Intasend Payment Function
function triggerIntasendPayment(bookingDetails) {
    const paymentButton = document.querySelector(".intasendPayButton");

    if (!paymentButton) {
        console.error("Intasend Payment button not found");
        return;
    }

    // Initialize Intasend
    const intasend = new window.intasend({
        publicAPIKey: "ISPubKey_test_eef4860-80fb-4670-a8ef-325865af886",
        live: false,
    });

    // Attach Event Listeners
    intasend.on("COMPLETE", (results) => {
        console.log("Payment successful", results);
        // Save booking details to your database here
    });

    intasend.on("IN-PROGRESS", (results) => {
        console.log("Payment in progress", results);
    });

    intasend.on("FAILED", (results) => {
        console.log("Payment failed", results);
    });

    // Update button
    paymentButton.dataset.amount = calculateBookingAmount(bookingDetails); // Replace with actual amount calculation
    paymentButton.dataset.currency = "KES";

    // Simulate button click
    paymentButton.click();
}

// Calculate Booking Amount Function
function calculateBookingAmount(details) {
    // Implement your booking amount calculation logic based on the details
    const basePrice = 1000; // Example base price per day per visitor
    const mealPrice = details.meals === "Yes" ? 500 : 0; // Example meal price per day
    return (basePrice + mealPrice) * details.visitors * details.days;
}
