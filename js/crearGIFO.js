let changeButton = document.getElementById('changeButton');
let changeTitle = document.getElementById('changeTitle');
let changeContenedor = document.getElementById('changeContenedor');
let changeP = document.getElementById('changeP');
let step_1 = document.getElementsByClassName('pasos')[2];
let step_2 = document.getElementsByClassName('pasos')[1];
let step_3 = document.getElementsByClassName('pasos')[0];
let button_comenzar = document.getElementsByClassName('comenzar')[0];
let button_grabar = document.getElementsByClassName('grabar')[0];
let button_finalizar = document.getElementsByClassName('finalizar')[0];
let button_subir = document.getElementsByClassName('subir-gifo')[0];
let video_camara = document.getElementById('video-camara');
let boton_repetir = document.getElementById('repetir');
let parrafo_subiendo = document.getElementById('parrafo-subiendo');
let imagen_subiendo = document.getElementById('imagen-subiendo');
let parrafo_subido = document.getElementById('parrafo-subido');
let imagen_subido = document.getElementById('imagen-subido');
let etiqueta_video = document.getElementById('video');
let n = 0;
let j = 0;
let contador_GIFO = document.getElementById('number');
let segundos = document.getElementById("segundos");
let minutos = document.getElementById('minutos');
let detenerIntervalo = new Boolean(false);
let urlGIFO = document.getElementById('urlGIFO');
let button_camara = document.getElementById('botones_camara');

//permisos camara, grabaciones y guardarlos
let video = document.getElementById('video');
let mensaje = document.getElementById('grabando');
let form = new FormData();
let urlGifSubida = "https://upload.giphy.com/v1/gifs?api_key=ElUCJDgPAZ7oEbz7HipfD7wCwoprG4zS"
let urlGifSubidos = [];

button_comenzar.addEventListener('click', () => {
    step_3.setAttribute('src', '../assets/paso-a-paso-hover.svg');
    changeTitle.innerHTML = "¿Nos das acceso a tu cámara?";
    changeP.innerHTML = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    button_comenzar.style.display = "none";
})
button_grabar.addEventListener('click', () => {
    button_grabar.style.display = 'none';
    button_finalizar.style.display = 'flex';
})

button_finalizar.addEventListener('click', () => {
    button_finalizar.style.display = 'none';
    button_subir.style.display = 'flex';
    detenerIntervalo=true;
})

button_subir.addEventListener('click', () => {
    button_subir.style.display = 'none';
    step_1.setAttribute('src', '../assets/paso-a-paso-hover-3.svg');
    step_2.setAttribute('src', '../assets/paso-a-paso-2.svg');
    step_3.setAttribute('src', '../assets/paso-a-paso.svg');
    boton_repetir.style.display = 'none';
    etiqueta_video.style.filter = 'contrast(100%) sepia(1) hue-rotate(220deg) saturate(1000%)';
    imagen_subiendo.style.display = 'block';
    parrafo_subiendo.style.display = 'block';
    subirGifo();
})
boton_repetir.addEventListener('click',()=>{
    
    boton_repetir.style.display = 'none';
    button_subir.style.display = 'none';
    button_finalizar.style.display = 'block';
    form.delete('file')
    recorder.reset();
    iniciarGrabacion();
})
function copiarURL(id_elemento){
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 400 }
        }
    })
        .then(function (stream) {
            step_1.setAttribute('src', '../assets/paso-a-paso-3.svg');
            step_2.setAttribute('src', '../assets/paso-a-paso-hover-2.svg');
            step_3.setAttribute('src', '../assets/paso-a-paso.svg');
            video_camara.style.display = "block"
            changeTitle.style.display = "none";
            changeP.style.display = "none";
            button_grabar.style.display = 'flex';
            video.srcObject = stream;
            video.play()
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 0,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });

            recorder.stopRecording(function () {
                let blob = recorder.getBlob();
                invokeSaveAsDialog(blob);
            });
        })
        .catch(function (e) {
            console.log(e);
        })
}
function iniciarGrabacion() {
    recorder.startRecording();
    button_grabar.style.display = "none"
    button_finalizar.style.display = "block"
    contador_GIFO.style.display = "block";
    detenerIntervalo=false;
    n=1;
    j=1;
    let contador_segundos = setInterval(function () {
        if(n==60){
            n=0;
        }
        if(n < 10){
            segundos.innerHTML = ":0" + n;
        }else{
            segundos.innerHTML = ":" + n;
        }
        if(detenerIntervalo==true){
            clearInterval(contador_segundos);
            segundos.innerHTML = ":00";
        }
        n++;
    }, 1000);
    let contador_minutos = setInterval(function () {
        if(j==60){
            j=0;
        }
        if(j < 10){
            minutos.innerHTML = "0" + j;
        }else{
            minutos.innerHTML = j;
        }
        if(detenerIntervalo==true){
            clearInterval(contador_minutos);
            minutos.innerHTML = "00";
        }
        j++;
    }, 60000);
}
function detenerGrabacion() {
    contador_GIFO.style.display = "none";
    recorder.stopRecording();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(form.get('file'));
    button_finalizar.style.display = 'none';
    button_subir.style.display = 'block';
    contador_GIFO.style.display = 'none';
    boton_repetir.style.display = 'block';
}
let subirGifo = () => {
    fetch(urlGifSubida, {
        method: "POST",
        body: form
    }).then(response => response.json())
        .then(data => {
            console.log(data.data.id);
            conseguirIMG(data.data.id);
            conseguirUrlGIFO(data.data.id);
            console.log('Sirvio xd');
            form.delete('file')
            recorder.reset();
            imagen_subiendo.style.display = 'none';
            parrafo_subiendo.style.display = 'none';
            imagen_subido.style.display = 'block';
            parrafo_subido.style.display = 'block';
            button_camara.style.display = 'block';
        }).catch(message_error => console.log('F' + message_error))
        
}

let conseguirUrlGIFO = (id) => {
    fetch("https://api.giphy.com/v1/gifs/" + id + "?api_key=ElUCJDgPAZ7oEbz7HipfD7wCwoprG4zS", {
    }).then(response => response.json())
        .then(data => {
            urlGIFO.innerText = data.data.images.original.url;
        }).catch(message_error => console.log('F' + message_error))
}

let conseguirIMG = (id) => {
    fetch("https://api.giphy.com/v1/gifs/" + id + "?api_key=ElUCJDgPAZ7oEbz7HipfD7wCwoprG4zS", {

    }).then(response => response.json())
        .then(data => {
            console.log(data.data.images.original.url);
            let urlGif = data.data.images.original.url;
            let dataUrlGifSubidos = JSON.parse(localStorage.getItem("urlGifSubidos"));
            if (dataUrlGifSubidos == null) {
                localStorage.setItem('urlGifSubidos', JSON.stringify(urlGifSubidos));
                dataUrlGifSubidos = JSON.parse(localStorage.getItem("urlGifSubidos"));
                dataUrlGifSubidos.push(urlGif);
            } else {
                dataUrlGifSubidos.push(urlGif);
            }
            localStorage.setItem('urlGifSubidos', JSON.stringify(dataUrlGifSubidos));
        }).catch(message_error => console.log('F' + message_error))
}
