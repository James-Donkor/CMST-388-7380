// If the user clicks a field that still has the placeholder text, clear it so they can start typing.
function clearDefault(field, text) {
    if (field.value === text) {
        field.value = "";
    }
}




// This runs when the user hits the submit button.
//  show errors, and if it's good, build email.
function submitForm() {

    let errors = []; // collect all error messages 
    let errorSpot = document.getElementById("errorMessages");

    // Grab the form values 
    let fName   = document.getElementById("firstName").value.trim();
    let lName   = document.getElementById("lastName").value.trim();
    let addr    = document.getElementById("address").value.trim();
    let city    = document.getElementById("city").value.trim();
    let state   = document.getElementById("state").value.trim();
    let zip     = document.getElementById("zip").value.trim();
    let acode   = document.getElementById("areaCode").value.trim();
    let pnum    = document.getElementById("phoneNumber").value.trim();
    let email   = document.getElementById("email").value.trim();
    let email2  = document.getElementById("confirmEmail").value.trim();
    let notes   = document.getElementById("comments").value.trim();

    //regex
    const onlyLetters   = /^[A-Za-z]+$/;
    const cityLetters   = /^[A-Za-z ]+$/;
    const addrPattern   = /^[A-Za-z0-9 .#\-]+$/;
    const onlyNums      = /^[0-9]+$/;
    const emailPattern  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    // First/ last name checks
    if (!fName || fName === "First Name" || !onlyLetters.test(fName)) {
        errors.push("Please enter a valid first name (letters only).");
    }

    if (!lName || lName === "Last Name" || !onlyLetters.test(lName)) {
        errors.push("Please enter a valid last name (letters only).");
    }


    // address checks
    if (!addr || !addrPattern.test(addr)) {
        errors.push("Please enter a valid street address.");
    }

    if (!city || !cityLetters.test(city)) {
        errors.push("City can only contain letters and spaces.");
    }

    if (!state) {
        errors.push("Please pick a state.");
    }


    // Zip & phone
    if (!onlyNums.test(zip) || zip.length !== 5) {
        errors.push("Zip must be exactly 5 digits.");
    }

    if (!onlyNums.test(acode) || acode.length !== 3) {
        errors.push("Area code must be 3 digits.");
    }

    if (!onlyNums.test(pnum) || pnum.length !== 7) {
        errors.push("Phone number must be 7 digits.");
    }


    // Email + confirmation
    if (!emailPattern.test(email)) {
        errors.push("Please type a valid email address.");
    }

    if (email !== email2) {
        errors.push("Your emails don't match.");
    }


    // Meal choice
    let meal = document.querySelector('input[name="meal"]:checked');
    if (!meal) {
        errors.push("Please choose a meal option.");
    }


    // Contact methods
    let contactChoices = document.querySelectorAll('input[name="contactMethod"]:checked');
    if (contactChoices.length < 2) {
        errors.push("Pick at least two contact methods.");
    }


    // Comments
    if (notes.length > 250) {
        errors.push("Comments can’t be more than 250 characters.");
    }


    // If there are errors, show them and stop 
    if (errors.length > 0) {
        errorSpot.innerHTML =
            "<ul>" + errors.map(err => `<li>${err}</li>`).join("") + "</ul>";
        return;
    }

    //clear old messages
    errorSpot.innerHTML = "";


    //email body text
    let body =
`Name: ${fName} ${lName}
Address: ${addr}
City: ${city}
State: ${state}
Zip: ${zip}
Phone: (${acode}) ${pnum}
Email: ${email}
Meal Preference: ${meal.value}
Contact Methods: ${Array.from(contactChoices).map(c => c.value).join(", ")}
Comments: ${notes}
`;

    // Email link (
    let mailtoLink =
        "mailto:your-email@example.com?subject=Registration Form&body=" +
        encodeURIComponent(body);

    // Launch user's email client
    window.location.href = mailtoLink;
}




// wipe the entire form and any error messages.
function resetForm() {
    document.getElementById("registrationForm").reset();
    document.getElementById("errorMessages").innerHTML = "";
}
