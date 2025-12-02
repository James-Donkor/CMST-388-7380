// ---------------------------------------------------------
// clearDefault()
// Removes default text when the user clicks into the field.
// This prevents accidental submissions with placeholder text.
// ---------------------------------------------------------
function clearDefault(field, defaultText) {
    if (field.value === defaultText) {
        field.value = "";
    }
}



// ---------------------------------------------------------
// submitForm()
// Main validation function called when user presses Submit.
// Validates ALL fields, displays errors, and emails the form.
// ---------------------------------------------------------
function submitForm() {

    // Store all error messages here
    let errors = [];

    // Location where errors will be displayed
    let errorDiv = document.getElementById("errorMessages");

    // ---------------------------------------------------------
    // Collect values from the form and trim whitespace
    // ---------------------------------------------------------
    let firstName      = document.getElementById("firstName").value.trim();
    let lastName       = document.getElementById("lastName").value.trim();
    let address        = document.getElementById("address").value.trim();
    let city           = document.getElementById("city").value.trim();
    let state          = document.getElementById("state").value.trim();
    let zip            = document.getElementById("zip").value.trim();
    let areaCode       = document.getElementById("areaCode").value.trim();
    let phoneNumber    = document.getElementById("phoneNumber").value.trim();
    let email          = document.getElementById("email").value.trim();
    let confirmEmail   = document.getElementById("confirmEmail").value.trim();
    let comments       = document.getElementById("comments").value.trim();

    // ---------------------------------------------------------
    // Regular expressions for validation
    // ---------------------------------------------------------
    const alphaRegex   = /^[A-Za-z]+$/;                 // Letters only
    const cityRegex    = /^[A-Za-z ]+$/;                // Letters + spaces
    const addressRegex = /^[A-Za-z0-9 .#\-]+$/;         // Letters, numbers, punctuation
    const numericRegex = /^[0-9]+$/;                    // Digits only
    const emailRegex   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email format



    // ---------------------------------------------------------
    // VALIDATE FIRST NAME
    // ---------------------------------------------------------
    if (firstName === "" || firstName === "First Name") {
        errors.push("First name is required.");
    } else if (!alphaRegex.test(firstName)) {
        errors.push("First name must contain alphabetic characters only.");
    }

    // ---------------------------------------------------------
    // VALIDATE LAST NAME
    // ---------------------------------------------------------
    if (lastName === "" || lastName === "Last Name") {
        errors.push("Last name is required.");
    } else if (!alphaRegex.test(lastName)) {
        errors.push("Last name must contain alphabetic characters only.");
    }


    // ---------------------------------------------------------
    // VALIDATE ADDRESS
    // ---------------------------------------------------------
    if (address === "") {
        errors.push("Address is required.");
    } else if (!addressRegex.test(address)) {
        errors.push("Address can contain letters, numbers, spaces, '.', '#', and '-'.");
    }


    // ---------------------------------------------------------
    // VALIDATE CITY
    // ---------------------------------------------------------
    if (city === "") {
        errors.push("City is required.");
    } else if (!cityRegex.test(city)) {
        errors.push("City must contain alphabetic characters only.");
    }


    // ---------------------------------------------------------
    // VALIDATE STATE
    // ---------------------------------------------------------
    if (state === "") {
        errors.push("Please select a state.");
    }


    // ---------------------------------------------------------
    // VALIDATE ZIP CODE (5 digits exactly)
    // ---------------------------------------------------------
    if (!numericRegex.test(zip) || zip.length !== 5) {
        errors.push("Zip code must be exactly 5 numeric digits.");
    }


    // ---------------------------------------------------------
    // VALIDATE PHONE NUMBER
    // ---------------------------------------------------------
    if (!numericRegex.test(areaCode) || areaCode.length !== 3) {
        errors.push("Area code must be exactly 3 digits.");
    }

    if (!numericRegex.test(phoneNumber) || phoneNumber.length !== 7) {
        errors.push("Phone number must be exactly 7 digits.");
    }


    // ---------------------------------------------------------
    // VALIDATE EMAIL FORMAT
    // ---------------------------------------------------------
    if (!emailRegex.test(email)) {
        errors.push("You have entered an invalid e-mail address.");
    }


    // ---------------------------------------------------------
    // CONFIRM EMAIL MATCHES
    // ---------------------------------------------------------
    if (email !== confirmEmail) {
        errors.push("Confirm e-mail must match the E-mail field exactly.");
    }


    // ---------------------------------------------------------
    // VALIDATE MEAL SELECTION
    // ---------------------------------------------------------
    let mealSelected = document.querySelector('input[name="meal"]:checked');
    if (!mealSelected) {
        errors.push("Meal preference is required.");
    }


    // ---------------------------------------------------------
    // VALIDATE CONTACT METHODS (Need 2+)
    // ---------------------------------------------------------
    let contactMethods = document.querySelectorAll('input[name="contactMethod"]:checked');

    if (contactMethods.length < 2) {
        errors.push("Please select at least TWO contact methods.");
    }


    // ---------------------------------------------------------
    // VALIDATE COMMENTS LENGTH
    // ---------------------------------------------------------
    if (comments.length > 250) {
        errors.push("Comments cannot exceed 250 characters.");
    }


    // ---------------------------------------------------------
    // DISPLAY ALL ERRORS IF ANY EXIST
    // ---------------------------------------------------------
    if (errors.length > 0) {
        errorDiv.innerHTML = "<ul>" + errors.map(e => `<li>${e}</li>`).join("") + "</ul>";
        return; // Stop submission
    }

    // If no errors, clear error display
    errorDiv.innerHTML = "";


    // ---------------------------------------------------------
    // BUILD EMAIL BODY TEXT (using template literal)
    // ---------------------------------------------------------
    let body =
`Name: ${firstName} ${lastName}
Address: ${address}
City: ${city}
State: ${state}
Zip: ${zip}
Phone: (${areaCode}) ${phoneNumber}
Email: ${email}
Meal Preference: ${mealSelected.value}
Contact Methods: ${Array.from(contactMethods).map(c => c.value).join(", ")}
Comments: ${comments}
`;


    // ---------------------------------------------------------
    // SEND EMAIL USING MAILTO (change email below)
    // ---------------------------------------------------------
    let mailtoLink =
        "mailto:your-email@example.com?subject=Registration Form&body=" +
        encodeURIComponent(body);

    // Opens user's email client with form pre-filled
    window.location.href = mailtoLink;
}



// ---------------------------------------------------------
// resetForm()
// Clears form fields and error messages
// ---------------------------------------------------------
function resetForm() {
    document.getElementById("registrationForm").reset();
    document.getElementById("errorMessages").innerHTML = "";
}
