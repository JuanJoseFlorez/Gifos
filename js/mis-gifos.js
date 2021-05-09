let capa = document.getElementById("capa");
let dataUrl = JSON.parse(localStorage.getItem("urlGifSubidos"));
window.onload = listarMisGifos();

function listarMisGifos() {
    console.log(dataUrl.length);
    for (let i = 0; i < dataUrl.length; i++) {
        escribir(dataUrl[i], i);
    }
}
function escribir(url, id) {
    let comilla = "'"
    let imagenId = "imagen-mis-gifos"+id;
    capa.innerHTML += '<div class="contenedor">'+
                        '<img src="'+url+'" id="'+imagenId+'"></img> '+
                    '</div>';
}