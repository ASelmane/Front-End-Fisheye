function mediaFactory(data, photographer) {
    const { date, id, image, video, likes, Photographers_ID, price, title } = data;
    const name = photographer.name.split(" ")[0]; 

    function getMediaCardDOM() {    
        const mediaSection = document.querySelector('.media-section');
        const div = document.createElement('div');
        const h3 = document.createElement( 'h3' );
        const likeDiv = document.createElement('div');
        likeDiv.setAttribute('class','like')
        const counter = document.createElement("h3");
        const like = document.createElement('h3');
        counter.setAttribute('class', 'counter');
        counter.textContent = `${likes}`;
        like.setAttribute('class', 'heart');
        like.textContent ="♥";
        likeDiv.append(counter);
        likeDiv.append(like);
        h3.textContent = `${title}`;
        let source = '';
        let thumbnail = {};
        if (image) {
            source = `assets/photographers/${name}/${image}`;
            thumbnail = document.createElement("img")
        } else {
            source = `/assets/photographers/${name}/${video}`;
            thumbnail = document.createElement("video")
        }
        thumbnail.setAttribute("src", source);
        thumbnail.setAttribute("class", 'thumbnail');
        mediaSection.append(div);
        div.append(thumbnail,h3,likeDiv);
    }

    function getLikePriceDOM() {
        let likes = 0;
        const photographInfo = document.querySelector('.photograph-info');
        data.forEach((media) => {
            likes += media.likes;
        });
        console.log(likes)
        const div = document.createElement('div');
        const h3 = document.createElement( 'h3' );
        const counterGeneral = document.createElement('h3');
        counterGeneral.setAttribute('class','counterGeneral');
        counterGeneral.textContent = `${likes}♥`;
        h3.textContent = `${photographer.price}€ / jour`;
        photographInfo.append(div);
        div.append(counterGeneral,h3);
    }
    
    

    return {date, likes, title, getMediaCardDOM, getLikePriceDOM}
}
