let Favourites = JSON.parse(localStorage.getItem("Favourites") || "[]");
let data = movies.results;
let text = "";
let cardcontainer = document.querySelector(".card-container");
let mainId = 1;
function displayMovies(data) {
  text = "";
data.forEach((dataObj) => {
    text += `<div href = "movie.html" class="card movie-card" id=${dataObj.id}>
    <a href="movie.html"><img src='${dataObj.backdrop_path}' class="card-img-top movie-img" alt="...">
    <h5 class="card-title movie-title">${dataObj.original_title}</h5></a>
    <div class="btn-wrapper">
    <button class="btn btn-primary favourite-btn">Add to Favourites</button>
    </div>
  </div>`
})
cardcontainer.innerHTML = text;
}
displayMovies(data);
// AddFavouritestoLocalStorage
const cards = document.querySelectorAll(".card");
cards.forEach((card)=>{
  card.addEventListener("click", () => {
    localStorage.setItem("mainId", card.id);
  })
  let favouriteBtn = card.querySelector(".favourite-btn");
  window.addEventListener("load", () => {
      Favourites.forEach((singleObj)=>{
        if(singleObj.id === JSON.parse(card.id)) {
          favouriteBtn.innerHTML = "Remove from Favourites";
        }
      })
  })
  // AddtoFavouritesandRemovefromFavourites
  favouriteBtn.addEventListener("click", ()=>{
    let Id = card.getAttribute("id");
    Id = JSON.parse(Id);
    let favData = favouriteBtn.innerHTML;
    console.log(favData);
    if(favData === "Add to Favourites") {
      data.forEach((dataObj)=>{
        if(Id === dataObj.id) {
          Favourites.push(dataObj);
          localStorage.setItem("Favourites", JSON.stringify(Favourites));
          favouriteBtn.innerHTML = "Remove from Favourites";
        }
      })
    }
    else {
      Favourites = Favourites.filter((obj)=>{
        if(obj.id != Id) {
          return obj;
        }
      })
      localStorage.setItem("Favourites", JSON.stringify(Favourites));
      favouriteBtn.innerHTML="Add to Favourites";
    }
  })
})
// Search
let search = document.querySelector(".search");
search.addEventListener("input", (e)=>{
  let a = [];
  console.log(e.target.value);
  data.forEach((dataObj)=>{
    if(dataObj.original_title.includes(e.target.value) || dataObj.original_title.toLowerCase().includes(e.target.value) || dataObj.original_title.toUpperCase().includes(e.target.value))  {
      a.push(dataObj);
    }
  })
  displayMovies(a);
})
//Carousel
let index = 0;
function showSlides() {
  var i;
  const slides = document.querySelectorAll(".slide");
  for(i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  index++;
  if(index > slides.length) {
    index = 1;
  }
  slides[index-1].style.display = "block";
  setTimeout(showSlides, 6000);
}
showSlides();