/* eslint-disable no-undef */
let filter = document.querySelector(".filter");
let popularity = document.querySelector(".popularity");
let date = document.querySelector(".date");
let title = document.querySelector(".title");
let arrow = document.querySelector(".arrow");
let photograph = {};
let mediaSort = {};

//Change l'ordre des medias
filter.addEventListener("click", () => {
    filter.classList.toggle("active");
});

popularity.addEventListener("click", () => {
    if(!popularity.classList.contains("select")) {
        document.querySelector(".media-section").innerHTML = "";
        document.querySelector(".photograph-info").innerHTML = "";
        mediaSort.sort(getSortMedia("likes"));
        mediaSort.forEach((media) => {
            mediaFactory(media, photograph).getMediaCardDOM();
        });
        mediaFactory(mediaSort, photograph).getLikePriceDOM();
        if(date.classList.contains("select")){
            filter.insertBefore(popularity, filter.firstChild);
            popularity.append(arrow);
            date.classList.remove("select");
            popularity.classList.add("select");
        }
        else if(title.classList.contains("select")){
            filter.insertBefore(popularity, filter.firstChild);
            popularity.append(arrow);
            title.classList.remove("select");
            popularity.classList.add("select");
        }
    }
});

date.addEventListener("click", () => {
    if(!date.classList.contains("select")) {
        document.querySelector(".media-section").innerHTML = "";
        document.querySelector(".photograph-info").innerHTML = "";
        mediaSort.sort(getSortMedia("date"));
        mediaSort.forEach((media) => {
            mediaFactory(media, photograph).getMediaCardDOM();
        });
        mediaFactory(mediaSort, photograph).getLikePriceDOM();
        if(popularity.classList.contains("select")){
            filter.insertBefore(date, filter.firstChild);
            date.append(arrow);
            popularity.classList.remove("select");
            date.classList.add("select");
        }
        else if(title.classList.contains("select")){
            filter.insertBefore(date, filter.firstChild);
            date.append(arrow);
            title.classList.remove("select");
            date.classList.add("select");
        }
    }
});

title.addEventListener("click", () => {
    if(!title.classList.contains("select")) {
        document.querySelector(".media-section").innerHTML = "";
        document.querySelector(".photograph-info").innerHTML = "";
        mediaSort.sort(getSortMedia("title"));
        mediaSort.forEach((media) => {
            mediaFactory(media, photograph).getMediaCardDOM();
        });
        mediaFactory(mediaSort, photograph).getLikePriceDOM();
        if(date.classList.contains("select")){
            filter.insertBefore(title, filter.firstChild);
            title.append(arrow);
            date.classList.remove("select");
            title.classList.add("select");
        }
        else if(popularity.classList.contains("select")){
            filter.insertBefore(title, filter.firstChild);
            title.append(arrow);
            popularity.classList.remove("select");
            title.classList.add("select");
        }
    }
});

//sort media with different filter (likes, dates, titles)
function getSortMedia(filter) {
    if(filter === "title") {
        return function (a, b) {
            if (a[filter] > b[filter]) {
                return 1;
            } else if (a[filter] < b[filter]) {
                return -1;
            }
            return 0;
        };
    } else {
        return function (a, b) {
            if (a[filter] > b[filter]) {
                return -1;
            } else if (a[filter] < b[filter]) {
                return 1;
            }
            return 0;
        };
    }
}

async function getPhotographer() {
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    try {
        let response = await fetch("data/photographers.json");
        const data = await response.json();
        const photographer = data.photographers.filter((photographer) => photographer.id == id)[0];
        const medias = data.media.filter((element) => element.photographerId == id);
        photograph = photographer;
        mediaSort = medias;
        return { photographer, medias };
    } catch (error) {
        console.error(error);
    }
}

async function displayData(photographer, medias) {
    photographerFactory(photographer).getUserProfilDOM();
    mediaFactory(medias, photographer).getLikePriceDOM();

    medias.forEach((media) => {
        mediaFactory(media, photographer).getMediaCardDOM();
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographer, medias } = await getPhotographer();
    medias.sort(getSortMedia("likes"));
    displayData(photographer, medias);
}

init();
