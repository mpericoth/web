const API_KEY = "b7048181b82a3678ad874fa00559a427";
let language = "es-ES";
let movie_id =  $_GET("id");
;
getInfo();
function getInfo() {
    //informacion de la pelicula
    let URL_THEMOVIEDBINFOMOVIE = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=${language}&append_to_response=videos,credits`;


    fetch(URL_THEMOVIEDBINFOMOVIE)
        .then(response => response.json())
        .then(data => {
            let info = document.querySelector("#info");
            console.log(data);
            render(data);
        });

}

function render(pelicula){

   /*InfoPrimaria*/
    let divInfoPrimaria = document.createElement("div");
    let h1Titulo = document.createElement("h1");
    let iframeTrailer = document.createElement("iframe");
    let pDescripcion = document.createElement("p");
    divInfoPrimaria.id = "infoPrimaria";
    divInfoPrimaria.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${pelicula.backdrop_path}")`;
    h1Titulo.classList.add("titulo");
    h1Titulo.appendChild(document.createTextNode(pelicula.title));
    if (typeof (pelicula.videos.results[0]) !== "undefined") {
        iframeTrailer.classList.add("trailer");
        iframeTrailer.allow = "autoplay; encrypted-media";
        iframeTrailer.src = `https://www.youtube.com/embed/${pelicula.videos.results[0].key}?rel=0&amp;controls=1&amp;showinfo=0`;
        iframeTrailer.allow = "fullscreen";
    }
    pDescripcion.classList.add("descripcion");
    pDescripcion.appendChild(document.createTextNode(pelicula.overview));
    divInfoPrimaria.appendChild(h1Titulo);
    if (typeof (pelicula.videos.results[0]) !== "undefined")
        divInfoPrimaria.appendChild(iframeTrailer);
    divInfoPrimaria.appendChild(pDescripcion);
    document.getElementsByTagName("main")[0].appendChild(divInfoPrimaria);
    /*InfoSecundaria*/
    let divInfoSecundaria = document.createElement("div");
    let divMetadatos = document.createElement("div");
    let divMeta = document.createElement("div");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    divInfoSecundaria.id = "infoSecundaria";
    divMetadatos.id = "metaDatos";
    divMeta.classList.add("meta");
    h2.appendChild(document.createTextNode("Titulo original"));
    p.appendChild(document.createTextNode(pelicula.original_title))
    divMeta.appendChild(h2);
    divMeta.appendChild(p);
    divMetadatos.appendChild(divMeta);
    /***/
    divMeta = document.createElement("div");
    h2 = document.createElement("h2");
    p = document.createElement("p");
    divMeta.classList.add("meta");
    h2.appendChild(document.createTextNode("Duracion"));
    p.appendChild(document.createTextNode(pelicula.runtime))
    divMeta.appendChild(h2);
    divMeta.appendChild(p);
    divMetadatos.appendChild(divMeta);
    /***/
    divMeta = document.createElement("div");
    h2 = document.createElement("h2");
    p = document.createElement("p");
    divMeta.classList.add("meta");
    h2.appendChild(document.createTextNode("Lengua original"));
    p.appendChild(document.createTextNode(pelicula.original_language))
    divMeta.appendChild(h2);
    divMeta.appendChild(p);
    divMetadatos.appendChild(divMeta);
    /***/
    divMeta = document.createElement("div");
    h2 = document.createElement("h2");
    p = document.createElement("p");
    divMeta.classList.add("meta");
    h2.appendChild(document.createTextNode("Presupuesto"));
    p.appendChild(document.createTextNode(pelicula.budget))
    divMeta.appendChild(h2);
    divMeta.appendChild(p);
    divMetadatos.appendChild(divMeta);
    /***/
    divMeta = document.createElement("div");
    h2 = document.createElement("h2");
    divMeta.classList.add("meta");
    h2.appendChild(document.createTextNode("Generos"));
    divMeta.appendChild(h2);
    pelicula.genres.forEach(genero => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(genero.name));
        divMeta.appendChild(li);

    });
    divMetadatos.appendChild(divMeta);
    /***/
    divMeta = document.createElement("div");
    h2 = document.createElement("h2");
    divMeta.classList.add("meta");
    h2.appendChild(document.createTextNode("Productoras"));
    divMeta.appendChild(h2);
    pelicula.production_companies.forEach(productora => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(productora.name));
        divMeta.appendChild(li);

    });
    divMetadatos.appendChild(divMeta);

    /*media*/
    let divMedia = document.createElement("div");
    divMedia.id = "media";
    let divActores = document.createElement("div");
    divActores.classList.add("actores");
    divActores.classList.add("scroll");
    pelicula.credits.cast.forEach(actor => {
        let divActor = document.createElement("div");
        let imgActor = document.createElement("img");
        let divCaption = document.createElement("div");
        let pNombre = document.createElement("p");
        divActor.classList.add("actor");
        imgActor.src = `https://image.tmdb.org/t/p/original${actor.profile_path}`;
        imgActor.onerror = `this.onerror=null;this.src='../img/notfound.png';"`;
        imgActor.alt = actor.name;
        pNombre.appendChild(document.createTextNode(actor.name));
        divCaption.classList.add("caption");
        divCaption.appendChild(pNombre);
        divActor.appendChild(imgActor);
        divActor.appendChild(divCaption);
        divActores.appendChild(divActor);
    });
    divMedia.appendChild(divActores);

    /***/
    let divVideos = document.createElement("div");
    divVideos.classList.add("videos");
    divVideos.classList.add("scroll");

    pelicula.videos.results.forEach(video => {
        let iframeVideo = document.createElement("iframe");
        iframeVideo.classList.add("video");
        iframeVideo.src = `https://www.youtube.com/embed/${video.key}?rel=0&controls=0&showinfo=0`;
        divVideos.appendChild(iframeVideo);

    });
    divMedia.appendChild(divVideos);

    divInfoSecundaria.appendChild(divMetadatos);
    divInfoSecundaria.appendChild(divMedia);
    document.querySelector("#info").appendChild(divInfoSecundaria);
}

