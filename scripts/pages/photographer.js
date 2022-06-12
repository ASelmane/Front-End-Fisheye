/* eslint-disable no-undef */
let filter = document.querySelector(".filter");
let popularity = document.querySelector(".popularity");
let date = document.querySelector(".date");
let title = document.querySelector(".title");
let arrow = document.querySelector(".arrow");
let photograph = {};
let mediaSort = {};


//Show or hide the filter selection
filter.addEventListener("click", () => {
    if (filter.classList.contains("active")) {
        filter.ariaExpanded = true;
        filter.classList.remove("active");
        filter.querySelector("button").focus();
    }
    else {
        filter.ariaExpanded = false;
        filter.classList.add("active");
    }
});

// Leave filter selection with the Escape key
document.addEventListener("keydown", (e) => {
    if (filter.classList.contains("active")) {
        if (e.key === "Escape") {
            filter.classList.remove("active");
            document.activeElement.blur();
            filter.querySelector("button").focus();
        }
    }
});

// Sort the media by like
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
            date.setAttribute("aria-selected", "false");
        }
        else if(title.classList.contains("select")){
            filter.insertBefore(popularity, filter.firstChild);
            popularity.append(arrow);
            title.classList.remove("select");
            popularity.classList.add("select");
            title.setAttribute("aria-selected", "false");
        }
        popularity.setAttribute("aria-selected", "true");
        filter.setAttribute("aria-activedescendant", "popularity");
        getCardList();
    }
});

// Sort the media by date
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
            popularity.setAttribute("aria-selected", "false");
        }
        else if(title.classList.contains("select")){
            filter.insertBefore(date, filter.firstChild);
            date.append(arrow);
            title.classList.remove("select");
            date.classList.add("select");
            title.setAttribute("aria-selected", "false");
        }
        date.setAttribute("aria-selected", "true");
        filter.setAttribute("aria-activedescendant", "date");
        getCardList();
    }
});

// Sort the media by title
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
            date.setAttribute("aria-selected", "false");
        }
        else if(popularity.classList.contains("select")){
            filter.insertBefore(title, filter.firstChild);
            title.append(arrow);
            popularity.classList.remove("select");
            title.classList.add("select");
            popularity.setAttribute("aria-selected", "false");
        }
        title.setAttribute("aria-selected", "true");
        filter.setAttribute("aria-activedescendant", "title");
        getCardList();
    }
});

// Sort media with different filter (likes, dates, titles)
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

// Get the list of the medias from json file
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

// create the DOM elements for each medias
async function displayData(photographer, medias) {
    photographerFactory(photographer).getUserProfilDOM();
    mediaFactory(medias, photographer).getLikePriceDOM();

    medias.forEach((media) => {
        mediaFactory(media, photographer).getMediaCardDOM();
    });

    getCardList();
}

async function init() {
    const { photographer, medias } = await getPhotographer();
    medias.sort(getSortMedia("likes"));
    displayData(photographer, medias);
}

init();
