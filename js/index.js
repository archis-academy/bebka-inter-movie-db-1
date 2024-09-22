const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3OTkyNy4wMjg2OTYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VE4_B-sg_0yz557YA98_GtbwS_ndY8fEz2SdFFNYyHA'
    }
  };
 
  let trendingMovies = fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
    .then(response => response.json())
    .then(data => {
      let randomMovies = getRandomMovies(data.results, 3); 
      displayMovies(randomMovies); 
    })
    .catch(error => console.error('Error fetching movies:', error));
  
 
  function getRandomMovies(movies, num) {
    const shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  
  
  function displayMovies(movies) {
    movies.forEach((movie, index) => {
      le
      const poster = document.getElementById(`poster-${index + 1}`);
      const title = document.getElementById(`title-${index + 1}`);
      const card = document.getElementById(`card-${index + 1}`);
  
      
      poster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      poster.alt = movie.title;
      title.textContent = movie.title;
  
     
      card.addEventListener('click', () => {
        alert(`Film: ${movie.title}\nPoster URL: https://image.tmdb.org/t/p/w500/${movie.poster_path}`);
      });
    });
  }