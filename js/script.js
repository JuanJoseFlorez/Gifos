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
});
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
  console.log("a");
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

  async function descargarGIFO(id) {
    let gifi = $('#' + id).attr('src');
    //create new a element
    let a = document.createElement('a');
    // get image as blob
    let response = await fetch(gifi);
    console.log(response)
    let file = await response.blob();
    // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
    a.download = 'My_GIFO';
    a.href = window.URL.createObjectURL(file);
    //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    //click on element to start download
    a.click();
}