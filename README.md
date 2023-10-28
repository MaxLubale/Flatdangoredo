## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Flatdango is built to demonstrate the functionality of a movie ticket booking system. Users can view a list of available movies, see movie details, and purchase tickets for their favorite films. Additionally, it provides an option to delete movies from the server, showcasing the basics of CRUD operations.

## Features

- View a list of available movies.
- Display movie details, including title, runtime, showtime, description, and available tickets.
- Purchase movie tickets and update the available ticket count.
- Mark movies as "Sold Out" when there are no available tickets.
- Delete movies from the server and the movie list.
- Interaction with a JSON DB server for movie data.

## Requirements

To run this project, you'll need the following:

- Node.js installed on your system.
- A JSON DB server (e.g., json-server) for serving movie data.

## Getting Started

1. Clone the repository:
   git clone https://github.com/yourusername/flatdango-movie-app.git

2. Navigate to the project folder:
   cd flatdango-movie-app

3. Install project dependencies:
   npm install

4. Start the JSON DB server for movie data (Make sure you have json-server installed globally):
   json-server --watch db.json

5. Start the application:
   Open your web browser and access the application at http://localhost:3000.

6. Usage
  Upon accessing the application, you'll see a list of available movies on the left side of the page.

  Click on a movie in the list to view its details on the right side of the page.

  You can buy tickets for a movie by clicking the "Buy Ticket" button. The number of available tickets will decrease.

   If a movie is sold out, the button text changes to "Sold Out."

   To delete a movie from the server and the list, click the "Delete Movie" button in the movie details section.

# Contributing
We welcome contributions from the community. If you have any suggestions or improvements, feel free to submit a pull request.

# License
This project is licensed under the MIT License.

