let capa = document.getElementById("capa");
let capaVerMas = document.getElementById("capaVerMas");
let ver_mas = document.getElementsByClassName('ver_mas')[0];
let sin_GIFO = document.getElementById("Sin-elementos");
let dataUrl = JSON.parse(localStorage.getItem("urlGifSubidos"));
window.onload = listarMisGifos();

function listarMisGifos() {
    
    console.log(dataUrl.length);
    /** 
    for (let i = 0; i < dataUrl.length; i++) {
        escribir(dataUrl[i], i);
    }
    **/
    if(dataUrl == null || dataUrl.length == 0){
        ver_mas.style.display = "none";
        sin_GIFO.style.display = "flex";
    }
    if(dataUrl.length < 13){
        for (let i = 0; i < dataUrl.length; i++) {
            escribir(dataUrl[i], i);
        }
        ver_mas.style.display = "none";
    }else if(dataUrl.length >= 13){
        for (let i = 0; i < 12; i++) {
            escribir(dataUrl[i], i);
        }
        for (let i = 12; i < dataUrl.length; i++) {
            escribirVerMas(dataUrl[i], i);
        }
        ver_mas.style.display = "flex";
    }
}
ver_mas.addEventListener('click', () => {
    ver_mas.style.display = "none";
    capaVerMas.style.display = "flex";
    
})
function escribir(url, id) {
    let comilla = "'"
    let imagenId = "imagen-mis-gifos"+id;
    capa.innerHTML += '<div class="contenedor">'+
                        '<img src="'+url+'" id="'+imagenId+'"></img> '+
                    '</div>';
}
function escribirVerMas(url, id) {
    let comilla = "'"
    let imagenId = "imagen-mis-gifos"+id;
    capaVerMas.innerHTML += '<div class="contenedor">'+
                        '<img src="'+url+'" id="'+imagenId+'"></img> '+
                    '</div>';
}