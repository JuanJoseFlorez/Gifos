/**
 * Para la seccion de crear GIFOS
 */
/** 
let changeButton = document.getElementById('changeButton');

/*changeButton.addEventListener('click', () => {
    let changeTitle = document.getElementById('changeTitle');
    let changeContenedor = document.getElementById('changeContenedor');
    let changeP = document.getElementById('changeP');
    let step_1 = document.getElementById('step_1');
    step_1.setAttribute('src', '../assets/paso-a-paso-hover.svg')
    changeContenedor.style.padding = "7.5% 12% 4% 12%";
    changeTitle.innerHTML = "¿Nos das acceso a tu cámara?";
    changeP.innerHTML = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
    changeButton.style.display = "none";
})*/
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }

function togglePopUp(id, user, title){
    let user2 = document.getElementById(user);
    let title2 = document.getElementById(title);
    let imagen = document.getElementById('gif-max');
    let userMax = document.getElementById('user-max');
    let titleMax = document.getElementById('title-max')
    let url = $('#'+id).attr('src');
    userMax.innerHTML = user2.innerHTML;
    if(title2.innerHTML == ""){
      titleMax.innerHTML = "Sin titulo";
    }else{
      titleMax.innerHTML = title2.innerHTML;
    }
    imagen.setAttribute('src', url);
    document.getElementById("popup-1").classList.toggle("active");
  }
  function cerrarPopUp(){
    document.getElementById("popup-1").classList.toggle("active");
  }