function $_GET(s) {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get(s);
    return c;
}

let sa = ` <div id="infoPrimaria"
style="background-image: url(&quot;https://image.tmdb.org/t/p/original//zGLHX92Gk96O1DJvLil7ObJTbaL.jpg&quot;);">
<h1 class="titulo">Animales fantásticos: Los secretos de Dumbledore</h1><iframe class="trailer"
    allow="fullscreen"
    src="https://www.youtube.com/embed/oImEeiCiYTk?rel=0&amp;amp;controls=1&amp;amp;showinfo=0"></iframe><a
    class="botonPlay" href="video?gId=null">Reproducir</a>
<p class="descripcion">El profesor Albus Dumbledore sabe que el poderoso mago oscuro Gellert Grindelwald
    está haciendo planes para apoderarse del mundo mágico. Incapaz de detenerlo él solo, confía en el
    Magizoólogo Newt Scamander para dirigir un intrépido equipo de magos, brujas y un valiente panadero
    Muggle en una misión peligrosa, donde se encuentran con antiguos y nuevos animales y se enfrentan a
    una legión cada vez más numerosa de seguidores de Grindelwald.</p>
</div>
<div id="infoSecundaria">
<div id="metaDatos">
    <div class="meta">
        <h2>Titulo original</h2>
        <p>Fantastic Beasts: The Secrets of Dumbledore</p>
    </div>
    <div class="meta">
        <h2>Duracion</h2>
        <p>143</p>
    </div>
    <div class="meta">
        <h2>Lengua original</h2>
        <p>en</p>
    </div>
    <div class="meta">
        <h2>Presupuesto</h2>
        <p>200000000</p>
    </div>
    <div class="meta">
        <h2>Generos</h2>
        <li>Fantasía</li>
        <li>Aventura</li>
        <li>Acción</li>
    </div>
    <div class="meta">
        <h2>Productoras</h2>
        <li>Warner Bros. Pictures</li>
        <li>Heyday Films</li>
    </div>
</div>
<div id="media">
    <div class="actores scroll">
        <div class="actor"><img
                src="https://image.tmdb.org/t/p/original/A6Y0m7qEe04ZTHKyYDLbnyCHNzn.jpg"
                alt="Jude Law">
            <div class="caption">
                <p>Jude Law</p>
            </div>
        </div>
        <div class="actor"><img src="https://image.tmdb.org/t/p/originalnull" alt="Nick Davison">
            <div class="caption">
                <p>Nick Davison</p>
            </div>
        </div>
        <div class="actor"><img src="https://image.tmdb.org/t/p/originalnull" alt="Emilia Karlsson">
            <div class="caption">
                <p>Emilia Karlsson</p>
            </div>
        </div>
        <div class="actor"><img src="https://image.tmdb.org/t/p/originalnull" alt="Sean Talo">
            <div class="caption">
                <p>Sean Talo</p>
            </div>
        </div>
    </div>
    <div class="videos scroll"><iframe class="video"
            src="https://www.youtube.com/embed/oImEeiCiYTk?rel=0&amp;controls=0&amp;showinfo=0"></iframe><iframe
            class="video"
            src="https://www.youtube.com/embed/ZfPlsOgawWY?rel=0&amp;controls=0&amp;showinfo=0"></iframe><iframe
            class="video"
            src="https://www.youtube.com/embed/ptROxMmGlXo?rel=0&amp;controls=0&amp;showinfo=0"></iframe>
    </div>
</div>
</div>`;