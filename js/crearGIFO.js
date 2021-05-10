let changeButton = document.getElementById('changeButton');
let changeTitle = document.getElementById('changeTitle');
let changeContenedor = document.getElementById('changeContenedor');
let changeP = document.getElementById('changeP');
let step_1 = document.getElementsByClassName('pasos')[2];
let step_2 = document.getElementsByClassName('pasos')[1];
let step_3 = document.getElementsByClassName('pasos')[0];
let button_comenzar = document.getElementsByClassName('comenzar')[0];
let button_acceso = document.getElementsByClassName('dar_acceso')[0];
let button_grabar = document.getElementsByClassName('grabar')[0];
let button_finalizar = document.getElementsByClassName('finalizar')[0];
let button_subir = document.getElementsByClassName('subir-gifo')[0];

//permisos camara, grabaciones y guardarlos
let video = document.getElementById('video');
let mensaje = document.getElementById('grabando');
let form = new FormData();
let urlGifSubida = "https://upload.giphy.com/v1/gifs?api_key=ElUCJDgPAZ7oEbz7HipfD7wCwoprG4zS"
let urlGifSubidos = [];

button_comenzar.addEventListener('click', () => {
    step_1.setAttribute('src', '../assets/paso-a-paso-hover.svg');
    changeContenedor.style.padding = "7.5% 12% 4% 12%";
    changeTitle.innerHTML = "¿Nos das acceso a tu cámara?";
    changeP.innerHTML = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    button_comenzar.style.display = "none";
    button_acceso.style.display = "flex";
})

button_acceso.addEventListener('click', () => {
    button_acceso.style.display = "none";
    step_1.setAttribute('src', '../assets/paso-a-paso.svg');
    step_2.setAttribute('src', '../assets/paso-a-paso-hover-2.svg');
    changeTitle.style.display = "none";
    changeP.style.display = "none";
    button_grabar.style.display = 'flex';
})

button_grabar.addEventListener('click', () => {
    button_grabar.style.display = 'none';
    button_finalizar.style.display = 'flex';
})

button_finalizar.addEventListener('click', () => {
    button_finalizar.style.display = 'none';
    button_subir.style.display = 'flex';
})

button_subir.addEventListener('click', () => {
    button_subir.style.display = 'none';
    step_2.setAttribute('src', '../assets/paso-a-paso-2.svg');
    step_3.setAttribute('src', '../assets/paso-a-paso-hover-3.svg');
})

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 400 }
        }
    })
        .then(function (stream) {
            button_acceso.style.display = "none";
            step_1.setAttribute('src', '../assets/paso-a-paso.svg');
            step_2.setAttribute('src', '../assets/paso-a-paso-hover-2.svg');
            changeTitle.style.display = "none";
            changeP.style.display = "none";
            button_grabar.style.display = 'flex';
            video.srcObject = stream;
            video.play()
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
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
}
function detenerGrabacion() {
    recorder.stopRecording();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(form.get('file'));
    subirGifo();
    form.delete('file')
    recorder.reset();
}
let subirGifo = () =>{
    fetch(urlGifSubida,{
        method: "POST",
        body: form
    }).then(response => response.json())
    .then(data =>{
        console.log(data.data.id);
        conseguirIMG(data.data.id);
        console.log('Sirvio xd');
    }).catch(message_error => console.log('F' + message_error))
}
let conseguirIMG = (id) =>{
    fetch("https://api.giphy.com/v1/gifs/" + id +"?api_key=ElUCJDgPAZ7oEbz7HipfD7wCwoprG4zS", {

    }).then(response => response.json())
    .then(data => {
        console.log(data.data.images.original.url);
        let urlGif = data.data.images.original.url;
        let dataUrlGifSubidos = JSON.parse(localStorage.getItem("urlGifSubidos"));
        if(dataUrlGifSubidos==null){
            localStorage.setItem('urlGifSubidos', JSON.stringify(urlGifSubidos));
            dataUrlGifSubidos = JSON.parse(localStorage.getItem("urlGifSubidos"));
            dataUrlGifSubidos.push(urlGif);
        }else{
            dataUrlGifSubidos.push(urlGif);
        }
        localStorage.setItem('urlGifSubidos', JSON.stringify(dataUrlGifSubidos));
    }).catch(message_error => console.log('F' + message_error))
    }
    