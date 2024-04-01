//REDES DISPONIBLES
/*
function a() {
    const listado = document.getElementById('miLista');
    
    WifiWizard2.scan()
        .then(function(results) {
            // Extraer solo los SSID de los resultados del escaneo
            const ssids = results.map(function(result) {
                return result.SSID;
            });
            let lista 
            = '';
            for (let i = 0; i < ssids.length; i++) {
                // Acceder al SSID en la posición i y mostrarlo en la consola
                    lista += `<li  value="${ssids[i]}"><img class="nav-icon icons" src="img/potted-plant.svg"/>&nbsp;&nbsp;&nbsp;${ssids[i]}</li>`
            
            }
            listado.innerHTML = lista;
            //alert("SSIDs de las redes escaneadas: " + JSON.stringify(ssids));
        })
        .catch(function(error) {
            // Manejar cualquier error que pueda ocurrir
            alert("Error al escanear redes: " + error);
        });
    }
*/
    
function a() {
    const listado = document.getElementById('miLista');

    WifiWizard2.scan()
        .then(function(results) {
            // Filtrar solo las redes que empiezan con "smartpot"
            const ssids = results.filter(result => result.SSID.toLowerCase().startsWith('academico')).map(result => result.SSID);

            if (ssids.length === 0) {
                // Si no se encuentran redes, mostrar un mensaje
                listado.innerHTML = '<li>No se encontraron redes Mega"</li>';
            } else {
                // Mostrar las redes encontradas
                let lista = '';
                for (let i = 0; i < ssids.length; i++) {
                    
                        
                    lista += `<li value="${ssids[i]}">&nbsp;&nbsp;&nbsp;<img class="nav-icon icons" src="img/potted-plant.svg"/>&nbsp;&nbsp;&nbsp;${ssids[i]}</li>`;

                    
                }
                listado.innerHTML = lista;
            }
        })
        .catch(function(error) {
            // Manejar cualquier error que pueda ocurrir
            alert("Error al escanear redes: " + error);
        });
}




function get(){
    
    // Captura la lista y la tarjeta
    const lista = document.getElementById('miLista');
    const tarjeta = document.getElementById('tarjeta');
    const contenidoTarjeta = document.getElementById('contenido');
    const formFlotante = document.querySelector('.form-float');
    const fondoNegro = document.querySelector('.bckgrnd-black');
    

    // Agrega un event listener a la lista
    lista.addEventListener('click', function(event) {
        // Verifica si se hizo clic en un elemento de la lista
        if (event.target.tagName === 'LI') {
            // Muestra la tarjeta
            tarjeta.style.display = 'block';
            // Muestra el fondo negro
            fondoNegro.style.display = 'block';
            // Actualiza el contenido de la tarjeta con el valor del elemento clicado
            contenidoTarjeta.textContent = event.target.getAttribute('value');
            // Muestra el formulario flotante
            formFlotante.style.display = 'block';
        }
    });

    
    const cerrarBtn = document.getElementById('cerrarBtn');
    cerrarBtn.addEventListener('click', function(event) {
        // Oculta la tarjeta y el formulario flotante
        tarjeta.style.display = 'none';
        fondoNegro.style.display = 'none';
        formFlotante.style.display = 'none';

        // Evita el comportamiento predeterminado del enlace (no se desplazará)
        event.preventDefault();
    });


}


function connectToWifi(ssid, password) {
    
    WifiWizard2.connect(ssid, true, password, 'WPA', false) // Aquí asumo que 'WPA' es el algoritmo para WPA2
        .then(function(result) {
            // Manejar el resultado de la conexión aquí
            alert("Resultado de la conexión: " + JSON.stringify(result));
            document.getElementById('form-pot').style.display = 'block';
        })
        .catch(function(error) {
            // Manejar cualquier error que pueda ocurrir
            alert("Error al conectar a la red WiFi: " + error);
        });
}

function conectar(){
    let contenidoTarjeta = document.getElementById('contenido').textContent;
    let  wifi = document.getElementById('wifi').value;
    alert(`SSID es ${contenidoTarjeta} y Password es ${wifi}`)
    connectToWifi(contenidoTarjeta, wifi);

}

get();



class SectionNav {
    constructor() {
        this.initialize();
    }

