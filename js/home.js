
let lupa = document.getElementsByClassName('search')[0];
let search_input = document.getElementsByClassName('search_main')[0];
let contenedor = document.getElementById('Busqueda');
let contenedor_ver_mas = document.getElementById('section_ver_mas');
let ver_mas = document.getElementsByClassName('ver_mas')[0];
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
let content_sugerencias = document.getElementById('content-search');
let sugerencias = document.getElementsByClassName('sugerencias');


lupa.addEventListener('click', () => {
    lupa.style.display = "flex";
    search_input.style.display = "none";
    ver_mas.style.display = "flex";
    contenedor_ver_mas.style.display = "none";
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].setAttribute('src', './assets/loading.gif');
    }
    generarGIFO();
})

search_input.addEventListener('click', () => {
    lupa.style.display = "flex";
    search_input.style.display = "none";
    ver_mas.style.display = "flex";
    contenedor_ver_mas.style.display = "none";
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].setAttribute('src', './assets/loading.gif');
    }
    generarGIFO();
})

input_gifo.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        lupa.style.display = "flex";
        search_input.style.display = "none";
        ver_mas.style.display = "flex";
        contenedor_ver_mas.style.display = "none";
        for (let i = 0; i < imagenes.length; i++) {
            imagenes[i].setAttribute('src', './assets/loading.gif');
        }
        generarGIFO();
    }
})

ver_mas.addEventListener('click', () => {
    ver_mas.style.display = "none";
    contenedor_ver_mas.style.display = "flex";
    
})

function generarGIFO() {
    async function obtenerInformacionGIFO() {
        let response = await fetch("https://api.giphy.com/v1/gifs/search?api_key=ElUCJDgPAZ7oEbz7HipfD7wCwoprG4zS&q=" + input_gifo.value + "&limit=24&offset=0&rating=g&lang=en");
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
                console.log(gifi);
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

function getSugerencias(){
    
    async function obtenerInformacionGIFO() {
        let response = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=ElUCJDgPAZ7oEbz7HipfD7wCwoprG4zS&limit=6&rating=g");
        let gif = await response.json();
        return gif;
    }
    let promesaSugerencia = obtenerInformacionGIFO();

    promesaSugerencia
        .then(data => {
            for (let i = 0; i < sugerencias.length; i++) {
                sugerencias[i].innerHTML = data.data[i].title;
            }
            content_sugerencias.style.display = "flex";
            content_sugerencias.style.borderTop = '1px solid #9CAFC3';
            input_gifo.style.borderRadius = '27px 27px 0px 0px';
            input_gifo.style.borderBottom = '1px solid #9CAFC3';
            lupa.style.display = "none";
            search_input.style.display = "flex";
        })
        .catch(error => {
            alert('No se obtuvo la segerencia'+error)
        });
}


for (let i = 0; i < sugerencias.length; i++) {
    sugerencias[i].addEventListener('click', () => {
        input_gifo.value = sugerencias[i].innerText.substring(0,34);
        lupa.click();
    })
}

