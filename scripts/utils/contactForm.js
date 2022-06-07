/* eslint-disable no-unused-vars */
const modal = document.getElementById("contact_modal");
const form = document.getElementById("form");

function displayModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Prénom: " + form.firstname.value);
    console.log("Nome: " + form.lastname.value);
    console.log("Email: " + form.email.value);
    console.log("Message: " + form.message.value);
    closeModal();
    form.reset();
});
