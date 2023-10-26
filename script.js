// Define global variables to store movie data
let movies = []; // To store a list of movies
let selectedMovie = 1; // To store the currently selected movie

// Function to fetch movie data from the JSON server
async function fetchMovies() {
  try {
    const response = await fetch('http://localhost:3000/films'); // Use the appropriate API endpoint
    const data = await response.json();
    movies = data;
    // Populate the movie list in the UI
    populateMovieList();
    // Display the details of the first movie
    if (movies.length > 0) {
      selectedMovie = movies[0];
      updateMovieDetails();
    }
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
}

// Function to populate the movie list in the UI
function populateMovieList() {
  const movieList = document.getElementById('films'); // Get the UL element
  movieList.innerHTML = ''; // Clear the existing list

  movies.forEach((movie) => {
    const listItem = document.createElement('li');
    listItem.textContent = movie.title;
    listItem.classList.add('film', 'item');

    // Add an event listener to select the movie when clicked
    listItem.addEventListener('click', () => {
      selectedMovie = movie;
      updateMovieDetails();
    });

    movieList.appendChild(listItem);
  });
}

// Function to update the movie details in the UI
function updateMovieDetails() {
  const movieDetails = document.getElementById('movie-details'); // Get the movie details section
  // Update the movie details in the UI based on the selectedMovie object
  movieDetails.innerHTML = `
    <img src="${selectedMovie.poster}" alt="${selectedMovie.title} Poster">
    <h2>${selectedMovie.title}</h2>
    <p>Runtime: ${selectedMovie.runtime} minutes</p>
    <p>Showtime: ${selectedMovie.showtime}</p>
    <p>Available Tickets: ${selectedMovie.capacity - selectedMovie.tickets_sold}</p>
    <button id="buy-ticket" onclick="buyTicket()">Buy Ticket</button>
  `;
}

// Function to handle buying tickets
function buyTicket() {
  if (selectedMovie && selectedMovie.capacity > selectedMovie.tickets_sold) {
    // Update the UI to reflect the ticket purchase
    selectedMovie.tickets_sold++;
    updateMovieDetails();
  } else {
    // Handle the case when the movie is sold out
    document.getElementById('buy-ticket').textContent = 'Sold Out';
    // You can also add a class to the movie list item to indicate it's sold out.
  }
}

// Initialize the application by fetching movie data
fetchMovies();