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
        for (let i = 0; i < imagenes.length; i++) {
            imagenes[i].setAttribute('src', 'https://media.giphy.com/media/hWZBZjMMuMl7sWe0x8/giphy.gif');
        }
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

url = 0;
function GuardarGIFO(id) {
    let imagenFav = document.createElement('img');
    let gifi = $('#' + id).attr('src');
    imagenFav.setAttribute('src', gifi);
    contenedorFavoritos.appendChild(imagenFav);
    localStorage.setItem('URL' + url, gifi);
    url = url + 1;
}

async function descargarGIFO(id) {
    let gifi = $('#' + id).attr('src');
    //create new a element
    let a = document.createElement('a');
    // get image as blob
    let response = await fetch(gifi);
    console.log(response)
    let file = await response.blob();
    // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
    a.download = 'GIFO_of_' + input_gifo.value;
    a.href = window.URL.createObjectURL(file);
    //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    //click on element to start download
    a.click();
}
