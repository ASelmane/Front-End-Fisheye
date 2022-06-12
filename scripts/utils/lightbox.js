/* exported getCardList */
const lightbox = document.getElementById("lightbox");
let leftArrow = document.querySelector(".left-arrow");
let rightArrow = document.querySelector(".right-arrow");
let currentCard = lightbox.querySelector(".media");
const closeBtn = document.querySelector(".btn-close");
let cards = "";

// Close lightbox
closeBtn.addEventListener("click", closeLightbox);

// get media list and set event listeners on each media
let getCardList = () => {
    cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.querySelector("button").addEventListener("click", () => {
            openLightbox(card);
        });
    });
};

// Set different action on the keyboard (left and right arrow, escape) + block focus on the lightbox
document.addEventListener("keydown", (e) => {
    if (lightbox.getAttribute("aria-hidden") === "false") {
        switch (e.key) {
        case "Escape":
            closeLightbox();
            break;
        case "ArrowLeft":
            if (lightbox.querySelector(".left-arrow")) {
                getPrevMedia();
            }
            break;
        case "ArrowRight":
            if (lightbox.querySelector(".right-arrow")) {
                getNextMedia();
            }
            break;
        case "Tab":
            if (document.activeElement === lightbox.querySelector(".closeup")) {
                if (e.shiftKey) {
                    e.preventDefault();
                    lightbox.querySelector(".btn-close").focus();
                }
            }
            if (document.activeElement === lightbox.querySelector(".btn-close")) {
                if (!e.shiftKey) {
                    e.preventDefault();
                    lightbox.querySelector(".closeup").focus();
                }
            }
        }
    }
});

rightArrow.addEventListener("click", getNextMedia);
leftArrow.addEventListener("click", getPrevMedia);

// Get next media on the lightbox
function getNextMedia() {
    currentCard = lightbox.querySelector(".media");
    for (let i = 0; i < cards.length; i++) {
        if (currentCard.firstChild.src === cards[i].firstChild.firstChild.src) {
            openLightbox(cards[i + 1]);
            break;
        }
    }
}

// Get previous media on the lightbox
function getPrevMedia() {
    currentCard = lightbox.querySelector(".media");
    for (let i = 0; i < cards.length; i++) {
        if (currentCard.firstChild.src === cards[i].firstChild.firstChild.src) {
            openLightbox(cards[i - 1]);
            break;
        }
    }
}

// Open lightbox on the selected media
function openLightbox(media) {
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
    lightbox.setAttribute("aria-hidden", "false");
    document.querySelector("main").setAttribute("aria-hidden", "true");
    lightbox.querySelector(".media").remove();
    let medias = media.cloneNode(true);
    medias.setAttribute("class", "media");
    medias.querySelector(".thumbnail").setAttribute("tabindex", "0");
    if (medias.querySelector(".thumbnail").tagName === "VIDEO") {
        medias.querySelector(".thumbnail").setAttribute("controls", "controls");
        medias.querySelector(".thumbnail").setAttribute("aria-label", `${medias.querySelector("h3").textContent}, video`); 
    }
    else {
        medias.querySelector(".thumbnail").setAttribute("alt", medias.querySelector("h3").textContent); 
    }
    medias.prepend(medias.querySelector(".thumbnail"));
    medias.querySelector(".thumbnail").setAttribute("class", "closeup");
    medias.querySelector("h3").setAttribute("id", "media-title");
    medias.querySelector("button").remove();
    medias.querySelector(".like").remove();
    lightbox.insertBefore(medias, lightbox.childNodes[2]);

    if (media === cards[0]) {
        leftArrow.remove();
    } else if (media !== cards[0] && !lightbox.querySelector(".left-arrow")) {
        lightbox.insertBefore(leftArrow, rightArrow);
    }

    if (media === cards[cards.length - 1]) {
        rightArrow.remove();
    } else if (media !== cards[cards.length - 1] && !lightbox.querySelector(".right-arrow")) {
        lightbox.insertBefore(rightArrow, closeBtn);
    }

    lightbox.querySelector(".closeup").focus();
}

// Close lightbox
function closeLightbox() {
    let imgSrc = lightbox.querySelector(".media").firstChild.src;
    let src = window.location.href.split(window.location.pathname)[0];
    imgSrc = imgSrc.replace(src, "");
    document.body.style.overflow = "auto";
    document.querySelector("main").setAttribute("aria-hidden", "false");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.classList.remove("show");
    document.querySelector(".thumbnail[src='" + imgSrc + "']").parentNode.focus();
}
