let rating = 0;
const stars = document.querySelectorAll(".star");

stars.forEach(star=>{
    star.addEventListener("click",()=>{
        rating = Number(star.dataset.value);
        updateStars();
    });
});

function updateStars(){
    stars.forEach(star=>{
        if(Number(star.dataset.value) <= rating){
            star.classList.add("active");
        } else{
            star.classList.remove("active");
        }
    });
}

function getMovies(){
    const data = localStorage.getItem("movies");
    return data ? JSON.parse(data) : [];
}

function saveMovies(movies){
    localStorage.setItem("movies", JSON.stringify(movies));
}

function saveMovie(){

    const title = document.getElementById("title").value.trim();
    const year = document.getElementById("year").value.trim();
    const genre = document.getElementById("genre").value;

    if(!title || !year || rating===0){
        alert("Please fill everything and rate the movie.");
        return;
    }

    let movies = getMovies();

    const index = movies.findIndex(m =>
        m.title.toLowerCase() === title.toLowerCase() &&
        m.year === year
    );
const movie = {title,year,genre,rating};

    if(index !== -1){
        movies[index] = movie;
        alert("Movie updated!");
    }else{
        movies.push(movie);
        alert("Movie added!");
    }

    saveMovies(movies);
    displayMovies();
}

function deleteMovie(index){

    const confirmDelete = confirm("Are you sure you want to delete this movie?");

    if(confirmDelete){

        let movies = getMovies();
        movies.splice(index,1);

        saveMovies(movies);
        displayMovies();
    }
}

function displayMovies(){

    const movies = getMovies();
    const list = document.getElementById("movieList");

    list.innerHTML="";

    movies.forEach((movie,index)=>{

        const li = document.createElement("li");
        li.className="movie-item";

        const starsDisplay =
            "★".repeat(movie.rating) +
            "☆".repeat(5-movie.rating);

        li.innerHTML =
            `${movie.title} (${movie.year}) - ${movie.genre} - ${starsDisplay}
            <button class="deleteBtn" onclick="deleteMovie(${index})">Delete</button>`;

        list.appendChild(li);

    });

}

displayMovies();