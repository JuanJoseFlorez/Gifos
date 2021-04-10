let nocturno = document.getElementById('Nocturno');
let hrs = document.getElementsByClassName('hrs');
let logoGIFOS = document.getElementById('logoGIFOS');
let crearGIFO = document.getElementById('crearGIFO');
let burgerMovil= document.getElementById('burgerMovil');
let hrsBurguer = document.getElementsByClassName('hrsBurguer');


nocturno.addEventListener('click', () => {
    if(nocturno.innerHTML == "Modo Nocturno"){
        document.documentElement.style.setProperty('--default-background', '#37383C');
        document.documentElement.style.setProperty('--purple-gifos', 'white');
        document.documentElement.style.setProperty('--purple-movile', 'black');
        document.documentElement.style.setProperty('--color-p', 'white');

        //PARA LOS HR'S DE MAIN Y FOOTER
        for(let i = 0; i < hrs.length; i++){
            hrs[i].setAttribute('color','black');
        }
        //-----------------------
        //PARA LOS HR'S DE MENU HAMBURGUESA
        for(let i = 0; i < hrsBurguer.length; i++){
            hrsBurguer[i].setAttribute('color', '#37383C');
        }
        //-----------------------
        logoGIFOS.style.content = ' url("../assets/logo-mobile-modo-noct.svg")';
        crearGIFO.style.content = ' url("../assets/CTA-crar-gifo-modo-noc.svg")';
        burgerMovil.style.content = ' url("../assets/burger-modo-noct.svg")';
        // HOVER DE CREAR GIFO
        crearGIFO.addEventListener('mouseover', ()=>{
            crearGIFO.style.content = ' url("../assets/CTA-crear-gifo-hover-modo-noc.svg")';
        })
        crearGIFO.addEventListener('mouseout', ()=>{
            crearGIFO.style.content = ' url("../assets/CTA-crar-gifo-modo-noc.svg")';
        })
        // ---------------------
        nocturno.innerHTML = "Modo Diurno";
    }else{
        document.documentElement.style.setProperty('--default-background', 'white');
        document.documentElement.style.setProperty('--purple-gifos', '#572EE5');
        document.documentElement.style.setProperty('--purple-movile', '#572EE5');
        document.documentElement.style.setProperty('--color-p', 'black');
        //PARA LOS HR'S DE MAIN Y FOOTER
        for(let i = 0; i < hrs.length; i++){
            hrs[i].setAttribute('color','#572EE5');
        }
        //-----------------------
        //PARA LOS HR'S DE MENU HAMBURGUESA
        for(let i = 0; i < hrsBurguer.length; i++){
            hrsBurguer[i].setAttribute('color', '#7B5DE3');
        }
        //-----------------------
        logoGIFOS.style.content = ' url("../assets/logo-mobile.svg")';
        crearGIFO.style.content = ' url("../assets/button-crear-gifo.svg")';
        burgerMovil.style.content = ' url("../assets/burger.svg")';
        // HOVER DE CREAR GIFO
        crearGIFO.addEventListener('mouseover', ()=>{
            crearGIFO.style.content = ' url("../assets/CTA-crear-gifo-hover.svg")';
        })
        crearGIFO.addEventListener('mouseout', ()=>{
            crearGIFO.style.content = ' url("../assets/button-crear-gifo.svg")';
        })
        // ---------------------
        nocturno.innerHTML = "Modo Nocturno";
    }
    console.log(nocturno.innerHTML)
})