//Melek/BE-20/Implement the FAQ section/JavaScript/Start 
const akordiyon = document.getElementsByClassName("content-box")

for (var i=0 ; i<akordiyon.length; i++) {
    akordiyon[i].addEventListener("click", function (){
        this.classList.toggle("active");
    });
}

//Melek/BE-20/Implement the FAQ section/JavaScript/End 
// Büşra - Header responsiveness - Hamburger menu control - START
$(document).ready(function(){
	$('#nav-icon1').click(function(){
    let nav_icon = $(this)
    if(nav_icon.hasClass('open')) {
      nav_icon.removeClass('left-400')
      nav_icon.removeClass('top--30')
      nav_icon.removeClass('open')

      $('.nav').css('display', 'flex')
      $('.mobile-header').css('display', 'none')
      $('.mobile-header').css('transition','2s ease-in-out')

    } else {
      nav_icon.addClass('left-400')
      nav_icon.addClass('top--30')
      nav_icon.addClass('open')

      $('.mobile-header').css('display', 'block')
    }
    
	});

  $(window).resize(function() {
    let width = $(window).width();
    if(width > 1270) {
      $('#nav-icon1').removeClass('left-400')
      $('#nav-icon1').removeClass('top--30')
      $('#nav-icon1').removeClass('open')

      $('.nav').css('display', 'flex')
      $('.mobile-header').css('display', 'none')
      $('.mobile-header').css('transition','2s ease-in-out')
    }
  });
});

// Büşra - Header responsiveness - Hamburger menu control - END
//Asli/BE-25-Make-Hero-Section-Dynamic-Başlangıç
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3OTkyNy4wMjg2OTYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VE4_B-sg_0yz557YA98_GtbwS_ndY8fEz2SdFFNYyHA';


const DEFAULT_VIDEO_URL = 'https://www.youtube.com/embed/r5X-hFf6Bwo?rel=0';

async function fetchPopularMovies() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomMovie = data.results[randomIndex];

    fetchMovieData(randomMovie.id);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    setDefaultVideo(); 
  }
}

async function fetchMovieData(movieId) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movieData = await response.json();
    document.getElementById('movieTitle').textContent = movieData.title;
    document.getElementById('releaseDate').textContent = `On the air: ${movieData.release_date}`;

    const overview = movieData.overview || 'Açıklama mevcut değil.';
    const shortOverview = overview.length > 100 ? overview.substring(0, 50) + '...' : overview;
    document.querySelector('.hero-content p').textContent = shortOverview;

    fetchTrailer(movieId); 
  } catch (error) {
    console.error('Error fetching movie data:', error);
    setDefaultVideo(); 
  }
}

async function fetchTrailer(movieId) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const videosData = await response.json();

    if (videosData.results.length > 0) {
      const trailer = videosData.results.find(video => video.type === 'Trailer');
      if (trailer) {
        document.getElementById('myVideo').src = `https://www.youtube.com/embed/${trailer.key}?rel=0`;
      } else {
        setDefaultVideo(); 
      }
    } else {
      setDefaultVideo(); 
    }
  } catch (error) {
    setDefaultVideo(); 
  }
}

function setDefaultVideo() {
  
  document.getElementById('myVideo').src = DEFAULT_VIDEO_URL;
}

window.onload = fetchPopularMovies;

function playVideo() {
  const iframe = document.getElementById('myVideo');
  iframe.src += "&autoplay=1";

  document.getElementById('watchTrailerBtn').style.visibility = 'hidden';
  document.getElementById('watchTrailerText').style.visibility = 'hidden';
  iframe.style.pointerEvents = 'auto';
}
//Asli/BE-25-Make-Hero-Section-Dynamic-Bitiş
//Cerenucakb/BE-12-Create-Trending-Movies-Section
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3OTkyNy4wMjg2OTYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VE4_B-sg_0yz557YA98_GtbwS_ndY8fEz2SdFFNYyHA';
const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

const slider = document.querySelector('#tm-slider');
let currentSlide = 0;
let movies = [];  

document.querySelector('.control-right-btn').addEventListener('click', () => {
    currentSlide++;
    const cardWidth = document.querySelector(".trending-movie-card").clientWidth;
    if (currentSlide > movies.length)  currentSlide = 0;  
    slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;   
    addMovieToSlider(currentSlide);  
});

