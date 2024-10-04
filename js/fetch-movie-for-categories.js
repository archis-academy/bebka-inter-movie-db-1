const BASE_URL = "https://api.themoviedb.org/3/";

const access_token =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3OTkyNy4wMjg2OTYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VE4_B-sg_0yz557YA98_GtbwS_ndY8fEz2SdFFNYyHA";
const baseImageUrl = "https://image.tmdb.org/t/p/w500";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: access_token,
  },
};

document.addEventListener("DOMContentLoaded", () => {
  fetch(BASE_URL + `genre/movie/list?language=en`, options)
    .then((response) => response.json())
    .then((response) => {
      let categories = getRandomElements(response.genres, 6);
      Promise.all(
        categories.map((category, index) => {
          return fetch(
            BASE_URL +
              `discover/movie?with_genres=${category.id}&language=tr&sort_by=popularity.desc&vote_count.gte=100&include_adult=false&page=1`,
            options
          )
            .then((response) => response.json())
            .then((response) => {
              return getRandomElements(response.results, 1)[0];
            })
            .catch((err) => console.error(err));
        })
      ).then((movies) => {
        console.log(movies)

        let left_bottom_html = ``;
        let right_top_html = ``;
        let cardLarge = ``;
        let superHeros = ``;

        movies.forEach((movie, index) => {
          if (index <= 1) {
            left_bottom_html += `
                <div class="card small">
                    <img src="https://image.tmdb.org/t/p/w500/${
                      movie.backdrop_path
                    }" alt="${categories[index].name}" />
                    <div class="content">
                      <h2>${categories[index].name}</h2>
                      <p>${Math.round(movie.popularity / 10)}K Films</p>
                    </div>
                  </div>
                  `;
          } else if (index > 1 && index <= 3) {
            right_top_html += `
                <div class="card small">
                  <img src="https://image.tmdb.org/t/p/w500/${
                    movie.backdrop_path
                  }" alt="${categories[index].name}" />
                  <div class="content">
                    <h2>${categories[index].name}</h2>
                    <p>${Math.round(movie.popularity / 10)}K Films</p>
                  </div>
                </div>
              `;
          } else if (index === 4) {
            cardLarge += `
                <img src="https://image.tmdb.org/t/p/w500/${
                  movie.backdrop_path
                }" alt="${categories[index].name}" />
                <div class="content">
                  <h2>${categories[index].name}</h2>
                  <p>${Math.round(movie.popularity / 10)}K Films</p>
                  <a href="#" class="explore-btn">EXPLORE</a>
                </div>
              `;
          } else {
            superHeros += `
                <img src="https://image.tmdb.org/t/p/w500/${
                  movie.backdrop_path
                }" alt="${categories[index].name}" />
                <div class="content">
                  <h2>${categories[index].name}</h2>
                  <p>${Math.round(movie.popularity / 10)}K Films</p>
                  <a href="#" class="explore-btn">EXPLORE</a>
                </div>
              `;
          }
        });

        document.getElementById("left-bottom").innerHTML += left_bottom_html;
        document.getElementById("right-top").innerHTML += right_top_html;
        document.getElementById("cardLarge").innerHTML += cardLarge;
        document.getElementById("super-heroes").innerHTML += superHeros;
      });
    })
    .catch((err) => console.error(err));
});

// --- KNUTH algoritması---
function getRandomElements(arr, num) {
  if (num > arr.length) {
    throw new Error("Numara dizinin uzunluğundan büyük olamaz.");
  }

  let shuffled = arr.slice(0);
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, num);
}
