const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3OTkyNy4wMjg2OTYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VE4_B-sg_0yz557YA98_GtbwS_ndY8fEz2SdFFNYyHA";
const MOVIE_ID = 28;
const BASE_URL = "https://api.themoviedb.org/3/movie";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

//movie details
function fetchMovieDetails(movieId) {
  return fetch(`${BASE_URL}/${movieId}?language=en-US`, options)
    .then((response) => response.json())
    .catch((err) => console.error("Error fetching movie details:", err));
}

//movie credits
function fetchMovieCredits(movieId) {
  return fetch(`${BASE_URL}/${movieId}/credits`, options)
    .then((response) => response.json())
    .catch((err) => console.error("Error fetching movie credits:", err));
}

function updateMovieDetails(movie) {
  document.getElementById("title").innerText = movie.title;
  document.getElementById("tagline").innerText = movie.tagline;
  document.getElementById("score").innerText = movie.vote_average.toFixed(1);
  document.getElementById("duration").innerText = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
  document.getElementById("genre").innerText = movie.genres.map((genre) => genre.name).join(", ");
  document.getElementById("storyline").innerText = movie.overview;
  document.getElementById("poster").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  //background image
  const backgroundOverlay = document.querySelector(".background-overlay");
  backgroundOverlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;

  updateStars(movie.vote_average);
}

function updateMovieCredits(credits) {
  const director = credits.crew.find((person) => person.job === "Director");
  const writers = credits.crew
    .filter((person) => person.job === "Writer")
    .map((writer) => writer.name)
    .join(", ");
  const stars = credits.cast.slice(0, 6).map((star) => star.name).join(", ");

  document.getElementById("director").innerText = director ? director.name : "-";
  document.getElementById("writers").innerText = writers || "-";
  document.getElementById("stars-cast").innerText = stars || "-";
}

// Star ratings based on vote average
function updateStars(voteAverage) {
  const starContainer = document.getElementById("stars");
  starContainer.innerHTML = "";

  const totalStars = 5;
  const fullStars = Math.floor(voteAverage / 2);
  const halfStar = voteAverage % 2 >= 1 ? 1 : 0;

  for (let i = 0; i < fullStars; i++) {
    starContainer.innerHTML += '<i class="fa-solid fa-star"></i>';
  }

  if (halfStar) {
    starContainer.innerHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
  }

  const emptyStars = totalStars - fullStars - halfStar;
  for (let i = 0; i < emptyStars; i++) {
    starContainer.innerHTML += '<i class="fa-regular fa-star"></i>';
  }
}

// Initialize the application
function init() {
  fetchMovieDetails(MOVIE_ID).then((movie) => updateMovieDetails(movie));
  fetchMovieCredits(MOVIE_ID).then((credits) => updateMovieCredits(credits));
}

document.addEventListener("DOMContentLoaded", init);

// Show trailer
const showTrailer = () => {
  fetch(`${BASE_URL}/${MOVIE_ID}/videos?language=en-US`, options)
    .then((response) => response.json())
    .then((data) => {
      const trailer = data.results.find((video) => video.type === "Trailer");
      if (trailer) {
        const trailerModal = document.getElementById("trailer-modal");
        const trailerVideo = document.getElementById("trailer-video");
        trailerVideo.src = `https://www.youtube.com/embed/${trailer.key}`;
        trailerModal.style.display = "block";
      } else {
        alert("Trailer not available");
      }
    })
    .catch((err) => console.error("Error fetching trailer:", err));
};

document.getElementById("trailer-button").addEventListener("click", showTrailer);
document.getElementById("watch-trailer").addEventListener("click", showTrailer);

document.querySelector(".close").addEventListener("click", () => {
  const trailerModal = document.getElementById("trailer-modal");
  const trailerVideo = document.getElementById("trailer-video");
  trailerModal.style.display = "none";
  trailerVideo.src = "";
});

window.onclick = (event) => {
  const trailerModal = document.getElementById("trailer-modal");
  if (event.target == trailerModal) {
    trailerModal.style.display = "none";
    const trailerVideo = document.getElementById("trailer-video");
    trailerVideo.src = "";
  }
};
