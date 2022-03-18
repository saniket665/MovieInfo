let mainId = JSON.parse(localStorage.getItem("mainId"));
const movieDetails = document.querySelector(".movie-details");
let data = movies.results;
let genreIds = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
};
// Show Movie
data.forEach((dataObj)=>{
    if(dataObj.id === mainId) {
        let text = "";
        text = `<div class="singlemovie-img">
            <img src = '${dataObj.backdrop_path}'>
        </div>
        <div class="singlemovie-info">
            <h3 class="singlemovie-title">${dataObj.original_title}</h3>
            <p class="singlemovie-genre">${genreIds[dataObj.genre_ids[0]]}</p>
            <h3 class="overview-heading">Overview</h3>
            <p class="overview">${dataObj.overview}</p>
            <ul class="rating">
            <li class="rating-details"><span class="title">Popularity:</span> ${dataObj.popularity}</li>
            <li class="rating-details"><span class="title">Rating:</span> ${dataObj.vote_average}</li>
            <li class="rating-details"><span class="title">Votes:</span> ${dataObj.vote_count}</li>
            </ul>
        </div>`
        movieDetails.innerHTML = text;
    }
})