let rating = 0;

const stars = document.querySelectorAll(".star");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    rating = Number(star.dataset.value);
    updateStars();
  });
});

function updateStars() {
  stars.forEach((star) => {
    if (Number(star.dataset.value) <= rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

function getMovies() {
  const data = localStorage.getItem("movies");
  return data ? JSON.parse(data) : [];
}

function saveMovie() {
  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const genre = document.getElementById("genre").value;

  if (!title || !year || rating === 0) {
    alert("Fill everything and choose a rating.");
    return;
  }

  const movie = {
    title,
    year,
    genre,
    rating,
  };

  const movies = getMovies();
  movies.push(movie);

  localStorage.setItem("movies", JSON.stringify(movies));

  displayMovies();
}

document.getElementById("saveBtn").addEventListener("click", saveMovie);

function displayMovies() {
  const movies = getMovies();
  const list = document.getElementById("movieList");

  list.innerHTML = "";

  movies.forEach((movie) => {
    const li = document.createElement("li");

    let starsDisplay = "★".repeat(movie.rating) + "☆".repeat(5 - movie.rating);
    li.textContent = `${movie.title} (${movie.year}) - ${movie.genre} - ${starsDisplay}`;

    list.appendChild(li);
  });
}

displayMovies();
