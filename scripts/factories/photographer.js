function photographerFactory(data) {
    const { name, portrait, city, country,tagline, price, id } = data;

    const picture = `assets/photographers/Photographers_ID/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a = document.createElement( 'a' );
        a.setAttribute("href", `photographer.html?id=${id}`)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement( 'p' );
        p.textContent = tagline;
        const span = document.createElement( 'span' );
        span.textContent = `${price}€/jour`;
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(h3);
        a.appendChild(p);
        a.appendChild(span);
        return (article);
    }
    

    function getUserProfilDOM() {
        const photographerHeader = document.querySelector('.photograph-header');
        const div = document.createElement('div');
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement( 'p' );
        p.textContent = tagline;
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        photographerHeader.prepend(div);
        div.append(h2);
        div.append(h3);
        div.append(p);
        photographerHeader.append(img)

        const modalTitle = document.querySelector('#modal-title');
        const modalName = document.createElement( 'h2' );
        modalName.textContent = name;
        modalTitle.append(modalName)
    }
    
    return { name, picture, getUserCardDOM, getUserProfilDOM }
}

