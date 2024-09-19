const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjU2MDg1M2Y5OWVhM2QxNTAwMjRkYTY0MzU0NjJjNiIsIm5iZiI6MTcyNjE3NTQxNS4yMjg3MjYsInN1YiI6IjY2ZTM1NzllOTAxM2ZlODcyMjIzYmZlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8DRNkOvTb4LktLJmLOU812inEcl9rlWgtDcpCpDHEL0'
  }
};


document.querySelectorAll('.fa-play').forEach(button => {
  button.addEventListener('click', () => {
    fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
      .then(response => response.json()) 
      .then(json => {
        console.log("Trending Movies:");
        json.results.forEach(element => {
          console.log(element.title);  
        });

       
      })
      .catch(err => console.log('Error:', err));  
  });
});