//Cordova
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

class SectionNav {
  constructor() {
    this.redireccion();
  }

  redireccion() {
    document.addEventListener('DOMContentLoaded', () => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', event => {
          event.preventDefault();
          const targetId = link.getAttribute('data-target'); // Utiliza 'link' en lugar de 'this'
          const clase = link.getAttribute('class'); // Utiliza 'link' en lugar de 'this'
          if (clase && clase.split(' ').includes("nav-link")) {
            this.closeNav(); // Llama al método closeNav() de la instancia actual de SectionNav
          } else {
            var loginImage = document.getElementById("loginImage");
            loginImage.src = "img/background2.png";
          }

          const sections = document.querySelectorAll('section');
          sections.forEach(section => {
            if (section.id === targetId) {
              section.style.display = 'block';
            } else {
              section.style.display = 'none';
            }
          });

          if (targetId == "createAccount") {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(but => {
              const targetId = but.getAttribute('data-target');
              if (targetId == "thisloginButton") {
                but.style.width = "50px";
              }
            });
          }
        });
      });
    });
  }

  closeNav() {
    $("#navbarOffcanvasLg").offcanvas('hide'); // Cierra el navbar offcanvas
  }
}

class ConectionSmart{
  constructor(){
    this.get();
  }

  availableNetworks() {
    const select = document.getElementById('miSelect');

    WifiWizard2.scan()
        .then(function(results) {
            // Extraer solo los SSID de los resultados del escaneo
            const ssids = results.map(function(result) {
                return result.SSID;
            });

            // Limpiar opciones existentes
            select.innerHTML = '';

            // Agregar opciones al select
            ssids.forEach(function(ssid) {
                const option = document.createElement('option');
                option.value = ssid;
                option.textContent = ssid;
                select.appendChild(option);
            });
        })
        .catch(function(error) {
            // Manejar cualquier error que pueda ocurrir
            alert("Error al escanear redes: " + error);
        });
  }

  get() {
      // Captura el select y la tarjeta
      const select = document.getElementById('miSelect');
      const tarjeta = document.getElementById('tarjeta');
      const contenidoTarjeta = document.getElementById('contenido');
    
      // Agrega un event listener al select
      select.addEventListener('change', function(event) {
          // Muestra la tarjeta
          tarjeta.style.display = 'block';
          // Muestra el fondo negro
          
          // Actualiza el contenido de la tarjeta con el valor seleccionado
          contenidoTarjeta.textContent = select.value;
          // Muestra el formulario flotante
        
      });
  }
  connectToWifi(ssid, password) {

    /*
    WifiWizard2.connect(ssid, true, password, 'WPA') // Aquí asumo que 'WPA' es el algoritmo para WPA2
        .then(function(result) {
            // Manejar el resultado de la conexión aquí
            alert("Resultado de la conexión: " + JSON.stringify(result));
        })
        .catch(function(error) {
            // Manejar cualquier error que pueda ocurrir
            alert("Error al conectar a la red WiFi: " + error);
        });*/
  
      
    wifiManager.connect(
      ssid,
      password,
      () => {
        alert('connect method was successfully called.');
      },
      (result) => {
        alert('connect method failed to be called.');
        alert(`code: ${result.code}, message: ${result.message}`);
      }
    );
        
  }
  