document.querySelector('.control-left-btn').addEventListener('click', () => {
    currentSlide--;
    const cardWidth = document.querySelector(".trending-movie-card").clientWidth;
    if (currentSlide < 0) currentSlide = movies.length - 1;  
    slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`; 
  });
function updateFirstMovieCard() {
  const item = movies[0];  
  const card = document.querySelector('.trending-movie-card');  
  card.querySelector('h1').textContent = item.title;
  card.querySelector('.trending-movie-details span').textContent = `★★★★★ ${item.vote_average}`;
  card.querySelector('.trending-movie-details span:nth-child(2)').textContent = item.runtime ? `| ${item.runtime} mins` : '| Runtime unknown';
  card.querySelector('p').textContent = item.overview;
  card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  const backgroundDiv = card.querySelector('.trending-movie-card-background');
  if (backgroundDiv) {
    backgroundDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.poster_path})`;
  }
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
    const card = document.querySelector('.trending-movie-card').cloneNode(true);   
    card.querySelector('h1').textContent = item.title;   
    card.querySelector('.trending-movie-details span').textContent = `★★★★★ ${item.vote_average}`;   
    card.querySelector('.trending-movie-details span:nth-child(2)').textContent = item.runtime ? `| ${item.runtime} mins` : '| Runtime unknown';
    card.querySelector('p').textContent = item.overview;  
    card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    const backgroundDiv = card.querySelector('.trending-movie-card-background');
  if (backgroundDiv) {
    backgroundDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.poster_path})`;
  }  
    card.querySelector('.control-right-btn').
    
  addEventListener('click', () => {
      currentSlide++;
      const cardWidth = document.querySelector(".trending-movie-card").clientWidth;
      if (currentSlide > movies.length - 1) currentSlide = 0;
      slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`; 
      });

  card.querySelector('.control-left-btn').addEventListener('click', () => {
      currentSlide--;
      const cardWidth = document.querySelector(".trending-movie-card").clientWidth;
      if (currentSlide < 0) currentSlide = movies.length - 1;
      slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`; 
      });
    tmSlider.appendChild(card); 
}

//END-Cerenucakb/BE-12-Create-Trending-Movies-Section


//Deniz/BE-24-Most watched-Dynamic-started
const trendingOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3OTkyNy4wMjg2OTYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VE4_B-sg_0yz557YA98_GtbwS_ndY8fEz2SdFFNYyHA'
  }
};

fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", trendingOptions)
  .then(response => response.json())
  .then(data => {
    let randomMovies = getRandomTrendingMovies(data.results, 3); 
    displayTrendingMovies(randomMovies); 
  })
  .catch(error => console.error('Error fetching trending movies:', error));

function getRandomTrendingMovies(movies, num) {
  if (movies.length < num) {
    console.error("Yeterli sayıda film yok");
    return movies;
  }
  const shuffled = movies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function displayTrendingMovies(movies) {
  movies.forEach((movie, index) => {
    const poster = document.getElementById(`poster-${index + 1}`);
    const title = document.getElementById(`title-${index + 1}`);
    const card = document.getElementById(`card-${index + 1}`);

    if (poster && title && card) {
      poster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      poster.alt = movie.title;
      title.textContent = movie.title;

      card.addEventListener('click', () => {
        window.location.href = `detail.html?id=${movie.id}`;
      });
    } else {
      console.error(`Poster, title veya card elementi bulunamadı: poster-${index + 1}, title-${index + 1}, card-${index + 1}`);
    }
  });
}
//Deniz/BE-24-Most watched-Dynamic-finished


//Melek/BE-2-Implement-hte-all-categories-section-Start
const fetchAPI = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3OTkyNy4wMjg2OTYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VE4_B-sg_0yz557YA98_GtbwS_ndY8fEz2SdFFNYyHA',
  }
};

let displayedPosters = new Set();


fetch('https://api.themoviedb.org/3/genre/movie/list', fetchAPI)
  .then(response => response.json())
  .then(data => {
     const genres = data.genres; 
     

     genres.forEach(genre => {
        fetchMoviesByGenre(genre);
     });
  })
  .catch(err => console.error(err));

function fetchMoviesByGenre(genre) {
  fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}`, fetchAPI)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const movie = findUniquePoster(data.results); 

        if (movie) {
          addCategory(genre, movie);
        }
      }
    })
    .catch(err => console.error(err));
}

function findUniquePoster(movies) {
  for (let movie of movies) {
    if (!displayedPosters.has(movie.poster_path)) {  

      displayedPosters.add(movie.poster_path); 
      return movie; 
    }
  }
  return null;
}

function addCategory(genre, movie) {
  const sliderTagsId = document.getElementById("slider-tags-id");
  
  const categoryItem = document.querySelector(".movie-categories-class").cloneNode(true);
  categoryItem.querySelector(".categories-image").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  categoryItem.querySelector(".categories-tags").textContent = genre.name;
  
  sliderTagsId.appendChild(categoryItem);
}

//Slider:
const leftSlider = document.getElementById("left-ok");
const rightSlider = document.getElementById("right-ok");
const sliderDiv = document.getElementById("slider-tags-id");

leftSlider.addEventListener('click', () => {
  sliderDiv.scrollLeft -= 150;
});

rightSlider.addEventListener('click', () => {
  sliderDiv.scrollLeft += 150;
});

//Melek/BE-2-Implement-hte-all-categories-section-End