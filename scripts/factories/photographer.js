/* exported photographerFactory */
function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/Photographers_ID/${portrait}`;

    // Create the DOM elements for the photographer article on index page
    function getUserCardDOM() {
        const article = document.createElement("article");
        const a = document.createElement("a");
        a.setAttribute("href", `photographer.html?id=${id}`);
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        const h2 = document.createElement("h2");
        h2.textContent = name;
        const h3 = document.createElement("h3");
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement("p");
        p.textContent = tagline;
        const span = document.createElement("span");
        span.textContent = `${price}€/jour`;
        a.append(img);
        a.append(h2);
        article.append(a,h3,p,span);
        return article;
    }

    // Create the DOM elements for the photographer information on photographer page
    function getUserProfilDOM() {
        const photographerHeader = document.querySelector(".photograph-header");
        const div = document.createElement("div");
        const h1 = document.createElement("h1");
        h1.textContent = name;
        const h2 = document.createElement("h2");
        h2.textContent = `${city}, ${country}`;
        const p = document.createElement("p");
        p.textContent = tagline;
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        photographerHeader.prepend(div);
        div.append(h1);
        div.append(h2);
        div.append(p);
        photographerHeader.append(img);

        const modalTitle = document.querySelector("#modal-title");
        modalTitle.textContent = `Contactez-moi ${name}`;
    }

    return { name, picture, getUserCardDOM, getUserProfilDOM };
}