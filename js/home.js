alert('funciona')

let lupa = document.getElementsByClassName('search')[0];
let contenedor = document.getElementById('Busqueda');
let input_gifo = document.getElementsByClassName('input_gifo')[0];
let change_title = document.getElementsByClassName('change_title')[0];
let imagenes = document.getElementsByClassName('resultado_gifos');

lupa.addEventListener('click', () => {
    if (input_gifo.value = "") {
        
    } else {
        contenedor.style.display = "flex";
        generarGIFO();
        change_title.innerHTML = input_gifo.value;
    }
})

input_gifo.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {

        contenedor.style.display = "flex";
        generarGIFO();
        change_title.innerHTML = input_gifo.value;

    }
})

function generarGIFO() {
    async function obtenerInformacionGIFO() {
        let response = await fetch("https://api.giphy.com/v1/gifs/search?api_key=ElUCJDgPAZ7oEbz7HipfD7wCwoprG4zS&q=" + input_gifo.value + "&limit=12&offset=0&rating=g&lang=en");
        let gif = await response.json();
        return gif;
    }

    let promesaGif = obtenerInformacionGIFO();

    promesaGif
        .then(data => {
            console.log(data);

            for (let i = 0; i < imagenes.length; i++) {
                let gifi = data.data[i].images.original.url;
                imagenes[i].setAttribute('src', gifi);


            }



        })
        .catch(error => console.log(error));
}


