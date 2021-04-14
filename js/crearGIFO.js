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

button_comenzar.addEventListener('click', () => {
    step_1.setAttribute('src', '../assets/paso-a-paso-hover.svg');
    changeContenedor.style.padding = "7.5% 12% 4% 12%";
    changeTitle.innerHTML = "¿Nos das acceso a tu cámara?";
    changeP.innerHTML = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    button_comenzar.style.display = "none";
    button_acceso.style.display = "flex";
})

button_acceso.addEventListener('click',() =>{
    button_acceso.style.display = "none";
    step_1.setAttribute('src', '../assets/paso-a-paso.svg');
    step_2.setAttribute('src', '../assets/paso-a-paso-hover-2.svg');
    changeTitle.style.display = "none";
    changeP.style.display = "none";
    button_grabar.style.display = 'flex';
})

button_grabar.addEventListener('click',() =>{
    button_grabar.style.display = 'none';
    button_finalizar.style.display = 'flex';
})

button_finalizar.addEventListener('click',() =>{
    button_finalizar.style.display = 'none';
    button_subir.style.display = 'flex';
})

button_subir.addEventListener('click',() =>{
    button_subir.style.display = 'none';
    step_2.setAttribute('src', '../assets/paso-a-paso-2.svg');
    step_3.setAttribute('src', '../assets/paso-a-paso-hover-3.svg');
})