  conectar(){
    let contenidoTarjeta = document.getElementById('contenido').textContent;
    let  wifi = document.getElementById('wifi').value;
    alert(`ssid es ${contenidoTarjeta} y password es ${wifi}`)
    connectToWifi(contenidoTarjeta, wifi);
  
  }

}
class Service{
  constructor(){
  }
  showDataService() {
    let data = {gmail: localStorage.getItem("login") }

  //https://smartpot-api.vercel.app/insertUser
    return fetch("http://localhost:9001/showUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al enviar el formulario.' + response);
        }
        return response.text();
      })
      .then(data => {
        // Manejar la respuesta del servidor si es necesario
        console.log(JSON.parse(data));
        let a = JSON.parse(data);
        return a;
    
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al enviar el formulario.');
      });
  }

  updateUser (json, direction) {
    
    //https://smartpot-api.vercel.app/insertUser
    fetch(direction, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al enviar el formulario.' + response);
          }
          return response.text();
        })
        .then(data => {
          // Manejar la respuesta del servidor si es necesario
          console.log(json);
          localStorage.setItem("login", json.gmail)
          insertUserfortwo ();
        
          
          alert(data);
          // Puedes redirigir al usuario a otra página si lo deseas
          
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Hubo un problema al enviar el formulario.');
        });
  }
  showPots(pots){
    let data = {_id: pots }

  //https://smartpot-api.vercel.app/insertUser
  return fetch("http://localhost:9001/showPots", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al enviar el formulario.' + response);
      }
      return response.text();
    })
    .then(data => {
      // Manejar la respuesta del servidor si es necesario
      console.log(JSON.parse(data));
      let a = JSON.parse(data);
      return a;
  
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al enviar el formulario.');
    });
  }
}
class DataApp{
  constructor(){

    this.serviceData = new Service ()
    this.showUser();
    this.createCards();
  }
  async showUser(){

    let data = await this.serviceData.showDataService();
    let nav = document.getElementById("userNameNav");
    let nameUser = document.getElementById("Username");
    let gmail = document.getElementById("Usergmail");
    let password = document.getElementById("Userpassword");


      for (const doc of data) {
      nav.innerHTML =  doc.name;
      nameUser.innerHTML = doc.name;
      gmail.innerHTML = doc.gmail;
      password.innerHTML = doc.password;
    }
  } 
  async createCards(){
    let principalCard = document.getElementById("principalCard");
    let contenido = "";
    let data = await this.serviceData.showDataService();
    let showSataSmart = data[0];
    let _pots = showSataSmart.pots;
    

    for (let element of _pots) {
      
      let informationPots = await this.serviceData.showPots(element);
      console.log(informationPots);
      contenido += `<div class="card">
      <div class="card__image-holder">
        <img class="card__image" src="img/menta.png" alt="wave" />
      </div>
      <div class="card-title">
        <a href="#" class="toggle-info btn">
          <span class="left"></span>
          <span class="right"></span>
        </a>
        <div style="text-align: center;">
          <h2>
            ${informationPots._id}
            <small>Menta</small>
          </h2>
        </div>
        
      </div>
      <div class="card-flap flap1" style="text-align: center;">
        <div class="card-description">
          <ul style="list-style-type: none; ">
            <li>
              <div class="col-12">
                <div class="col-6" style="display: flex; justify-content: flex-start;">
                  <img src="img/temperature.svg" alt=""> Temperatura
                </div>
                <div class="col-6">
                  <span id="temperatureCard"> ${informationPots.climateTemperature}</span>
                </div>
              </div> 
            </li>
            <li>
              <div class="col-12">
                <div class="col-6" style="display: flex; justify-content: flex-start;">
                  <img src="img/humidity.svg" alt=""> Humedad
                </div>
                <div class="col-6">
                  <span id="humidity"> ${informationPots.soilMoisture}</span>
                </div>
              </div>
            </li>
            <li>
              <div class="col-12">
                <div class="col-6" style="display: flex; justify-content: flex-start;">
                  <img src="img/brightness.svg" alt=""> Luminosidad
                </div>
                <div class="col-6">
                  <span id="brightnessCard"> ${informationPots.brightness}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>`
    }
    principalCard.innerHTML = contenido;
  
  }
}
  
const serviceData = new Service()
const showApp = new DataApp();
//Objetos
var sectionnav = new SectionNav();
var conection = new ConectionSmart();

