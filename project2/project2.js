// Remove default text when user focuses on a field
function clearDefault(field, defaultText) {
    if (field.value === defaultText) {
        field.value = "";
    }
}

// Handle submit logic
function submitForm() {
    let errors = [];
    let errorDiv = document.getElementById("errorMessages");

    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value.trim();
    let state = document.getElementById("state").value.trim();
    let zip = document.getElementById("zip").value.trim();
    let areaCode = document.getElementById("areaCode").value.trim();
    let phoneNumber = document.getElementById("phoneNumber").value.trim();
    let email = document.getElementById("email").value.trim();
    let confirmEmail = document.getElementById("confirmEmail").value.trim();
    let comments = document.getElementById("comments").value.trim();

    let alphaRegex = /^[A-Za-z]+$/;
    let cityRegex = /^[A-Za-z ]+$/;
    let addressRegex = /^[A-Za-z0-9 .#\-]+$/;
    let numericRegex = /^[0-9]+$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName === "" || firstName === "First Name") {
        errors.push("First name is required.");
    } else if (!alphaRegex.test(firstName)) {
        errors.push("First name must contain letters only.");
    }

    if (lastName === "" || lastName === "Last Name") {
        errors.push("Last name is required.");
    } else if (!alphaRegex.test(lastName)) {
        errors.push("Last name must contain letters only.");
    }

    if (address === "" || !addressRegex.test(address)) {
        errors.push("Valid address is required.");
    }

    if (city === "" || !cityRegex.test(city)) {
        errors.push("City must contain letters only.");
    }

    if (state === "") {
        errors.push("Please select a state.");
    }

    if (!numericRegex.test(zip) || zip.length !== 5) {
        errors.push("Zip code must be 5 digits.");
    }

    if (!numericRegex.test(areaCode) || areaCode.length !== 3) {
        errors.push("Area code must be 3 digits.");
    }

    if (!numericRegex.test(phoneNumber) || phoneNumber.length !== 7) {
        errors.push("Phone number must be 7 digits.");
    }

    if (!emailRegex.test(email)) {
        errors.push("Invalid e-mail address.");
    }

    if (email !== confirmEmail) {
        errors.push("E-mail fields must match.");
    }

    let mealSelected = document.querySelector('input[name="meal"]:checked');
    if (!mealSelected) {
        errors.push("Meal preference is required.");
    }

    let contactMethods = document.querySelectorAll('input[name="contactMethod"]:checked');
    if (contactMethods.length < 2) {
        errors.push("Select at least two contact methods.");
    }

    if (comments.length > 250) {
        errors.push("Comments cannot exceed 250 characters.");
    }

    if (errors.length > 0) {
        errorDiv.innerHTML = "<ul>" + errors.map(e => `<li>${e}</li>`).join("") + "</ul>";
        return;
    }

    errorDiv.innerHTML = "";

    let body = `
Name: ${firstName} ${lastName}
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

    let mailtoLink =
        "mailto:your-email@example.com?subject=Registration Form&body=" +
        encodeURIComponent(body);

    window.location.href = mailtoLink;
}

function resetForm() {
    document.getElementById("registrationForm").reset();
    document.getElementById("errorMessages").innerHTML = "";
}
