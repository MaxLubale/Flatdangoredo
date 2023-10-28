const filmsList = document.getElementById('films');
const movieDetails = document.getElementById('movie-details');
const buyTicketButton = document.getElementById('buy-ticket');
const deleteButton = document.getElementById('delete-movie'); // Add a delete button


// Fetch the list of movies from the server
fetch(' http://localhost:3000/films')
  .then((response) => response.json())
  .then((data) => {
    // Populate the movie list and mark movies as sold out if necessary
    data.forEach((film) => {
      const filmItem = document.createElement('li');
      filmItem.textContent = film.title;
      filmItem.classList.add('film', 'item');
      filmItem.dataset.id = film.id;

      // Mark movies as "Sold Out" and add the "sold-out" class if there are no available tickets
      if (film.capacity - film.tickets_sold === 0) {
        filmItem.classList.add('sold-out');
      }

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
  selectedFilm = film; // Update the selected film globally
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
buyTicketButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default form submission (page reload)

  if (selectedFilm && selectedFilm.capacity > selectedFilm.tickets_sold) {
    // Subtract the available tickets by 1
    selectedFilm.tickets_sold++;
    // Update the available tickets count in the movie details
    const availableTickets = selectedFilm.capacity - selectedFilm.tickets_sold;
    document.getElementById('available-tickets').textContent = `Available Tickets: ${availableTickets}`;

    if (availableTickets === 0) {
      // Mark the film as sold out
      selectedFilm.soldOut = true;
      const filmItem = document.querySelector(`[data-id="${selectedFilm.id}"]`);
      filmItem.classList.add('sold-out');
      buyTicketButton.textContent = 'Sold Out';
      buyTicketButton.disabled = true;
    }

    // Update the number of tickets_sold on the server
    fetch(` http://localhost:3000/films/${selectedFilm.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tickets_sold: selectedFilm.tickets_sold }),
    })
      .then((response) => response.json())
      .then((updatedFilm) => {
        console.log(updatedFilm);
      })
      .catch((error) => {
        console.error('Error updating tickets sold on the server:');
      });
  }
});


// Add a click event to the "Delete Film" button
deleteButton.addEventListener('click', () => {
  if (selectedFilm) {
    const filmId = selectedFilm.id;

    // Confirm with the user before deleting the film
    if (confirm('Are you sure you want to delete this film?')) {
      // Call the deleteFilm function to remove the film from the server
      deleteFilm(filmId);
    }
  }
});

// Function to remove a film from the server
function deleteFilm(id) {
  fetch(` http://localhost:3000/films/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      // Remove the film from the movie list on the frontend
      const filmItem = document.querySelector(`[data-id="${id}"]`);
      filmItem.remove();
      
    })
    .catch((error) => {
      console.error('Error deleting the film:', error);
    });
}
