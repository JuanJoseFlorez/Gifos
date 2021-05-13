

/* Carrusel */
let current = 0;
let imagenesAMostrar = 1;
let trending = document.getElementsByClassName('trending');
let trendingUser = document.getElementsByClassName('user_GIFO_trending');
let trendingTitle = document.getElementsByClassName('title_GIFO_trending');
window.onload = conseguirIMG();

function myFunction(x) {
    if (x.matches) {
        imagenesAMostrar = 3;
        console.log(imagenesAMostrar);
    } else {
        imagenesAMostrar = 1;
        console.log(imagenesAMostrar);
    }
}

let x = window.matchMedia("(min-width: 700px)")
myFunction(x);

$(document).ready(function () {
    let numImages = 12;
    if (numImages <= imagenesAMostrar) {
        $('.right-arrow').css('display', 'none');
        $('.left-arrow').css('display', 'none');
    }

    $('.left-arrow').on('click', function () {
        if (current > 0) {
            current = current - 1;
        } else {
            current = numImages - imagenesAMostrar;
        }

        $(".carrusel").animate({ "left": -($('#trending_' + current).position().left) }, 600);

        return false;
    });

    $('.right-arrow').on('click', function () {
        if (numImages > current + imagenesAMostrar) {
            current = current + 1;
        } else {
            current = 0;
        }

        $(".carrusel").animate({ "left": -($('#trending_' + current).position().left) }, 600);

        return false;
    });
});

/* Traer datos trending */
function conseguirIMG() {
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=ElUCJDgPAZ7oEbz7HipfD7wCwoprG4zS&limit=12&rating=g", {

    }).then(response => response.json())
        .then(data => {
            for (let i = 0; i < trending.length; i++) {
                trending[i].setAttribute('src', data.data[i].images.original.url);
                trendingTitle[i].innerHTML = data.data[i].title;
                if(data.data[i].username == ''){
                    trendingUser[i].innerHTML = 'Sin autor'
                }else{
                    trendingUser[i].innerHTML = data.data[i].username;
                }
                
            }
        }).catch(message_error => console.log('F' + message_error))
}