/*

function a() {
  const select = document.getElementById('miSelect');

  WifiWizard2.scan()
      .then(function(results) {
          // Extraer solo los SSID de los resultados del escaneo
          const ssids = results.map(function(result) {
              return result.SSID;
          });

          // Limpiar opciones existentes
          select.innerHTML = '';

          // Agregar opciones al select
          ssids.forEach(function(ssid) {
              const option = document.createElement('option');
              option.value = ssid;
              option.textContent = ssid;
              select.appendChild(option);
          });
      })
      .catch(function(error) {
          // Manejar cualquier error que pueda ocurrir
          alert("Error al escanear redes: " + error);
      });
  
}
function get(){
  
// Captura el select y la tarjeta
const select = document.getElementById('miSelect');
const tarjeta = document.getElementById('tarjeta');
const contenidoTarjeta = document.getElementById('contenido');
const formFlotante = document.querySelector('.form-float');
const fondoNegro = document.querySelector('.bckgrnd-black');

// Agrega un event listener al select
select.addEventListener('change', function(event) {
    // Muestra la tarjeta
    tarjeta.style.display = 'block';
    // Muestra el fondo negro
    fondoNegro.style.display = 'block';
    // Actualiza el contenido de la tarjeta con el valor seleccionado
    contenidoTarjeta.textContent = select.value;
    // Muestra el formulario flotante
    formFlotante.style.display = 'block';
});

}
function connectToWifi(ssid, password) {

  /*
  WifiWizard2.connect(ssid, true, password, 'WPA') // Aquí asumo que 'WPA' es el algoritmo para WPA2
      .then(function(result) {
          // Manejar el resultado de la conexión aquí
          alert("Resultado de la conexión: " + JSON.stringify(result));
      })
      .catch(function(error) {
          // Manejar cualquier error que pueda ocurrir
          alert("Error al conectar a la red WiFi: " + error);
      });

    
         wifiManager.connect(
            ssid,
            password,
            () => {
              alert('connect method was successfully called.');
            },
            (result) => {
              alert('connect method failed to be called.');
              alert(`code: ${result.code}, message: ${result.message}`);
            }
          );
      
}

function conectar(){
  let contenidoTarjeta = document.getElementById('contenido').textContent;
  let  wifi = document.getElementById('wifi').value;
  alert(`ssid es ${contenidoTarjeta} y password es ${wifi}`)
  connectToWifi(contenidoTarjeta, wifi);


}

get();
*/




console.log(localStorage.getItem("login"));
var contentDiv = document.getElementById("contentDiv");
  var toggleButton = document.getElementById("toggleButton");
  var overlay = document.getElementById("overlay");

  // Evento de clic en el botón para mostrar/ocultar el contenido
  toggleButton.addEventListener("click", function(event) {
    contentDiv.classList.toggle("active");
    overlay.style.display = contentDiv.classList.contains("active") ? "block" : "none"; // Mostrar u ocultar el fondo semitransparente
    event.stopPropagation(); // Evita que el clic en el botón se propague al documento
  });

  // Evento de clic en cualquier parte del documento para ocultar el contenido
  document.addEventListener("click", function(event) {
    if (!toggleButton.contains(event.target) && !contentDiv.contains(event.target)) {
      contentDiv.classList.remove("active");
      overlay.style.display = "none"; // Ocultar el fondo semitransparente
    }
  });












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



const labels = ['Lun', 'Mar', 'Mierc', 'Juev', 'Vier', 'Sab', 'Dom' ]

const dataset1 = {
    label: "Riego por dia",
    data: [1, 3, 4, 1, 0, 0, 0],
    borderColor: 'rgba(248, 37, 37, 0.8)',
    fill: false,
    tension: 0.1
};



const dataContenedor  = {
    label: "Porcentaje de Agua",
    data: [100, 70, 70, 50, 30, 20, 0],
    borderColor: 'rgba(248, 37, 37, 0.8)',
    fill: false,
    tension: 0.1
};
const graph = document.querySelector("#grafica");
const as = document.querySelector("#a");
const pasa = document.querySelector("#pasa");

const data = {
    labels: labels,
    datasets: [dataset1]
};

const dataContenedor1 = {
  labels: labels,
  datasets: [dataContenedor]
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
            max: 5
          }
        }
      }
};


const ala = {
    type: 'bar',
    data: dataContenedor1,
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


 /* Direc */

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

  
 



 

  

  
 document.getElementById("22292072").addEventListener("submit", function(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado de redireccionamiento
    
    // Obtener los datos del formulario
    var formData = new FormData(event.target);
    const dataForm = Object.fromEntries(formData.entries());
    const camposExtras = { "originGmail": localStorage.getItem("login") };
  
    var jsonCombinado = Object.assign({}, dataForm, camposExtras);
    console.log(jsonCombinado);
    let direction = 'http://localhost:9001/updateUser';
  

    serviceData.updateUser(jsonCombinado, direction);
    
    // Realizar una solicitud POST utilizando Fetch API
    //https://smartpot-api.vercel.app/insertUser
  
  });


  

