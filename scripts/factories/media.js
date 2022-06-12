/* exported mediaFactory */
let mediaFactory = (data, photographer) => {
    const { date, image, video, likes, title } = data;
    const name = photographer.name.split(" ")[0];

    // Create the DOM elements for the media in the gallery
    function getMediaCardDOM() {
        const mediaSection = document.querySelector(".media-section");
        const div = document.createElement("div");
        div.setAttribute("class", "card");
        const h3 = document.createElement("h3");
        const likeBtn = document.createElement("button");
        likeBtn.setAttribute("class", "like");
        likeBtn.addEventListener("click", addLike);
        likeBtn.setAttribute("aria-label", "J'aime");
        const counter = document.createElement("h4");
        const heart = document.createElement("div");
        const button = document.createElement("button");
        heart.setAttribute("class", "heart");
        counter.setAttribute("class", "counter");
        counter.textContent = `${likes}`;
        likeBtn.append(counter);
        likeBtn.append(heart);
        h3.textContent = `${title}`;
        let source = "";
        let thumbnail = {};
        if (image) {
            source = `/assets/photographers/${name}/${image}`;
            thumbnail = document.createElement("img");
            thumbnail.setAttribute("alt", `${title}, closeup view`);
        } else {
            source = `/assets/photographers/${name}/${video}`;
            thumbnail = document.createElement("video");
            button.setAttribute("aria-label", `video, ${title}, closeup view`);
        }
        thumbnail.setAttribute("src", source);
        thumbnail.setAttribute("class", "thumbnail");
        mediaSection.append(div);
        button.append(thumbnail);
        div.append(button, h3, likeBtn);
    }

    // Create the DOM elements for the photograph information in bottom right corner
    function getLikePriceDOM() {
        let likes = 0;
        const photographInfo = document.querySelector(".photograph-info");
        data.forEach((media) => {
            likes += media.likes;
        });
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const like = document.createElement("div");
        like.setAttribute("class", "heart");
        const counterGeneral = document.createElement("h3");
        counterGeneral.setAttribute("class", "counterGeneral");
        counterGeneral.textContent = `${likes}`;
        h3.textContent = `${photographer.price}€ / jour`;
        photographInfo.append(div);
        div.append(counterGeneral, like);
        photographInfo.append(h3);
    }

    return { date, likes, title, getMediaCardDOM, getLikePriceDOM };
};

// Add a like to a media + add like in the photographer information 
function addLike(e) {
    const div = e.currentTarget;
    let counter = div.querySelector(".counter");
    let counterGeneral = document.querySelector(".counterGeneral");
    let count = parseInt(counter.textContent, 10);
    let countGeneral = parseInt(counterGeneral.textContent, 10);
    if (!div.classList.contains("liked")) {
        count++;
        countGeneral++;
        div.classList.add("liked");
        div.setAttribute("aria-label", "Image aimée");
        div.focus();
    } else {
        count--;
        countGeneral--;
        div.classList.remove("liked");
        div.setAttribute("aria-label", "j'aime");
        div.focus();
    }
    counter.textContent = count;
    counterGeneral.textContent = countGeneral;
}
