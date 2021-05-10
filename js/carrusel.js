    /*window.addEventListener('load',function(){
    document.querySelector('.glider').addEventListener('glider-slide-visible', function(event){
        var glider = Glider(this);
        console.log('Slide Visible %s', event.detail.slide)
    });
    document.querySelector('.glider').addEventListener('glider-slide-hidden', function(event){
        console.log('Slide Hidden %s', event.detail.slide)
    });
    document.querySelector('.glider').addEventListener('glider-refresh', function(event){
        console.log('Refresh')
    });
    document.querySelector('.glider').addEventListener('glider-loaded', function(event){
        console.log('Loaded')
    });

    window._ = new Glider(document.querySelector('.glider'), {
        slidesToShow: 1, //'auto',
        slidesToScroll: 1,
        itemWidth: 150,
        draggable: true,
        scrollLock: false,
        dots: '#dots',
        rewind: true,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        },
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToScroll: 'auto',
                    itemWidth: 300,
                    slidesToShow: 'auto',
                    exactWidth: true
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToScroll: 4,
                    slidesToShow: 4,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToScroll: 3,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToScroll: 2,
                    slidesToShow: 2,
                    dots: false,
                    arrows: false,
                    scrollLock: true
                }
            }
        ]
    });
  });*/
var current = 0;
var imagenes = new Array();
let imagenesAMostrar = 1;

function myFunction(x) {
    if (x.matches) {
        imagenesAMostrar = 3;
        console.log(imagenesAMostrar);
    }else{
        imagenesAMostrar = 1;
        console.log(imagenesAMostrar);
    }
  }
  
  var x = window.matchMedia("(min-width: 700px)")
  myFunction(x);
  x.addListener(myFunction)

$(document).ready(function() {
    var numImages = 6;
    if (numImages <= imagenesAMostrar) {
        $('.right-arrow').css('display', 'none');
        $('.left-arrow').css('display', 'none');
    }
 
    $('.left-arrow').on('click',function() {
        
        if (current > 0) {
            current = current - 1;
        } else {
            current = numImages - imagenesAMostrar;
        }
 
        $(".carrusel").animate({"left": -($('#trending_'+current).position().left)}, 600);
 
        return false;
    });
 
    $('.right-arrow').on('click', function() {
        if (numImages > current + imagenesAMostrar) {
            current = current+1;
        } else {
            current = 0;
        }
 
        $(".carrusel").animate({"left": -($('#trending_'+current).position().left)}, 600);
 
        return false;
    }); 
 });