/*
		Your Name: <James Donkor>
		Last Modified Date: <12/09/2025 >
		File: event_registration.js
		File Description: JavaScript for the DMWT Alumni Event Registration page.
		It handles the 10-minute countdown timer, ticket validation, total
		cost calculation, and form validation for name and e-mail.
*/

// Set the minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.00;
var ticketSurcharge = 0.50;

/*** YOUR CODE STARTS BELOW HERE ***/

// --------------------------------------------------------
// Countdown timer (10 minutes)  
// --------------------------------------------------------

// how many seconds in total 
var timeLeftInSeconds = 10 * 60;

// store interval id so we can cut the timer 
var timerHandle = setInterval(function () {

    // tick down one second
    timeLeftInSeconds--;

    // break the total seconds into minutes + seconds
    var mins = Math.floor(timeLeftInSeconds / 60);
    var secs = timeLeftInSeconds % 60;

    // for time under 10, make 0 the tens place 
    if (secs < 10) {
        secs = "0" + secs;
    }

    // drop the current time into the span on the page
    var timerDisplay = document.getElementById("timer");
    if (timerDisplay) {
        timerDisplay.innerHTML = mins + ":" + secs;
    }

    // at the end stop and tell the user 
    if (timeLeftInSeconds <= 0) {
        clearInterval(timerHandle);
        alert("Sorry, your time to complete the form has expired!\nPlease try again if you still wish to purchase tickets.");
        location.href = location.href;
    }
}, 1000);

// --------------------------------------------------------
// Setting background color on fields
// --------------------------------------------------------
function setFieldBackground(fieldId, hasError) {
    var fieldElem = document.getElementById(fieldId);

    // if we got a bad id, quit
    if (!fieldElem) {
        return;
    }

    // light red if there’s a problem, default gray otherwise
    if (hasError) {
        fieldElem.style.backgroundColor = "#ffcccc";
    } else {
        fieldElem.style.backgroundColor = "#efefef";
    }
}

// --------------------------------------------------------
// Item #1 – Calculate Total
// --------------------------------------------------------
function calculateTotal() {
    // grab HTML ids
    var ticketsInput   = document.getElementById("numTickets");
    var ticketsMessage = document.getElementById("msgTickets");
    var totalBox       = document.getElementById("totalCost");
    var contactSection = document.getElementById("contactInformation");

    // read the user’s ticket entry and try to turn it into a number
    var ticketCount = parseInt(ticketsInput.value, 10);

    // default is no error
    var hasError = false;

    // if it’s not a number 
    if (isNaN(ticketCount)) {
        hasError = true;
    } else if (ticketCount < minTickets || ticketCount > maxTickets) {
        // or it’s outside the allowed range
        hasError = true;
    }

    if (hasError) {
        // show the error text and highlight the field
        ticketsMessage.innerHTML = "You can only buy between " + minTickets + " and " + maxTickets + " tickets.";
        setFieldBackground("numTickets", true);

        // reset the total and hide the contact info 
        totalBox.value = "$0.00";
        if (contactSection) {
            contactSection.style.display = "none";
        }
    } else {
        //clear messages and reset background
        ticketsMessage.innerHTML = "";
        setFieldBackground("numTickets", false);

        // ticket price x count, plus surcharge
        var grandTotal = (ticketCount * costPerTicket) + ticketSurcharge;

        // show the total with a dollar sign and two decimal places
        totalBox.value = "$" + grandTotal.toFixed(2);

        // make contact info section visisble 
        if (contactSection) {
            contactSection.style.display = "block";
        }
    }
}

// --------------------------------------------------------
// Item #2 – Complete Purchase
// --------------------------------------------------------
function completePurchase() {
    // pull in the form fields and their message spans
    var nameInput   = document.getElementById("name");
    var emailInput  = document.getElementById("email");
    var nameMessage = document.getElementById("msgname");
    var emailMessage = document.getElementById("msgemail");
    var totalBox    = document.getElementById("totalCost");

    var hasError = false;

    // trim off extra spaces so we don’t accept "   "
    var nameValue  = nameInput.value.trim();
    var emailValue = emailInput.value.trim();

    // check name
    if (nameValue === "") {
        nameMessage.innerHTML = "Please enter your name.";
        setFieldBackground("name", true);
        hasError = true;
    } else {
        nameMessage.innerHTML = "";
        setFieldBackground("name", false);
    }

    // check email
    if (emailValue === "") {
        emailMessage.innerHTML = "Please enter your e-mail address.";
        setFieldBackground("email", true);
        hasError = true;
    } else {
        emailMessage.innerHTML = "";
        setFieldBackground("email", false);
    }

    // if anything failed, don’t continue
    if (hasError) {
        return;
    }

    // stop the countdown
    clearInterval(timerHandle);

    // show back the total
    var totalLabel = totalBox.value;

    alert(
        "Thank you for your purchase.\n" +
        "Your total cost is " + totalLabel + "\n" +
        "Please allow 24 hours for electronic delivery."
    );
}
