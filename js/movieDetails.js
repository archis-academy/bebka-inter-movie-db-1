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

function fetchMovieDetails(movieId) {
  return fetch(`${BASE_URL}/${movieId}?language=en-US`, options)
    .then((response) => response.json())
    .catch((err) => console.error("Error fetching movie details:", err));
}

function fetchMovieCredits(movieId) {
  return fetch(`${BASE_URL}/${movieId}/credits`, options)
    .then((response) => response.json())
    .catch((err) => console.error("Error fetching movie credits:", err));
}

function updateMovieDetails(movie) {
  document.getElementById("title").innerText = movie.title;
  document.getElementById("tagline").innerText = movie.tagline;
  document.getElementById("score").innerText = movie.vote_average.toFixed(1);
  document.getElementById("duration").innerText = `${Math.floor(
    movie.runtime / 60
  )}h ${movie.runtime % 60}m`;
  document.getElementById("genre").innerText = movie.genres
    .map((genre) => genre.name)
    .join(", ");
  document.getElementById("storyline").innerText = movie.overview;
  document.getElementById(
    "poster"
  ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  // Set background image of background-overlay
  const backgroundOverlay = document.querySelector(".background-overlay");
  backgroundOverlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;

  // Update stars based on vote_average
  updateStars(movie.vote_average);
}

function updateMovieCredits(credits) {
  const director = credits.crew.find((person) => person.job === "Director");
  const writers = credits.crew
    .filter((person) => person.job === "Writer")
    .map((writer) => writer.name)
    .join(", ");
  const stars = credits.cast
    .slice(0, 6)
    .map((star) => star.name)
    .join(", ");

  document.getElementById("director").innerText = director
    ? director.name
    : "-";
  document.getElementById("writers").innerText = writers || "-";
  document.getElementById("stars-cast").innerText = stars || "-";
}

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

function init() {
  fetchMovieDetails(MOVIE_ID).then((movie) => updateMovieDetails(movie));
  fetchMovieCredits(MOVIE_ID).then((credits) => updateMovieCredits(credits));
}

document.addEventListener("DOMContentLoaded", init);
