let data = JSON.parse(localStorage.getItem("Favourites"));
const tbody = document.querySelector(".tbody");
const listContainer = document.querySelector(".list-container");
let genres = [];
let currentGenre = "All Genres"
let text = "";
let lists = "";
let rowCount = 6;
let pagesArr = [];
let currentPage = 1;
let filterGenres = data;
const pages = document.querySelector(".pages");
let text2 = ""; 
let genreIds = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
};
const searchOpener = document.querySelector(".search-opener");
const searchbar = document.querySelector(".searchbar");
const links = document.querySelector(".links");
const searchIcon = document.querySelector(".search-icon");
searchOpener.addEventListener("click", () => {
    searchOpener.style.display = "none";
    searchbar.style.display = "block";
    links.style.display = "none"; 
})
searchIcon.addEventListener("click", () => {
    searchOpener.style.display = "block";
    searchbar.style.display = "none";
    links.style.display = "flex";
})
//Set Genres
data.forEach((dataObj)=>{
    if(!genres.includes(genreIds[dataObj.genre_ids[0]])) {
        genres.push(genreIds[dataObj.genre_ids[0]]);
    }
});
genres.unshift("All Genres");
if(genres !== null) {
    genres.forEach((genre)=>{
        let list = document.createElement("li");
        list.innerHTML = genre;
        list.setAttribute("class", "list-item");
        if(genre === currentGenre) {
            list.classList.add("active");
            listContainer.append(list);
        }
        else {
            listContainer.append(list);
        }
    })
}
//Display Favourites Movie
displayFavourites(filterGenres);
let li = document.querySelectorAll(".list-item");
tbody.innerHTML = text;
function removeActive(singleli) {
    currentPage = 1;
    if(currentGenre !== singleli.innerHTML) {
    currentGenre = singleli.innerHTML;
    }
    li.forEach((lis)=>{
        if(currentGenre === lis.innerHTML) {
            lis.classList.add("active");
        }
        else {
            lis.classList.remove("active");
        }
    })   
    filterGenres = [];
    if(currentGenre !== "All Genres") {
        filterGenres = data.filter((singleData)=>{
            if(genreIds[singleData.genre_ids[0]] === currentGenre) {
                return singleData;
            }
        })
    }
    else {
        filterGenres = data;
    }
    displayFavourites(filterGenres);
}
function setGenres(data) {
    data.forEach((dataObj)=>{
        if(!genres.includes(genreIds[dataObj.genre_ids[0]])) {
            genres.push(genreIds[dataObj.genre_ids[0]]);
        }
    });
    genres.unshift("All Genres");
    listContainer.innerHTML = "";
    if(genres !== null) {
        genres.forEach((genre)=>{
            let list = document.createElement("li");
            list.innerHTML = genre;
            list.setAttribute("class", "list-item");
            if(genre === currentGenre) {
                list.classList.add("active");
                listContainer.append(list);
                console.log(currentGenre);
            }
            else {
                listContainer.append(list);
            }
        })
        li = document.querySelectorAll(".list-item");
        li.forEach((singleli)=>{
            singleli.addEventListener("click", ()=>removeActive(singleli));
        })
    }
}
// Remove Favourites
function removeFavourite(id) {
    data = data.filter((dataObj)=> {
        if(dataObj.id !== id) {
            return dataObj;
        }
    })
    localStorage.setItem("Favourites", JSON.stringify(data));
    filterGenres = data;
    let a = [];
    genres = [];
    setGenres(filterGenres);
    if(currentGenre === "All Genres") {
        displayFavourites(filterGenres);
    }
    else if(genres.includes(currentGenre)) {
        console.log("This is current genre" + currentGenre);
        filterGenres.forEach((obj)=>{
            if(currentGenre === genreIds[obj.genre_ids[0]]) {
                a.push(obj);
            }
        })
        displayFavourites(a);
    }
    else {
        console.log("not");
        currentGenre = "All Genres";
        displayFavourites(filterGenres);
        li.forEach((list) => {
            if(list.innerHTML === "All Genres") {
                console.log("true");
                list.classList.add("active");
            }
        })
    }
}
function displayFavourites(filterGenres) {
    let si = (currentPage-1)*rowCount;
    let li = si+rowCount;
    let arr = [];
    arr = filterGenres.slice(si, li);
    text = "";
    tbody.innerHTML = "";
    arr.forEach((dataObj)=>{
        let Id = dataObj.id;
        text += `<tr>
        <td><img class="favourite-img" src='${dataObj.backdrop_path}'>${dataObj.original_title}</td>
        <td>${genreIds[dataObj.genre_ids[0]]}</td>
        <td>${dataObj.vote_average}</td>
        <td>${dataObj.popularity}</td>
        <td><button class="remove-btn" onClick={removeFavourite(${Id})}>Remove</button>
        </tr>`;
    })
    tbody.innerHTML = text;
    text2 = "";
    let length = Math.ceil(filterGenres.length / rowCount);
    pagesArr = [];
    for(let i = 1; i <= length; i++) {
        pagesArr.push(i);
    }
    pagesArr.forEach((page)=>{
        text2 += `<li class="page"><a class="page-links" onClick = 'changePage(${page})'>${page}</a></li>`
    })
    pages.innerHTML = text2;
}
li.forEach((singleli)=>{
    singleli.addEventListener("click", ()=>removeActive(singleli));
})
//Change Current Page
function changePage(page) {
    currentPage = page;
    console.log(currentPage);
    displayFavourites(filterGenres);
}
function pagination() {
    text2 = "";
    let length = Math.ceil(filterGenres.length / rowCount);
    pagesArr = [];
    for(let i = 1; i <= length; i++) {
        pagesArr.push(i);
    }
    console.log(pagesArr.length);
    pagesArr.forEach((page)=>{
        text2 += `<li class="page"><a class="page-links" onClick = 'changePage(${page})'>${page}</a></li>`
    })
    pages.innerHTML = text2;
    changePage(currentPage);
}
// Change Favourites list according to RowCount
let rowInput = document.querySelector(".row-input");
rowInput.addEventListener("change", (e) => {
    rowCount = parseInt(e.target.value);
    pagination();
});
// Search Favourite Movies
const search = document.querySelector(".search");
search.addEventListener("input", (e) => {
    let a1 = [];
    filterGenres.forEach((obj)=>{
        if(obj.original_title.includes(e.target.value) || obj.original_title.toLowerCase().includes(e.target.value) || obj.original_title.toUpperCase().includes(e.target.value)) {
            a1.push(obj);
        }
    })
    displayFavourites(a1);
})