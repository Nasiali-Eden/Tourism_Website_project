document.addEventListener("DOMContentLoaded", () =>{
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


//Open Booking Page Function

function openBookingPage(placeName, placeDescription){
    const bookingPage = document.createElement("div");
    bookingPage.classList.add("booking-page");
    bookingPage.innerHTML = `
        <h2>Book your Stay at ${placeName}</h2>
        <p>${placeDescription}</p>
        <form class = "booking-form">
        <label for = "visitors"> Number of Visitors: </label>
        <input type = "number" id = "visitors" name = "visitors" min = "1" required>
        <label for = "days"> Number of Stay Days: </label>
        <input type = "number" id = "days" name = "days" min = "1" required>
        <label for = "meals"> Full board meals: </label>
        <select id = "meals" name = "meals" required>
            <option value = "Yes">Yes</option>
            <option value = "No">No</option>
        </select>
        <label for = "additional">Additional Requests:</label>
        <textarea id = "additional" name = "additional"></textarea>
        <button type = "submit" class = "intasendPayButton"> Confirm Booking</button>
        </form>
        <button class = "btn back-btn">Back</button>
    `;
    document.body.innerHTML= "";
    document.body.appendChild(bookingPage);

    document.querySelector(".back-btn").addEventListener("click", () => {
        location.reload(); //reload the page to go back to the main list
    });

    document
        .querySelector(".booking-form")
        .addEventListener("submit", handleBookingFormSubmit)
}


//handleBookingFormSubmit function

function handleBookingFormSubmit(event){
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const bookingDetails = {
        visitors: formData.get("visitors"),
        days: formData.get("days"),
        meals: formData.get("meals"),
        additional: formData.get("additional"),
    };

    //Proceed to Intasend Payment
    triggerIntasendPayment(bookingDetails);
}

//triggerIntasendPayment function

function triggerIntasendPayment(){
    const paymentButton = document.querySelector(".intaSendPayButton");

    if(!paymentButton){
        console.error("Intasend Payment button not found");
        return;
    }

    //initialize Intasend
    const intasend = new window.intasend({
        publicAPIKey: "ISPubKey_test_eef4860-80fb-4670-a8ef-325865af886",
        live: false,
    });

    //AttachEventListeners 

    //Handle Succesful Payment(e.g., save booking details to your database)
    intasend.on("COMPLETE", (results) => {
        console.log("Payment succesful", results);
    });

  
    intasend.on("IN-PROGRESS", (results) => {
        console.log("Payment in Progress", results);
    })

    //Payment Failure
    intasend.on("FAILED", (results) => {
        console.log("Payment Failed", results);
    })

    //Update button 
    paymentButton.dataset.amount = 10; //Replace with actual amount based on booking details
    paymentButton.dataset.currency = "KES";

    //simulate button click
    paymentButton.click();
}