const apiKey = '259f61f3';  // Replace with your OMDb API key
const movieGrid = document.getElementById("movieGrid");

async function getRecommendations() {
    const searchTerm = document.getElementById("searchTerm").value;
    const url = `http://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieGrid.innerHTML = `<p>No results found for "${searchTerm}". Please try a different keyword.</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayMovies(movies) {
    movieGrid.innerHTML = "";  // Clear previous recommendations

    movies.forEach(movie => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");

        const movieTitle = document.createElement("div");
        movieTitle.classList.add("movie-title");
        movieTitle.textContent = movie.Title;

        const moviePoster = document.createElement("img");
        moviePoster.src = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image";
        moviePoster.alt = `${movie.Title} Poster`;

        movieItem.appendChild(moviePoster);
        movieItem.appendChild(movieTitle);
        movieGrid.appendChild(movieItem);
    });
}