    initialize() {
        var self = this;
        var navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Evitar el comportamiento predeterminado de los enlaces

                // Obtener el valor del atributo 'data-target' para encontrar la sección correspondiente
                var target = this.getAttribute('data-target');

                // Mostrar la sección correspondiente
                self.mostrarSeccion(target);

                // Cierra el navbar al cambiar de sección
                var navbarCollapse = document.querySelector('#navbarOffcanvasLg');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }

                // Cambia la clase del div
                var miDiv = document.querySelector('.offcanvas-backdrop.fade.show');
                miDiv.classList.remove('offcanvas-backdrop', 'fade', 'show'); // Elimina la clase original
                miDiv.classList.add('offcanvas-backdrop', 'fade'); // Agrega la nueva clase
            });
        });
    }

    mostrarSeccion(idSeccion) {
        var todasLasSecciones = document.querySelectorAll('section');
        todasLasSecciones.forEach(function(seccion) {
            if (seccion.id === idSeccion) {
                seccion.style.display = 'block';
            } else {
                seccion.style.display = 'none';
            }
        });
    }
}

var sectionnav = new SectionNav();



// EJECUCIÓN EN SEGUNDO PLANO
document.addEventListener('deviceready', function () {
    // Habilitar el modo de fondo
    cordova.plugins.backgroundMode.setEnable(true);

    // Personalizar las opciones del modo de fondo si es necesario
    cordova.plugins.backgroundMode.setDefaults({ silent: true });
}, false);



// CÁMARA
function capturar(){
    navigator.camera.getPicture(satisfactorio,onFail, {  
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth:300,
        targetHeight:300,
        correctOrientation:true,
        saveToPhotoAlbum: true,
        cameraDirection: 1
    });       
} 

function satisfactorio(imageURI) {
    var image = document.getElementById("foto");    
    image.src = imageURI; //"data:image/jpeg;base64," +
    document.getElementById("archivo").innerHTML = imageURI;
}  

function onFail(message) {
    alert('Error: ' + message);
}

function cargar(){
    navigator.camera.getPicture(satisfactorio, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth:300,
        targetHeight:300,
        correctOrientation:true
     });        
}  







function mostrarFormulario() {
    // Código para mostrar el formulario flotante
    var fondoOscuro = document.querySelector('.fondo-oscuro');
    var formularioModificar = document.getElementById('formularioModificar');

    fondoOscuro.style.display = 'block';
    formularioModificar.style.display = 'block';
}

function cerrarFormulario() {
    var fondoOscuro = document.querySelector('.fondo-oscuro');
    var formularioModificar = document.getElementById('formularioModificar');

    fondoOscuro.style.display = 'none';
    formularioModificar.style.display = 'none';
}

function toggleNavbar() {
    var navbarCollapse = document.getElementById('navbarColor03');
    if (navbarCollapse.style.display === 'block') {
        navbarCollapse.style.display = 'none';
    } else {
        navbarCollapse.style.display = 'block';
    }
}

function cancelFormu() {
    window.location.href = "#seccion-principal";
}



  





const labels = ['Enero', 'Febrero', 'Marzo', 'Abril']

const dataset1 = {
    label: "Dataset 1",
    data: [10, 55, 60, 120],
    borderColor: 'rgba(248, 37, 37, 0.8)',
    fill: false,
    tension: 0.1
};

const dataset2 = {
    label: "Dataset 2",
    data: [5, 44, 55, 100],
    borderColor: 'rgba(69, 248, 84, 0.8)',
    fill: false,
    tension: 0.1
};

const dataset3 = {
    label: "Dataset 3",
    data: [20, 40, 55, 120],
    borderColor: 'rgba(69, 140, 248, 0.8)',
    fill: false,
    tension: 0.1
};

const dataset4 = {
    label: "Dataset 4",
    data: [18, 40, 20, 100],
    borderColor: 'rgba(245, 40, 145, 0.8)',
    fill: false,
    tension: 0.1
};

const graph = document.querySelector("#grafica");
const as = document.querySelector("#a");
const pasa = document.querySelector("#pasa");

const data = {
    labels: labels,
    datasets: [dataset1,dataset2,dataset3,dataset4]
};

const config = {
    type: 'line',
    data: data,
    options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: { // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100
          }
        }
      }
};
const ala = {
    type: 'bar',
    data: data,
    options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: { // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100
          }
        }
      }
};

new Chart(graph, config);
new Chart(as, ala);
new Chart(pasa, config);


 
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },

   
  });