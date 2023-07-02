const api_key = "api_key=58434569999e2dfe114aa320a18def4e";
const base_Url = "https://api.themoviedb.org/3/";
const api_Url = base_Url + "trending/movie/day?language=en-US&" + api_key;
const img_Url = "https://image.tmdb.org/t/p/w500";
const search_Url = base_Url + "/search/movie?" + api_key;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(api_Url);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date, overview } = movie;
    const movieEle = document.createElement("div");
    movieEle.classList.add("movie");
    movieEle.innerHTML = `<img
          src="${img_Url + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <h4 class="date">Release Date: ${release_date}</h4>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `;

    main.appendChild(movieEle);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(search_Url + "&query=" + searchTerm);
  } else {
    getMovies(api_Url);
  }
});
