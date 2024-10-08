//Cerenucakb/BE-12-Create-Trending-Movies-Section
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3OTkyNy4wMjg2OTYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VE4_B-sg_0yz557YA98_GtbwS_ndY8fEz2SdFFNYyHA';
const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

const slider = document.querySelector('#tm-slider');
let currentSlide = 0;
let movies = [];  

document.querySelector('.control-right-btn').addEventListener('click', () => {
    currentSlide++;
    if (currentSlide > movies.length)  currentSlide = 0;  
    slider.style.transform = `translateX(-${currentSlide * 850}px)`;   
    addMovieToSlider(currentSlide);  
});

document.querySelector('.control-left-btn').addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) currentSlide = movies.length - 1;  
    slider.style.transform = `translateX(-${currentSlide * 850}px)`;  
});
function updateFirstMovieCard() {
  const item = movies[0];  
  const card = document.querySelector('.trending-movie-card1');  
  card.querySelector('h1').textContent = item.title;
  card.querySelector('.trending-movie-details span').textContent = `★★★★★ ${item.vote_average}`;
  card.querySelector('.trending-movie-details span:nth-child(2)').textContent = item.runtime ? `| ${item.runtime} mins` : '| Runtime unknown';
  card.querySelector('p').textContent = item.overview;
  card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
}

fetch(url, {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3OTkyNy4wMjg2OTYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VE4_B-sg_0yz557YA98_GtbwS_ndY8fEz2SdFFNYyHA',
      'accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      movies = data.results.slice(0, 20);  
      updateFirstMovieCard();
      movies.map((movie,index) => {
        addMovieToSlider(index+1);
        document.querySelector('#tm-slider').classList.add('visible');
      })})
    .catch(err => console.error('Error fetching data:', err));

function addMovieToSlider(index) {
    const tmSlider = document.querySelector('#tm-slider');
    const existingCard = tmSlider.querySelectorAll('.trending-movie-card');  
    if (existingCard.length >= index + 1) return;  
    const item = movies[index];   
    const card = document.querySelector('.trending-movie-card1').cloneNode(true);   
    card.querySelector('h1').textContent = item.title;   
    card.querySelector('.trending-movie-details span').textContent = `★★★★★ ${item.vote_average}`;   
    card.querySelector('.trending-movie-details span:nth-child(2)').textContent = item.runtime ? `| ${item.runtime} mins` : '| Runtime unknown';
    card.querySelector('p').textContent = item.overview;  
    card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;  
    card.querySelector('.control-right-btn').
    
  addEventListener('click', () => {
      currentSlide++;
      if (currentSlide > movies.length - 1) currentSlide = 0;
      slider.style.transform = `translateX(-${currentSlide * 850}px)`;
  });

  card.querySelector('.control-left-btn').addEventListener('click', () => {
      currentSlide--;
      if (currentSlide < 0) currentSlide = movies.length - 1;
      slider.style.transform = `translateX(-${currentSlide * 850}px)`;
  });
    tmSlider.appendChild(card); 
}

//END-Cerenucakb/BE-12-Create-Trending-Movies-Section
//Melek/BE-20/Implement the FAQ section/JavaScript/Start
const akordiyon = document.getElementsByClassName("content-box");

for (var i = 0; i < akordiyon.length; i++) {
  akordiyon[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

//Melek/BE-20/Implement the FAQ section/JavaScript/End
