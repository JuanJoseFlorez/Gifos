/**
 * Para la seccion de crear GIFOS
 */
 
let changeButton = document.getElementById('changeButton');

changeButton.addEventListener('click', () => {
    let changeTitle = document.getElementById('changeTitle');
    let changeContenedor = document.getElementById('changeContenedor');
    let changeP = document.getElementById('changeP');
    let step_1 = document.getElementById('step_1');
    step_1.setAttribute('src', '../assets/paso-a-paso-hover.svg')
    changeContenedor.style.padding = "7.5% 12% 4% 12%";
    changeTitle.innerHTML = "¿Nos das acceso a tu cámara?";
    changeP.innerHTML = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    changeButton.style.display = "none";
})

function togglePopUp(){
    document.getElementById("popup-1").classList.toggle("active");
  }
