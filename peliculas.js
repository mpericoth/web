const API_KEY = "b7048181b82a3678ad874fa00559a427";
let language = "es-ES";
let type_trend = "movie";//movie, tv, all
let sort_by_opt = ["popularity.desc", "popularity.asc", "vote_average.desc", "vote_average.asc", "primary_release_date.desc", "primary_release_date.asc", "title.asc", "title.desc"];
let sort_by_name = ["Popularidad descendente", "Popularidad ascendente", "Valoración descendente", "Valoración ascendente", "Fecha de estreno descendente", "Fecha de estreno ascendente", "Título (A-Z)", "Título (Z-A)"];
let sort_by_sel = 0;

let include_video_query = "&include_video=";
let include_video = true;
let genres_query = "&with_genres=";
let genres;
let release_date_gte_query = "&primary_release_date.gte=";
let release_date_gte;
let release_date_lte_query = "&primary_release_date.lte=";;
let release_date_lte;


let page = 1;

createOptions();
getMovies();
function getURL() {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${language}&page=${page}&sort_by=${sort_by_opt[sort_by_sel]}&include_adult=false`;
    //filtros
    //fecha de estreno mayor que
    let releaseDateGte = document.querySelector("#release_date_gte");
    release_date_gte = releaseDateGte.value;
    //fecha de estreno menor que
    let releaseDateLte = document.querySelector("#release_date_lte");
    release_date_lte = releaseDateLte.value;
    //con video
    let video = document.querySelector("#include_video");
    include_video = video.checked;

    if (typeof include_video !== 'undefined') {
        url += include_video_query + include_video;
    }
    if (typeof genres !== 'undefined') {
        url += genres_query + genres;
    }
    if (typeof re !== 'undefined') {
        url += release_date_gte_query + release_date_gte;
    }
    if (typeof release_date_gte !== 'undefined') {
        url += release_date_gte_query + release_date_gte;
    }
    if (typeof release_date_lte !== 'undefined') {
        url += release_date_lte_query + release_date_lte;
    }

    return url;
}
function createOptions() {
    //ordenar
    let sortBy = document.querySelector("#sortBy");
    sort_by_opt.forEach((option, i) => {
        let opt = document.createElement("option")
        opt.value = i;
        opt.textContent = sort_by_name[i];
        sortBy.appendChild(opt);
    });
    sortBy.addEventListener("change", (event) => {
        sort_by_sel = event.target.value;
        console.log(event.target.value);
    })

    //boton buscar
    let buscar = document.querySelector("#buscar");
    buscar.addEventListener("click", () => {
        getMovies();
    });
}

function getMovies() {
    //Peliculas del momento
    let URL_THEMOVIEDBDISCOVER = getURL();


    fetch(URL_THEMOVIEDBDISCOVER)
        .then(response => response.json())
        .then(data => {
            let trendMovies = document.querySelector("#trendMovies");
            trendMovies.innerHTML = "";

            data.results.forEach(result => {
                console.log(result);
                trendMovies.appendChild(createCard(result))
            });
        });

    function createCard(result) {
        let card = document.createElement("article");
        card.classList.add('card');
        let aImg = document.createElement("a");
        aImg.href = `https://mpericoth.github.io/info.html?id=${result.id}`;
        let img = document.createElement("img")
        img.addEventListener('click', function handleClick(event) {
            console.log('element clicked 🎉🎉🎉', event.target);
        });
        img.src = "https://www.themoviedb.org/t/p/w220_and_h330_face/" + result.poster_path;
        aImg.appendChild(img)
        card.appendChild(aImg);
        let info = document.createElement("div");
        info.classList.add("info");
        let h2Info = document.createElement("h2");
        let pInfo = document.createElement("p");
        let aH2 = document.createElement("a");
        aH2.textContent = result.title;
        aH2.href = `/info.html?id=${result.id}`;
        pInfo.textContent = result.release_date;
        h2Info.appendChild(aH2);
        info.appendChild(h2Info);
        info.appendChild(pInfo);
        card.appendChild(info);
        return card;

    }
}