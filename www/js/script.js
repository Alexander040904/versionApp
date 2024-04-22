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
class Grafic {
  constructor() {}

  line(data, canvas) {
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

    // Destruir el gráfico anterior si existe
    if (canvas.chart) {
      canvas.chart.destroy();
    }

    // Crear el nuevo gráfico
    canvas.chart = new Chart(canvas, config);
  }

  bar(data, canvas) {
    const config = {
      type: 'bar',
      data: data,
      options: {
        animation: {
          duration: 5000,
          easing: 'easeOutBounce',
          animateScale: false, // Habilitar animación de escala para gráficos de barras

        },
        scales: {
          y: {
            min: 0,
            max: 100
          }
        }
      }
    };

    // Destruir el gráfico anterior si existe
    if (canvas.chart) {
      canvas.chart.destroy();
    }

    // Crear el nuevo gráfico
    canvas.chart = new Chart(canvas, config);
  }
}
class DataApp{
  constructor(){

    this.serviceData = new Service ()
    this.createinformationGrafic = new Grafic ()
    this.showUser();
    this.createCards().then(() => {
      this.autoUpdateCards(); // Llamar a autoUpdateCards() después de que se completen las tarjetas
    });
    this.createGrafic().then(()=>{
      this.autoUpdateGrafic();
    });
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
    let i = 1;
    

    for (let element of _pots) {
      
      let informationPots = await this.serviceData.showPots(element);
      console.log("2");
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
            Smart Pot ${i}
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
                  <span id="${informationPots._id}temperatureCard"> ${informationPots.climateTemperature}</span>
                </div>
              </div> 
            </li>
            <li>
              <div class="col-12">
                <div class="col-6" style="display: flex; justify-content: flex-start;">
                  <img src="img/humidity.svg" alt=""> Humedad
                </div>
                <div class="col-6">
                  <span id="${informationPots._id}humidity"> ${informationPots.soilMoisture}</span>
                </div>
              </div>
            </li>
            <li>
              <div class="col-12">
                <div class="col-6" style="display: flex; justify-content: flex-start;">
                  <img src="img/brightness.svg" alt=""> Luminosidad
                </div>
                <div class="col-6">
                  <span id="${informationPots._id}brightnessCard"> ${informationPots.brightness}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>`
    i++;
    }
    principalCard.innerHTML = contenido;
  
  }
  async updateCardData() {
    console.log("1");
    let principalCard = document.getElementById("principalCard");
    let data = await this.serviceData.showDataService();
    let _pots = data[0].pots;
    if (!principalCard) {
      console.error("Elemento principalCard no encontrado");
      return;
    }
    else{
      for (let i = 0; i < _pots.length; i++) {
        let card = principalCard.children[i]; // Obtenemos la tarjeta en la posición i
        let informationPots = await this.serviceData.showPots(_pots[i]);

        // Actualizamos los datos en la tarjeta
        card.querySelector(`#${informationPots._id}temperatureCard`).innerText = informationPots.climateTemperature;
        card.querySelector(`#${informationPots._id}humidity`).innerText = informationPots.soilMoisture;
        card.querySelector(`#${informationPots._id}brightnessCard`).innerText = informationPots.brightness;
    }
    }
    // Recorremos las tarjetas existentes y actualizamos los datos
   
  }
  async autoUpdateCards() {
    await this.updateCardData(); // Actualiza los datos de las tarjetas
    setTimeout(this.autoUpdateCards.bind(this), 30000); // Ejecuta la función cada 30 segundos (30000 milisegundos)
  }
  async createGrafic(){
    let principalCard = document.getElementById("waterCards");
    principalCard.innerHTML = "";
   
    let data = await this.serviceData.showDataService();
    let showSataSmart = data[0];
    let _pots = showSataSmart.pots;
    let i = 1;


    
    var nombresDias = ['Dom', 'Lun', 'Mar', 'Mierc', 'Juev', 'Vier', 'Sab'];
    

    var dataLineGrafic = new Array(7);
    var dataBarGrafic = new Array(7);

  
    for (let element of _pots) {
      // Crear un nuevo objeto Date
      var diaDeLaSemana = (new Date()).getDay();
      var dataLineGrafic = new Array(7);
      var dataBarGrafic = new Array(7);
      let informationPots = await this.serviceData.showPots(element);
      principalCard.innerHTML +=`
      <div class="card">
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
            Smart Pot ${i}
            <small>Menta</small>
          </h2>
        </div>
        
      </div>
      <div class="card-flap flap1" style="text-align: center;">
        <div class="card-description">
          <div class="swiper" style="height: 100%; width: 100%;">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
              <!-- Slides -->
              <div class="swiper-slide">
                <canvas id="line${informationPots._id}" class="chart" ></canvas>
                
               
               
              
              </div>
              <div class="swiper-slide">
                <canvas id="bar${informationPots._id}" class="chart" ></canvas>
      
              </div>
              
            
            </div>
      
            <!-- If we need pagination -->
            <div class="swiper-pagination" style="position: fixed;">
              
            </div>
            
            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev" style="position: fixed;"></div>
            <div class="swiper-button-next" style="position: fixed;"></div>
          
            <!-- If we need scrollbar -->
            <div class="swiper-scrollbar" style="position: fixed;"></div>
          </div>
             
          
        </div>
      </div>
    </div>
      `;
      dataLineGrafic[diaDeLaSemana] = 1;
      const dataLine = {
        label: "Riego por dia",
        data: dataLineGrafic,
        borderColor: 'rgba(248, 37, 37, 0.8)',
        backgroundColor: 'rgba(248, 37, 37, 0.8)', // Agregamos el color de relleno
        fill: false,
        tension: 0.1
      };
      dataBarGrafic[diaDeLaSemana] = this.calcularPorcentajeLlenado(informationPots.waterContainer);
      const dataBar  = {
          label: "Porcentaje de Agua",
          data: dataBarGrafic,
          borderColor: 'rgba(248, 37, 37, 0.8)',
          backgroundColor: 'rgba(248, 37, 37, 0.8)', // Agregamos el color de relleno
          fill: false,
          tension: 0.1
      };

      const firstGrafic = {
        labels: nombresDias,
        datasets: [dataLine]
      };
      const secondGrafic = {
        labels: nombresDias,
        datasets: [dataBar]
      };

      setTimeout(() => {
        this.createinformationGrafic.line(firstGrafic, document.getElementById(`line${informationPots._id}`));
        this.createinformationGrafic.bar(secondGrafic, document.getElementById(`bar${informationPots._id}`));
      }, 1000); // Espera 1 segundo después de crear las tarjetas para asegurar que estén completamente cargadas

      i++;
      
    }
    
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
    

  }
  async updateGraficData(){
    let data = await this.serviceData.showDataService();
    let showSataSmart = data[0];
    let _pots = showSataSmart.pots;
    


    
    var nombresDias = ['Dom', 'Lun', 'Mar', 'Mierc', 'Juev', 'Vier', 'Sab'];
    

    var dataLineGrafic = new Array(7);
    var dataBarGrafic = new Array(7);

  
    for (let element of _pots) {
      // Crear un nuevo objeto Date
      var diaDeLaSemana = (new Date()).getDay();
      var dataLineGrafic = new Array(7);
      var dataBarGrafic = new Array(7);
      let informationPots = await this.serviceData.showPots(element);
     
      dataLineGrafic[diaDeLaSemana] = 1;
      const dataLine = {
        label: "Riego por dia",
        data: dataLineGrafic,
        borderColor: 'rgba(248, 37, 37, 0.8)',
        backgroundColor: 'rgba(248, 37, 37, 0.8)', // Agregamos el color de relleno
        fill: false,
        tension: 0.1
      };
      dataBarGrafic[diaDeLaSemana] = this.calcularPorcentajeLlenado(informationPots.waterContainer);
      const dataBar  = {
          label: "Porcentaje de Agua",
          data: dataBarGrafic,
          borderColor: 'rgba(248, 37, 37, 0.8)',
          backgroundColor: 'rgba(248, 37, 37, 0.8)', // Agregamos el color de relleno
          fill: false,
          tension: 0.1
      };

      const firstGrafic = {
        labels: nombresDias,
        datasets: [dataLine]
      };
      const secondGrafic = {
        labels: nombresDias,
        datasets: [dataBar]
      };

      setTimeout(() => {
        this.createinformationGrafic.line(firstGrafic, document.getElementById(`line${informationPots._id}`));
        this.createinformationGrafic.bar(secondGrafic, document.getElementById(`bar${informationPots._id}`));
      }, 1000); // Espera 1 segundo después de crear las tarjetas para asegurar que estén completamente cargadas

      
      
    }
    
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
  }
  async autoUpdateGrafic() {
    await this.updateCardData(); // Actualiza los datos de las tarjetas
    setTimeout(this.updateGraficData.bind(this), 30000); // Ejecuta la función cada 30 segundos (30000 milisegundos)
  }
  calcularPorcentajeLlenado(alturaActual) {
    // Calcular el porcentaje de llenado
    var porcentaje = (alturaActual / 11) * 100;
    return porcentaje;
  }
 
}





const serviceData = new Service()
const showApp = new DataApp();
//Objetos
var sectionnav = new SectionNav();
var conection = new ConectionSmart();




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


  

