const API_KEY = "b7048181b82a3678ad874fa00559a427";
let language = "es-ES";
let adult = "true";
let query = "Avatar";
let page = 1;
let type_media = "movie";//movie, tv, all
let type_trend = "movie";//movie, tv, all
let time_window = "week";//week, day 
let credit_id = 337;
let include_video = true;
let primary_release_date = 1990
let genres = "28%2c12"
let primary_release_date_gte = 1990;
let primary_release_date_lte = 1995;
let movie_id = 453395;
let sort_by = ["popularity.asc", "popularity.desc", "release_date.asc", "release_date.desc", "revenue.asc", "revenue.desc", "primary_release_date.asc", "primary_release_date.desc", "original_title.asc", "original_title.desc", "vote_average.asc", "vote_average.desc", "vote_count.asc", "vote_count.desc"];

//Buscar peliculas por nombre
let URL_THEMOVIEDBSEARCH = `https://api.themoviedb.org/3/search/${type_media}?include_adult=${adult}&page=${page}&query=${query}&language=${language}&api_key=${API_KEY}`;
//Devuelve los generos y sus IDs
let URL_THEMOVIEDBGENRE = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${language}`;
//Peliculas del momento
let URL_THEMOVIEDBTREND = `https://api.themoviedb.org/3/trending/${type_trend}/${time_window}?api_key=${API_KEY}`;
//Configuracion
let URL_THEMOVIEDBCONFIGURATION = `https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`;
//Paises
let URL_THEMOVIEDBCOUNTRIES = `https://api.themoviedb.org/3/configuration/countries?api_key=${API_KEY}`;
//Idiomas
let URL_THEMOVIEDBLANGUAGES = `https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`;
//Traducciones
let URL_THEMOVIEDBTRADUCTIONS = `https://api.themoviedb.org/3/configuration/primary_translations?api_key=${API_KEY}`;
//creditos
let URL_THEMOVIEDBCREDITS = `https://api.themoviedb.org/3/credit/${credit_id}?api_key=${API_KEY}`;
//Descubir peliculas por parametros
let URL_THEMOVIEDBDISCOVER = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${language}&sort_by=${sort_by[6]}&include_adult=${adult}&include_video=${include_video}&page=${page}&primary_release_date.lte${primary_release_date_lte}&primary_release_date.gte${primary_release_date_gte}&with_genres=${genres}`;
//Info pelicula
let URL_THEMOVIEDBINFOMOVIE = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=${language}`;
//Creditos pelicula
let URL_THEMOVIEDBCREDITSMOVIE = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=${language}`;
//Imagenes pelicula
let URL_MOVIEDBIMAGES = `https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${API_KEY}`;
//Obtener videos pelicula
let URL_MOVIEDBVIDEOS = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=${language}`;




function getTrending() {
    //Peliculas del momento
    let URL_THEMOVIEDBTREND = `https://api.themoviedb.org/3/trending/${type_trend}/${time_window}?api_key=${API_KEY}`;
    fetch(URL_THEMOVIEDBTREND)
        .then(response => response.json())
        .then(data => {
            let trendMovies = document.querySelector("#trendMovies");
            data.results.forEach(result => {
                console.log(result);
                trendMovies.appendChild(createCard(result))
            });

            function createCard(result) {
                let card = document.createElement("article");
                card.classList.add('card');
                let img = document.createElement("img")
                img.src = "https://www.themoviedb.org/t/p/w220_and_h330_face/"+result.poster_path;
                card.appendChild(img);
                let info= document.createElement("div");
                info.classList.add("info");
                let h2Info= document.createElement("h2");
                let pInfo= document.createElement("p");
                let aH2= document.createElement("a");
                aH2.textContent=result.title;
                aH2.href="#";
                pInfo.textContent=result.release_date;
                h2Info.appendChild(aH2);
                info.appendChild(h2Info);
                info.appendChild(pInfo);
                card.appendChild(info);
                return card;

            }
        });
}