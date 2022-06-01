async function getPhotographer() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');

    try {
        let response = await fetch('data/photographers.json');
        const data = await response.json();
        const photographer = data.photographers.filter((photographer) => photographer.id == id)[0];
        const medias = data.media.filter((element) => element.photographerId == id);
        return {photographer, medias};
    }
    catch (error) {
        console.error(error);
    }
}

async function displayData(photographer, medias) {
    photographerFactory(photographer).getUserProfilDOM();
    mediaFactory(medias, photographer).getLikePriceDOM();

    medias.forEach((media) => {
        mediaFactory(media, photographer).getMediaCardDOM();
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographer, medias } = await getPhotographer();
    displayData(photographer, medias);
};

init();