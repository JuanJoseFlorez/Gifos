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
                if (username[i].innerHTML == "") {
                    username[i].innerHTML = "Sin autor";
                }
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

let urlFav = [];
let userFav = [];
let titleFav = [];
function GuardarGIFO(id, userId, titleId){
    let añadir = new Boolean (false);
    let gifi = $('#'+id).attr('src');
    let user = document.getElementById(userId);
    let title = document.getElementById(titleId);
    let dataUrl = JSON.parse(localStorage.getItem("urlFav"));
    let dataUser = JSON.parse(localStorage.getItem("userFav"));
    let dataTitle = JSON.parse(localStorage.getItem("titleFav"));
    if(dataUrl==null){
        localStorage.setItem('urlFav', JSON.stringify(urlFav));
        localStorage.setItem('userFav', JSON.stringify(userFav));
        localStorage.setItem('titleFav', JSON.stringify(titleFav));
        dataUrl = JSON.parse(localStorage.getItem("urlFav"));
        dataUser = JSON.parse(localStorage.getItem("userFav"));
        dataTitle = JSON.parse(localStorage.getItem("titleFav"));
        dataUrl.push(gifi);
        dataUser.push(user.innerHTML);
        dataTitle.push(title.innerHTML);
    } else if(dataUrl.length==0){
        dataUrl.push(gifi);
        dataUser.push(user.innerHTML);
        dataTitle.push(title.innerHTML);
        alert("Añadido correctamente");
    }
    else{
        dataUrl = JSON.parse(localStorage.getItem("urlFav"));
        for(let j = 0; j<dataUrl.length;j++){
            if(gifi!=dataUrl[j]){
                añadir = true;
            }else{
                añadir = false;
                alert("Ya esta en favoritos");
                break;
            }
        }
        if(añadir==true){
            dataUrl.push(gifi);
            dataUser.push(user.innerHTML);
            dataTitle.push(title.innerHTML);
            alert("Añadido correctamente");
        }
        
    }
    localStorage.setItem('urlFav', JSON.stringify(dataUrl));
    localStorage.setItem('userFav', JSON.stringify(dataUser));
    localStorage.setItem('titleFav', JSON.stringify(dataTitle));
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
