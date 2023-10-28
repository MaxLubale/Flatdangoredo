const filmsList = document.getElementById('films');
const movieDetails = document.getElementById('movie-details');
const buyTicketButton = document.getElementById('buy-ticket');
// let selectedFilm = null; // Store the selected film globally

// Fetch the list of movies from the server
fetch(' http://localhost:3000/films')
  .then((response) => response.json())
  .then((data) => {
    // Populate the movie list
    data.forEach((film) => {
      const filmItem = document.createElement('li');
      filmItem.textContent = film.title;
      filmItem.classList.add('film', 'item');
      filmItem.dataset.id = film.id;
      filmsList.appendChild(filmItem);

      // Add click event to each film item
      filmItem.addEventListener('click', () => {
        selectedFilm = film;
        displayMovieDetails(film);
      });
    });

    // Initial movie details
    displayMovieDetails(data[0]);
  });

// Display movie details
function displayMovieDetails(film) {
  movieDetails.innerHTML = `
    <h3>${film.title}</h3>
    <p>Runtime: ${film.runtime} minutes</p>
    <p>Showtime: ${film.showtime}</p>
    <p id="available-tickets">Available Tickets: ${film.capacity - film.tickets_sold}</p>
    <p>Description: ${film.description}</p>
    <img src="${film.poster}" alt="${film.title} Poster" />
  `;

  if (film.capacity - film.tickets_sold === 0) {
    buyTicketButton.textContent = 'Sold Out';
    buyTicketButton.disabled = true;
  } else {
    buyTicketButton.textContent = 'Buy Ticket';
    buyTicketButton.disabled = false;
  }
}

// Buy Ticket button click event
buyTicketButton.addEventListener('click', () => {
  if (selectedFilm && selectedFilm.capacity > selectedFilm.tickets_sold) {
    // Subtract the available tickets by 1
    selectedFilm.tickets_sold++;
    // Update the available tickets count in the movie details
    const availableTickets = selectedFilm.capacity - selectedFilm.tickets_sold;
    document.getElementById('available-tickets').textContent = `Available Tickets: ${availableTickets}`;
  }
});
