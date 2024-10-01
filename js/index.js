
//Melek/BE-20/Implement the FAQ section/JavaScript/Start 
const akordiyon = document.getElementsByClassName("content-box")

for (var i=0 ; i<akordiyon.length; i++) {
    akordiyon[i].addEventListener("click", function (){
        this.classList.toggle("active");
    });
}

//Melek/BE-20/Implement the FAQ section/JavaScript/End 

//Asli/BE-25-Make-Hero-Section-Dynamic-Başlangıç
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3OTkyNy4wMjg2OTYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VE4_B-sg_0yz557YA98_GtbwS_ndY8fEz2SdFFNYyHA'; 

async function fetchPopularMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${ACCESS_TOKEN}&language=en-US&page=1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Popular movies data:', data); 

    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomMovie = data.results[randomIndex];

    fetchMovieData(randomMovie.id);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
  }
}

async function fetchMovieData(movieId) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${ACCESS_TOKEN}&language=en-US`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movieData = await response.json();
    console.log('Movie data:', movieData); 

    document.getElementById('movieTitle').textContent = movieData.title;
    document.getElementById('releaseDate').textContent = `On the air: ${movieData.release_date}`;

    const overview = movieData.overview || 'Açıklama mevcut değil.';
    const shortOverview = overview.length > 100 ? overview.substring(0, 50) + '...' : overview; 
    document.querySelector('.hero-content p').textContent = shortOverview; 

    fetchTrailer(movieId);
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
}

async function fetchTrailer(movieId) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${ACCESS_TOKEN}&language=en-US`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const videosData = await response.json();
    console.log('Videos data:', videosData); 

    if (videosData.results.length > 0) {
      const trailer = videosData.results.find(video => video.type === 'Trailer');
      if (trailer) {
        document.getElementById('myVideo').src = `https://www.youtube.com/embed/${trailer.key}?rel=0&autoplay=0`;
      } else {
        console.warn('No trailer found for this movie.');
      }
    } else {
      console.warn('No videos found for this movie.');
    }
  } catch (error) {
    console.error('Error fetching trailer:', error);
  }
}

window.onload = fetchPopularMovies;

function playVideo() {
  const iframe = document.getElementById('myVideo');
  iframe.src += "&autoplay=1"; 

  document.getElementById('watchTrailerBtn').style.visibility = 'hidden';
  document.getElementById('watchTrailerText').style.visibility = 'hidden';
}
//Asli/BE-25-Make-Hero-Section-Dynamic-Bitiş