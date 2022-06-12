async function getPhotographers() {
    // get the data from the json file
    try {
        let response = await fetch("data/photographers.json");
        const photographers = await response.json();
        return photographers;
    } catch (error) {
        console.error(error);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    // create the DOM elements for each photographers
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
