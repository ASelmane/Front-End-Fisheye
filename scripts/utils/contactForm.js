const modal = document.getElementById("contact_modal");
const form = document.getElementById("form");

document.getElementById("modal-open").addEventListener("click", displayModal);
document.getElementById("modal-close").addEventListener("click", closeModal);

// Show contact modal
function displayModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    modal.querySelector("#firstname").focus();
    modal.setAttribute("aria-hidden", "false");
    document.querySelector("main").setAttribute("aria-hidden", "true");
}

// Hide contact modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    document.querySelector("main").setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    document.getElementById("modal-open").focus();
}

// Close modal when user clicks on Escape + set and block focus on modal
document.addEventListener("keydown", (e) => {
    if (modal.getAttribute("aria-hidden") === "false") {
        if (e.key === "Escape") {
            closeModal();
        }
        if (document.activeElement === modal.querySelector(".contact_button")) {
            if (!e.shiftKey && e.key === "Tab") {
                e.preventDefault();
                modal.querySelector("#modal-close").focus();
            }
        }
        if (document.activeElement === modal.querySelector("#modal-close")) {
            if (e.shiftKey && e.key === "Tab") {
                e.preventDefault();
                modal.querySelector(".contact_button").focus();
            }
        }
    }
});

// submit form in console.log
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Prénom: " + form.firstname.value);
    console.log("Nome: " + form.lastname.value);
    console.log("Email: " + form.email.value);
    console.log("Message: " + form.message.value);
    closeModal();
    form.reset();
});
