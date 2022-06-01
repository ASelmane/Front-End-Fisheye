function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
    document.body.style.overflow='hidden';
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.body.style.overflow='auto';
}

const form = document.getElementById("form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Prénom: ' + form.firstname.value)
    console.log('Nome: ' + form.lastname.value)
    console.log('Email: ' + form.email.value)
    console.log('Message: ' + form.message.value)
    closeModal();
    form.reset();
})