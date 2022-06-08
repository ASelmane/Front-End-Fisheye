/* eslint-disable no-unused-vars */
const modal = document.getElementById("contact_modal");
const form = document.getElementById("form");

function displayModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    modal.querySelector("#modal-title").focus();
    modal.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    main.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
    document.getElementById("modal-open").focus();
}


document.addEventListener("keydown", (e) => {
    if (modal.getAttribute("aria-hidden") === "false") {
        if (e.key === "Escape") {
            closeModal();
        }
        if (document.activeElement === modal.querySelector(".contact_button")) {
            if (!e.shiftKey && e.key === "Tab") {
                e.preventDefault();
                modal.querySelector("#modal-title").focus();
            }
        }
        if (document.activeElement === modal.querySelector("#modal-title")) {
            if (e.shiftKey && e.key === "Tab") {
                e.preventDefault();
                modal.querySelector(".contact_button").focus();
            }
        }
    }
});


form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Prénom: " + form.firstname.value);
    console.log("Nome: " + form.lastname.value);
    console.log("Email: " + form.email.value);
    console.log("Message: " + form.message.value);
    closeModal();
    form.reset();
});
