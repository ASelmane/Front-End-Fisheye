/* eslint-disable no-unused-vars */
function mediaFactory(data, photographer) {
    const { date, id, image, video, likes, Photographers_ID, price, title } = data;
    const name = photographer.name.split(" ")[0];

    function getMediaCardDOM() {
        const mediaSection = document.querySelector(".media-section");
        const div = document.createElement("div");
        div.setAttribute("class", "card");
        const h3 = document.createElement("h3");
        const likeDiv = document.createElement("div");
        likeDiv.setAttribute("class", "like");
        likeDiv.setAttribute("onClick", "addLike(event)");
        const counter = document.createElement("h3");
        const heart = document.createElement("div");
        const button = document.createElement("button");
        heart.setAttribute("class", "heart");
        counter.setAttribute("class", "counter");
        counter.textContent = `${likes}`;
        likeDiv.append(counter);
        likeDiv.append(heart);
        h3.textContent = `${title}`;
        let source = "";
        let thumbnail = {};
        if (image) {
            source = `/assets/photographers/${name}/${image}`;
            thumbnail = document.createElement("img");
        } else {
            source = `/assets/photographers/${name}/${video}`;
            thumbnail = document.createElement("video");
        }
        thumbnail.setAttribute("src", source);
        thumbnail.setAttribute("class", "thumbnail");
        mediaSection.append(div);
        button.append(thumbnail);
        div.append(button, h3, likeDiv);
    }

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
}

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
    } else {
        count--;
        countGeneral--;
        div.classList.remove("liked");
    }
    counter.textContent = count;
    counterGeneral.textContent = countGeneral;
}
