
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }

function togglePopUp(id){
    let imagen = document.getElementById('gif-max');
    let url = $('#'+id).attr('src');
    imagen.setAttribute('src', url);
    document.getElementById("popup-1").classList.toggle("active");
  }
