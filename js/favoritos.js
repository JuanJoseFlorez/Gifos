let capa = document.getElementById("capa");
let capaVerMas = document.getElementById("capaVerMas");
let ver_mas = document.getElementsByClassName('ver_mas')[0];
let sin_favoritos = document.getElementById("Sin-elementos");
let dataUrl = JSON.parse(localStorage.getItem("urlFav"));
let dataUser = JSON.parse(localStorage.getItem("userFav"));
let dataTitle = JSON.parse(localStorage.getItem("titleFav"));
window.onload = listarFavoritos();

function listarFavoritos() {
    console.log(dataUrl.length);

    if(dataUrl == null || dataUrl.length == 0){
        sin_favoritos.style.display = "flex";
    }

    if(dataUrl.length < 13){
        for (let i = 0; i < dataUrl.length; i++) {
            escribir(dataUrl[i], i, dataUser[i], dataTitle[i]);
        }
        ver_mas.style.display = "none";
    }else if(dataUrl.length >= 13){

        for (let i = 0; i < 12; i++) {
            escribir(dataUrl[i], i, dataUser[i], dataTitle[i]);
        }
        for (let i = 12; i < dataUrl.length; i++) {
            escribirVerMas(dataUrl[i], i, dataUser[i], dataTitle[i]);
        }
        ver_mas.style.display = "flex";
    }
    
}

ver_mas.addEventListener('click', () => {
    ver_mas.style.display = "none";
    capaVerMas.style.display = "flex";
    
})
function escribir(url, id, user, title) {
    let comilla = "'"
    let imagen = "imagenFav"+id;
    let imagenTwo = "imagen"+id;
    let userId = "user"+id;
    let titleId = "title"+id;
    capa.innerHTML += '<div class="contenedor">'+
                        '<img src="'+url+'" id="imagenFav'+id+'"></img> '+
                        '<div class="botonesImg">'+
                            '<img src="assets/icon-fav-active.svg" alt="favoritos" class="favoritosButton" onclick="eliminarDato('+id+')">'+
                            '<img src="assets/icon-download.svg" alt="descarga" class="descargaButton" onclick="descargarGIFO('+comilla+''+imagen+''+comilla+')">'+
                            '<img onclick="togglePopUp('+comilla+''+imagen+''+comilla+','+comilla+''+userId+''+comilla+','+comilla+''+titleId+''+comilla+')" src="assets/icon-max-normal.svg" alt="ImgMax">'+
                        '</div>'+
                        '<div class="user-title-hover">'+
                            '<p class="user_GIFO" id="user'+id+'" data-content=" ">'+user+'</p>'+
                            '<p class="title_GIFO" id="title'+id+'" data-content=" ">'+title+'</p>'+
                        '</div>'+
                    '</div>';
}

function escribirVerMas(url, id, user, title) {
    let comilla = "'"
    let imagen = "imagenFav"+id;
    let userId = "user"+id;
    let titleId = "title"+id;
    capaVerMas.innerHTML += '<div class="contenedor">'+
                        '<img src="'+url+'" id="imagenFav'+id+'"></img> '+
                        '<div class="botonesImg">'+
                            '<img src="assets/icon-fav-active.svg" alt="favoritos" class="favoritosButton" onclick="eliminarDato('+id+')">'+
                            '<img src="assets/icon-download.svg" alt="descarga" class="descargaButton" onclick="descargarGIFO('+comilla+''+imagen+''+comilla+')">'+
                            '<img onclick="togglePopUp('+comilla+''+imagen+''+comilla+','+comilla+''+userId+''+comilla+','+comilla+''+titleId+''+comilla+')" src="assets/icon-max-normal.svg" alt="ImgMax">'+
                        '</div>'+
                        '<div class="user-title-hover">'+
                            '<p class="user_GIFO" id="user'+id+'" data-content=" ">'+user+'</p>'+
                            '<p class="title_GIFO" id="title'+id+'" data-content=" ">'+title+'</p>'+
                        '</div>'+
                    '</div>';
}

function eliminarDato(id){
    dataUrl.splice(id, 1);
    dataUser.splice(id, 1);
    dataTitle.splice(id, 1);
    localStorage.setItem('userFav', JSON.stringify(dataUser));
    localStorage.setItem('urlFav', JSON.stringify(dataUrl));
    localStorage.setItem('titleFav', JSON.stringify(dataTitle));
    location.reload();
}