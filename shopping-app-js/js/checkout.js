//Get the form
var form = document.querySelector('.form');

// Get the input fields
var firstName = document.getElementById('fName');
var email = document.getElementById('fEmail');
var address = document.getElementById('fAddress');
var lastName = document.getElementById('fLastN');
var password = document.getElementById('fPassword');
var phone = document.getElementById('fPhone');

// Get the error elements
var errorName = document.getElementById('errorName');
var erroremail = document.getElementById('errorEmail');
var errorAddress = document.getElementById('errorAddress');
var errorLastname = document.getElementById('errorLastN');
var errorPassword = document.getElementById("errorPassword");
var errorPhone = document.getElementById('errorPhone');



// Exercise 6
function handleValidation() {

    var person = {
        firstName: firstName.value.toLowerCase(),
        email: email.value.toLowerCase(),
        address: address.value.toLowerCase(),
        lastName: lastName.value.toLowerCase(),
        password: password.value.toLowerCase(),
        phone: parseInt(phone.value)
    };

    var error = {
        eFname: false,
        eEmail: false,
        eAddress: false,
        eLName: false,
        ePassword: false,
        ePhone: false,
    };

    // validates inputs (content & length )
    checkContent(person, error);
    //if any error, displays valid or invalid
    showError(error);

}




function checkContent(person, error) {

    const ANY_NUMBER = /\d/;
    const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const PASSWRD_FORMAT = /^\w+$/;

    // looping through {person} to match property name + check if parameters are ok.
    for (let input in person) {

        if (input == "firstName") {

            if ((person[input] === "" || person[input].length < 3) || ANY_NUMBER.test(person[input])) {
                error.eFname = true;
            } else {
                error.eFname = false;
            }

        } else if (input == "email") {

            if ((person[input] === "" || person[input].length < 3) || !EMAIL_FORMAT.test(person[input])) {
                error.eEmail = true;
            } else {
                error.eEmail = false;
            }

        } else if (input == "address") {

            if (person[input] === "" || person[input].length < 3) {
                error.eAddress = true;
            } else {
                error.eAddress = false;
            }

        } else if (input == "lastName") {

            if ((person[input] === "" || person[input].length < 3) || ANY_NUMBER.test(person[input])) {
                error.eLName = true;
            } else {
                error.eLName = false;
            }

        } else if (input == "password") {

            if ((person.password === "" || person.password.length < 3) || !PASSWRD_FORMAT.test(person.password)) {
                error.ePassword = true;
            } else {
                error.ePassword = false;
            }

        } else if (input == "phone") {

            if (isNaN(person.phone) || person.phone == null || person.phone.toString().length !== 9) {
                error.ePhone = true;
            } else {
                error.ePhone = false;
            }
        }
    }
    return error
}


// SHOW ERROR
function showError(error) {

    let rightInput = 0;

    // looping through {error} to display bootstrap valid- class if is true, else invalid
    for (let eProperty in error) {

        if (eProperty == "eFname") {

            if (error[eProperty] == true) {
                firstName.classList.add("is-invalid");

            } else {
                firstName.classList.remove("is-invalid");
                firstName.classList.add("is-valid");
                rightInput++;
            }

        } else if (eProperty == "eEmail") {

            if (error[eProperty] == true) {
                email.classList.add("is-invalid");

            } else {
                email.classList.remove("is-invalid");
                email.classList.add("is-valid");
                rightInput++;
            }

        } else if (eProperty == "eAddress") {

            if (error[eProperty] == true) {
                address.classList.add("is-invalid");

            } else {
                address.classList.remove("is-invalid");
                address.classList.add("is-valid");
                rightInput++;
            }

        } else if (eProperty == "eLName") {

            if (error[eProperty] == true) {
                lastName.classList.add("is-invalid");

            } else {
                lastName.classList.remove("is-invalid");
                lastName.classList.add("is-valid");
                rightInput++;
            }

        } else if (eProperty == "ePassword") {

            if (error[eProperty] == true) {
                password.classList.add("is-invalid");

            } else {
                password.classList.remove("is-invalid");
                password.classList.add("is-valid");
                rightInput++;
            }

        } else if (eProperty == "ePhone") {

            if (error[eProperty] == true) {
                phone.classList.add("is-invalid");


            } else {
                phone.classList.remove("is-invalid");
                phone.classList.add("is-valid");
                rightInput++;
            }

        }

        if (rightInput == 6) {
            closeAlert()
            form.classList.add("was-validated");
        }

    }
}


function closeAlert() {

    let successBanner = document.getElementById('alert');
    if (successBanner.className == 'alert alert-success alert-dismissible d-none') {
        successBanner.classList.remove('d-none');
    } else {
        successBanner.classList.add('d-none');
    }
}
