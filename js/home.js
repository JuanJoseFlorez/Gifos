alert('funciona')

let lupa = document.getElementsByClassName('search')[0];
let contenedor = document.getElementById('Busqueda');
let sinResultado = document.getElementById('Busqueda-sin-resultados');
let input_gifo = document.getElementsByClassName('input_gifo')[0];
let change_title = document.getElementsByClassName('change_title')[0];
let change_title_2 = document.getElementsByClassName('change_title')[1];
let imagenes = document.getElementsByClassName('resultado_gifos');
let username = document.getElementsByClassName('user_GIFO');
let title = document.getElementsByClassName('title_GIFO');
let favoritos = document.getElementsByClassName('favoritosButton');
let contenedorFavoritos = document.getElementById('contenedorFavoritos');
let FavoritosCon = document.getElementById('Favoritos');


lupa.addEventListener('click', () => {
    generarGIFO();
})

input_gifo.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        generarGIFO();
    }
})

function generarGIFO() {
    async function obtenerInformacionGIFO() {
        let response = await fetch("https://api.giphy.com/v1/gifs/search?api_key=ElUCJDgPAZ7oEbz7HipfD7wCwoprG4zS&q=" + input_gifo.value + "&limit=12&offset=0&rating=g&lang=en");
        let gif = await response.json();
        return gif;
    }

    let promesaGif = obtenerInformacionGIFO();

    promesaGif
        .then(data => {
            contenedor.style.display = "none";
            sinResultado.style.display = "none";
            for (let i = 0; i < imagenes.length; i++) {
                imagenes[i].setAttribute('src', 'https://media.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif');
                let gifi = data.data[i].images.original.url;
                username[i].innerHTML = data.data[i].username;
                title[i].innerHTML = data.data[i].title;
                imagenes[i].setAttribute('src', gifi);
                //----------------------------------------------//
            }
            contenedor.style.display = "flex";
            change_title.innerHTML = input_gifo.value;
            
            
        })
        .catch(error => {
            alert(error)
            sinResultado.style.display = "flex";
            change_title_2.innerHTML = input_gifo.value;
        });
}


function GuardarGIFO(id){
    let imagenFav = document.createElement('img');
    let gifi = $('#'+id).attr('src');
    imagenFav.setAttribute('src', gifi);
    contenedorFavoritos.appendChild(imagenFav);  
}

for (let i = 0; i < favoritos.length; i++) {
    favoritos[i].addEventListener('click', () => {
        let gifi = data.data[i].images.original.url;
        let imagenFav = document.createElement('img');
        imagenFav.setAttribute('src', gifi)
        contenedorFavoritos.appendChild(imagenFav);  
    })
}