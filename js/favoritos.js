let capa = document.getElementById("capa");
let dataUrl = JSON.parse(localStorage.getItem("urlFav"));
let dataUser = JSON.parse(localStorage.getItem("userFav"));
let dataTitle = JSON.parse(localStorage.getItem("titleFav"));
window.onload = listarFavoritos();

function listarFavoritos() {
    console.log(dataUrl.length);
    for (let i = 0; i < dataUrl.length; i++) {
        escribir(dataUrl[i], i, dataUser[i], dataTitle[i]);
    }
}
function escribir(url, id, user, title) {
    let comilla = "'"
    let imagen = "imagenFav"+id;
    let userId = "user"+id;
    let titleId = "title"+id;
    capa.innerHTML += '<div class="contenedor">'+
                        '<img src="'+url+'" id="imagenFav'+id+'"></img> '+
                        '<div class="botonesImg">'+
                            '<img src="assets/icon-fav-active.svg" alt="favoritos" class="favoritosButton" onclick="eliminarDato('+id+')">'+
                            '<img src="assets/icon-download.svg" alt="descarga" class="descargaButton">'+
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