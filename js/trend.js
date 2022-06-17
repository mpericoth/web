const API_KEY = "b7048181b82a3678ad874fa00559a427";
let language = "es-ES";
let type_trend = "movie";//movie, tv, all
let time_window = "week";//week, day 

let miStorage = window.localStorage;

let trendTitle = document.querySelector("#trendTitle");
let time_window_radio = document.querySelectorAll(".time_window_radio");

getTrending(time_window);

function getTrending(time_window) {
    //Peliculas del momento
    let URL_THEMOVIEDBTREND = `https://api.themoviedb.org/3/trending/${type_trend}/${time_window}?language=${language}&api_key=${API_KEY}`;

    fetch(URL_THEMOVIEDBTREND)
        .then(response => response.json())
        .then(data => {
            let trendMovies = document.querySelector("#trendMovies");
            trendMovies.innerHTML = "";
            data.results.forEach(result => {
                trendMovies.appendChild(createCard(result))
            });
        });

    function createCard(result) {
        let card = document.createElement("article");
        card.classList.add('card');
        let aImg= document.createElement("a");
        aImg.href = `/info.html?id=${result.id}`;
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


//Cambia la seleccion de tendencias
time_window_radio.forEach(radio => {
    radio.addEventListener("click", (e) => {
        if (e.target.value == "day") {
            trendTitle.textContent = "Lo mas popular del dia";
        } else {
            trendTitle.textContent = "Lo mas popular de la semana";
        }
        getTrending(e.target.value);
    });
});