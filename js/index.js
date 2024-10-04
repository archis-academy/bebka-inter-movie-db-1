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