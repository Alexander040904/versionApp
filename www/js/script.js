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
    // Filtrar solo las redes que comienzan con "SmartPot"
    const filteredResults = results.filter(function(result) {
      return result.SSID.startsWith("SmartPot");
    });

    // Extraer solo los SSID de los resultados filtrados del escaneo
    const ssids = filteredResults.map(function(result) {
      return result.SSID;
    });

    // Limpiar opciones existentes
    select.innerHTML = '';

    // Agregar opción vacía al principio
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = 'Seleccione una maceta'; // Texto que desees mostrar
    select.appendChild(emptyOption);

    // Agregar opciones filtradas al select
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
      
      const formpot = document.getElementById('form-pot');
      const _idmaceta = document.getElementById('_id-maceta');


      
      // Captura el select y la tarjeta
      const select = document.getElementById('miSelect');
      
    
      // Agrega un event listener al select
      select.addEventListener('change', function(event) {
          // Muestra la tarjeta
          formpot.style.display = 'block';
          // Muestra el fondo negro
          
          // Actualiza el contenido de la tarjeta con el valor seleccionado
          _idmaceta.textContent = select.value;
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
        alert('Conexion correcta');
        const firtpaso = document.getElementById('firtpaso');
        const formpot = document.getElementById('form-pot');
        const _idmaceta = document.getElementById('_id-maceta');


        firtpaso.style.display = 'none';
        formpot.style.display = 'block';
        _idmaceta.textContent = ssid;
       
    
        window.location.href = 'http://192.168.4.1/';
      },
      (result) => {
        alert('Conexion fallida');
        alert(`code: ${result.code}, message: ${result.message}`);
        return false;
      }
    );
        
  }
  
  conectar(){
    let contenidoTarjeta = document.getElementById('contenido').textContent;
    let  wifi = document.getElementById('wifi').value;
    alert(`ssid es ${contenidoTarjeta} y password es ${wifi}`)
    let conec = this.connectToWifi(contenidoTarjeta, wifi);
    
  
  }

}
class Service{
  constructor(){
  }
  showDataService() {
    let data = {gmail: localStorage.getItem("login") }

  //https://smartpot-api.vercel.app/insertUser
    return fetch("https://smartpot-api.vercel.app/showUser", {
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
  return fetch("https://smartpot-api.vercel.app/showPots", {
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
  insertPots(data){
    

  //https://smartpot-api.vercel.app/insertUser
  return fetch("https://smartpot-api.vercel.app/insertSmartPot", {
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
      
  
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al enviar el formulario.');
    });
  }
  showPlantas(pots){
    let data = {_id: pots }

  //https://smartpot-api.vercel.app/insertUser
  return fetch("https://smartpot-api.vercel.app/showPlantas", {
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
      
      let a = JSON.parse(data);
      return a;
  
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al enviar el formulario.');
    });
  }
  addPots(pots){
    let data = {"originGmail": localStorage.getItem("login"), "pots":pots}

  //https://smartpot-api.vercel.app/insertUser
  return fetch("https://smartpot-api.vercel.app/addPots", {
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

  line(data, canvas, minimo, maximo) {
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
            min: minimo,
            max: maximo
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
  constructor() {
    try {
      this.serviceData = new Service();
      this.createinformationGrafic = new Grafic();
      this.showUser();
      this.createCards().then(() => {
        this.autoUpdateCards(); // Llamar a autoUpdateCards() después de que se completen las tarjetas
      });
      this.createGrafic().then(() => {
        this.autoUpdateGrafic();
      });
      this.createAllCharts().then(() => {
        this.autoUpdateAllCharts();
      });
    } catch (error) {
      console.error("Se ha producido un error:", error);
    }
  
    // Repetir el código cada 30 segundos
    setInterval(() => {
      try {
        this.serviceData = new Service();
        this.createinformationGrafic = new Grafic();
        this.showUser();
        this.createCards().then(() => {
          this.autoUpdateCards(); // Llamar a autoUpdateCards() después de que se completen las tarjetas
        });
        this.createGrafic().then(() => {
          this.autoUpdateGrafic();
        });
        this.createAllCharts().then(() => {
          this.autoUpdateAllCharts();
        });
      } catch (error) {
        console.error("Se ha producido un error en la repetición:", error);
      }
    }, 10000); // 30 segundos en milisegundos
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
    
    if(_pots.length > 0){
    for (let element of _pots) {
      var diaDeLaSemana = (new Date()).getDay();
      let informationPots = await this.serviceData.showPots(element);
      let dataPlantas = await this.serviceData.showPlantas(informationPots._idPlanta);
      console.log("2");
      contenido += `<div class="card">
      <div class="card__image-holder">
        <img class="card__image" src="${dataPlantas.imagen}" alt="wave" />
      </div>
      <div class="card-title">
        <a href="#" class="toggle-info btn">
          <span class="left"></span>
          <span class="right"></span>
        </a>
        <div style="text-align: center;">
          <h2>
            Smart Pot ${i}
            <small>${dataPlantas.nombre}</small>
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
                  <span id="${informationPots._id}temperatureCard"> ${informationPots.climateTemperature[diaDeLaSemana]}</span>
                </div>
              </div> 
            </li>
            <li>
              <div class="col-12">
                <div class="col-6" style="display: flex; justify-content: flex-start;">
                  <img src="img/humidity.svg" alt=""> Humedad
                </div>
                <div class="col-6">
                  <span id="${informationPots._id}humidity"> ${informationPots.soilMoisture[diaDeLaSemana]}</span>
                </div>
              </div>
            </li>
            <li>
              <div class="col-12">
                <div class="col-6" style="display: flex; justify-content: flex-start;">
                  <img src="img/brightness.svg" alt=""> Luminosidad
                </div>
                <div class="col-6">
                  <span id="${informationPots._id}brightnessCard"> ${informationPots.brightness[diaDeLaSemana]}</span>
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
      if(_pots.length > 0){
      for (let i = 0; i < _pots.length; i++) {
        let card = principalCard.children[i]; // Obtenemos la tarjeta en la posición i
        let informationPots = await this.serviceData.showPots(_pots[i]);
        var diaDeLaSemana = (new Date()).getDay();
        

        // Actualizamos los datos en la tarjeta
        card.querySelector(`#${informationPots._id}temperatureCard`).innerText = informationPots.climateTemperature[diaDeLaSemana];
        card.querySelector(`#${informationPots._id}humidity`).innerText = informationPots.soilMoisture[diaDeLaSemana];
        card.querySelector(`#${informationPots._id}brightnessCard`).innerText = informationPots.brightness[diaDeLaSemana];
    }}
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

    if(_pots.length > 0){
      for (let element of _pots) {
        // Crear un nuevo objeto Date
        var diaDeLaSemana = (new Date()).getDay();
        var dataLineGrafic = new Array(7);
        var dataBarGrafic = new Array(7);
        let informationPots = await this.serviceData.showPots(element);
        let dataPlantas = await this.serviceData.showPlantas(informationPots._idPlanta);
        principalCard.innerHTML +=`
        <div class="card">
        <div class="card__image-holder">
          <img class="card__image" src="${dataPlantas.imagen}" alt="wave" />
        </div>
        <div class="card-title">
          <a href="#" class="toggle-info btn">
            <span class="left"></span>
            <span class="right"></span>
          </a>
          <div style="text-align: center;">
            <h2>
              Smart Pot ${i}
              <small>${dataPlantas.nombre}</small>
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
          data: informationPots.contador[diaDeLaSemana],
          borderColor: 'rgba(248, 37, 37, 0.8)',
          backgroundColor: 'rgba(248, 37, 37, 0.8)', // Agregamos el color de relleno
          fill: false,
          tension: 0.1
        };
        dataBarGrafic[diaDeLaSemana] = this.calcularPorcentajeLlenado(informationPots.waterContainer[diaDeLaSemana]);
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
          this.createinformationGrafic.line(firstGrafic, document.getElementById(`line${informationPots._id}`),0,5);
          this.createinformationGrafic.bar(secondGrafic, document.getElementById(`bar${informationPots._id}`));
        }, 1000); // Espera 1 segundo después de crear las tarjetas para asegurar que estén completamente cargadas

        i++;
        
      }

      
      this.swiper();
    }
    

  }
  async updateGraficData(){
    let data = await this.serviceData.showDataService();
    let showSataSmart = data[0];
    let _pots = showSataSmart.pots;
    


    
    var nombresDias = ['Dom', 'Lun', 'Mar', 'Mierc', 'Juev', 'Vier', 'Sab'];
    

    var dataLineGrafic = new Array(7);
    var dataBarGrafic = new Array(7);

    if(_pots.length > 0){
      for (let element of _pots) {
        // Crear un nuevo objeto Date
        var diaDeLaSemana = (new Date()).getDay();
        var dataLineGrafic = new Array(7);
        var dataBarGrafic = new Array(7);
        let informationPots = await this.serviceData.showPots(element);
      
        dataLineGrafic[diaDeLaSemana] = 1;
        const dataLine = {
          label: "Riego por dia",
          data: informationPots.contador[diaDeLaSemana],
          borderColor: 'rgba(248, 37, 37, 0.8)',
          backgroundColor: 'rgba(248, 37, 37, 0.8)', // Agregamos el color de relleno
          fill: false,
          tension: 0.1
        };
        dataBarGrafic[diaDeLaSemana] = this.calcularPorcentajeLlenado(informationPots.waterContainer[diaDeLaSemana]);
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
          this.createinformationGrafic.line(firstGrafic, document.getElementById(`line${informationPots._id}`),0,5);
          this.createinformationGrafic.bar(secondGrafic, document.getElementById(`bar${informationPots._id}`));
        }, 1000); // Espera 1 segundo después de crear las tarjetas para asegurar que estén completamente cargadas

        
        
      }
      
      this.swiper();
    }
  }
  async autoUpdateGrafic() {
    setTimeout(this.updateGraficData.bind(this), 30000); // Ejecuta la función cada 30 segundos (30000 milisegundos)
  }
  async createAllCharts(){
    let principalCard = document.getElementById("AllCards");
    principalCard.innerHTML = "";
   
    let data = await this.serviceData.showDataService();
    let showSataSmart = data[0];
    let _pots = showSataSmart.pots;
    let i = 1;


    
    var nombresDias = ['Dom', 'Lun', 'Mar', 'Mierc', 'Juev', 'Vier', 'Sab'];
    

    var lineLuminosidad = new Array(7);
    var lineHumedadTierra = new Array(7);
    var lineClimaTemperatura = new Array(7);
    var lineHumedadClima = new Array(7);
  

    if(_pots.length > 0){
      for (let element of _pots) {
        // Crear un nuevo objeto Date
        var diaDeLaSemana = (new Date()).getDay();
        var lineLuminosidad = new Array(7);
        var lineHumedadTierra = new Array(7);
        var lineClimaTemperatura = new Array(7);
        var lineHumedadClima = new Array(7);
        let informationPots = await this.serviceData.showPots(element);
        let dataPlantas = await this.serviceData.showPlantas(informationPots._idPlanta);
        principalCard.innerHTML += ` <div class="card">
        <div class="card__image-holder">
          <img class="card__image" src="${dataPlantas.imagen}" alt="wave" />
        </div>
        <div class="card-title">
          <a href="#" class="toggle-info btn">
            <span class="left"></span>
            <span class="right"></span>
          </a>
          <div style="text-align: center;">
            <h2>
              Smart Pot ${i}
              <small>${dataPlantas.nombre}</small>
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
                  <canvas id="AllLine${informationPots._id}" class="chart" ></canvas>
                  
                
                
                
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
      </div>`;
        lineClimaTemperatura[diaDeLaSemana] = informationPots.climateTemperature;
        lineHumedadClima[diaDeLaSemana] = informationPots.climateHumidity;
        lineLuminosidad[diaDeLaSemana] = informationPots.brightness;
        lineHumedadTierra[diaDeLaSemana] = informationPots.soilMoisture;
  
        const dataset1 = {
          label: "Luminosidad",
          data: informationPots.brightness,
          borderColor: 'rgba(248, 37, 37, 0.8)',
          backgroundColor: 'rgba(248, 37, 37, 0.8)',   
          fill: false,
          tension: 0.1
      };
      
      const dataset2 = {
          label: "Humedad",
          data: informationPots.soilMoisture,
          borderColor: 'rgba(69, 248, 84, 0.8)',
          backgroundColor: 'rgba(69, 248, 84, 0.8)',
          fill: false,
          tension: 0.1
      };
      
      const dataset3 = {
          label: "Sereno",
          data: informationPots.climateHumidity,
          borderColor: 'rgba(69, 140, 248, 0.8)',
          backgroundColor: 'rgba(69, 140, 248, 0.8)',
          fill: false,
          tension: 0.1
      };
      
      const dataset4 = {
          label: "Temperatura",
          data: informationPots.climateTemperature,
          borderColor: 'rgba(245, 40, 145, 0.8)',
          backgroundColor: 'rgba(245, 40, 145, 0.8)',
          fill: false,
          tension: 0.1
      };

        const firstGrafic = {
          labels: nombresDias,
          datasets: [dataset1, dataset2, dataset3, dataset4]
        };
        

        setTimeout(() => {
          this.createinformationGrafic.line(firstGrafic, document.getElementById(`AllLine${informationPots._id}`),0,100);
          
        }, 1000); // Espera 1 segundo después de crear las tarjetas para asegurar que estén completamente cargadas

        i++;
        
      }
      
      this.swiper();
   }

  }
  async updateAllChartsData(){
    let data = await this.serviceData.showDataService();
    let showSataSmart = data[0];
    let _pots = showSataSmart.pots;
    var lineLuminosidad = new Array(7);
    var lineHumedadTierra = new Array(7);
    var lineClimaTemperatura = new Array(7);
    var lineHumedadClima = new Array(7);


    
    var nombresDias = ['Dom', 'Lun', 'Mar', 'Mierc', 'Juev', 'Vier', 'Sab'];
    

 

  
    for (let element of _pots) {
      // Crear un nuevo objeto Date
      var diaDeLaSemana = (new Date()).getDay();
      var lineLuminosidad = new Array(7);
      var lineHumedadTierra = new Array(7);
      var lineClimaTemperatura = new Array(7);
      var lineHumedadClima = new Array(7);
      
      let informationPots = await this.serviceData.showPots(element);
     
      lineClimaTemperatura[diaDeLaSemana] = informationPots.climateTemperature;
      lineHumedadClima[diaDeLaSemana] = informationPots.climateHumidity;
      lineLuminosidad[diaDeLaSemana] = informationPots.brightness;
      lineHumedadTierra[diaDeLaSemana] = informationPots.soilMoisture;
      const dataset1 = {
        label: "Luminosidad",
        data: informationPots.brightness,
        borderColor: 'rgba(248, 37, 37, 0.8)',
        backgroundColor: 'rgba(248, 37, 37, 0.8)',   
        fill: false,
        tension: 0.1
      };
      
      const dataset2 = {
          label: "Humedad",
          data: informationPots.soilMoisture,
          borderColor: 'rgba(69, 248, 84, 0.8)',
          backgroundColor: 'rgba(69, 248, 84, 0.8)',
          fill: false,
          tension: 0.1
      };
      
      const dataset3 = {
          label: "Sereno",
          data: informationPots.climateHumidity,
          borderColor: 'rgba(69, 140, 248, 0.8)',
          backgroundColor: 'rgba(69, 140, 248, 0.8)',
          fill: false,
          tension: 0.1
      };
      
      const dataset4 = {
          label: "Temperatura",
          data: informationPots.climateTemperature,
          borderColor: 'rgba(245, 40, 145, 0.8)',
          backgroundColor: 'rgba(245, 40, 145, 0.8)',
          fill: false,
          tension: 0.1
      };


      const firstGrafic = {
        labels: nombresDias,
        datasets: [dataset1, dataset2, dataset3, dataset4]
      };
      


      setTimeout(() => {
        this.createinformationGrafic.line(firstGrafic, document.getElementById(`AllLine${informationPots._id}`),0,100);
      }, 1000); // Espera 1 segundo después de crear las tarjetas para asegurar que estén completamente cargadas

      
      
    }
    
    this.swiper();
  }
  async autoUpdateAllCharts() {
     // Actualiza los datos de las tarjetas
    setTimeout(this.updateAllChartsData.bind(this), 30000); // Ejecuta la función cada 30 segundos (30000 milisegundos)
  }
  swiper(){
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
  calcularPorcentajeLlenado(alturaActual) {
    // Calcular el porcentaje de llenado
    var porcentaje = (alturaActual / 11) * 100;
    return porcentaje;
  }
 
}




//DOM
let updateConecctionWifi = document.getElementById("updateConecctionWifi");
let conectionWifi = document.getElementById("conectionWifi");



//Objetos
const serviceData = new Service()
const showApp = new DataApp();
var sectionnav = new SectionNav();
var conection = new ConectionSmart();


conectionWifi.addEventListener("click", function() {
  conection.conectar();
});

updateConecctionWifi.addEventListener("click", function() {
  conection.availableNetworks();
});

console.log(localStorage.getItem("login"));
var contentDiv = document.getElementById("contentDiv");
var toggleButton = document.getElementById("toggleButton");
var overlay = document.getElementById("overlay");

var agregarPotData = document.getElementById("agregarPotData");

// Evento de clic en el botón para mostrar/ocultar el contenido
agregarPotData.addEventListener("click", function(event) {
  var categoriaValue = document.getElementById("categoria").value;
    
    // Obtener el texto seleccionado del elemento <select> "categoria"
  
  // Obtener el valor seleccionado del elemento <select> "typeRiego"
  var typeRiegoValue = document.getElementById("typeRiego").value;

  // Obtener el texto de la etiqueta <label> "_id-maceta"
  var labelValue = document.getElementById("_id-maceta").textContent;

  // Crear un objeto JSON con los datos recopilados
  var jsonData = {
      "_id": labelValue,
      "_idPlanta": categoriaValue,
      "typeRiego": typeRiegoValue,
      "brightness": [null, null, null, null, null, null, null],
      "climateHumidity": [null, null, null, null, null, null, null],
      "climateTemperature": [null, null, null, null, null, null, null],
      "soilMoisture": [null, null, null, null, null, null, null],
      "waterContainer": [null, null, null, null, null, null, null],
      "contador": [null, null, null, null, null, null, null]

  };

  // Convertir el objeto JSON a cadena para visualización o envío
  var jsonString = JSON.stringify(jsonData);

  // Mostrar la cadena JSON en la consola (puedes eliminar esta línea si no la necesitas)
  console.log(jsonString);
  serviceData.insertPots(jsonData); 
  serviceData.addPots(labelValue);
  //location.reload();
});

// Evento de clic en el botón para mostrar/ocultar el contenido
toggleButton.addEventListener("click", function(event) {
  try {
    cordova.plugins.notification.local.requestPermission(function (granted) {
        if (granted) {
            // El permiso fue concedido, aquí puedes realizar las acciones que deseas
            console.log("Permiso concedido para enviar notificaciones locales");
  
            // Por ejemplo, puedes programar una notificación
            cordova.plugins.notification.local.schedule({
                title: "Mi notificación",
                text: "Hola, esta es una notificación local.",
                foreground: true
            });
        } else {
            // El permiso fue denegado, aquí puedes manejar esta situación
            alert("Permiso denegado para enviar notificaciones locales");
            // Puedes informar al usuario sobre las funcionalidades limitadas debido a la falta de permiso
        }
    });
  } catch (error) {
    // Manejo de excepciones
    alert(error);
    // Puedes tomar medidas adicionales, como notificar al usuario sobre el error
  }
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
    let direction = 'https://smartpot-api.vercel.app/updateUser';
  

    serviceData.updateUser(jsonCombinado, direction);
    
    // Realizar una solicitud POST utilizando Fetch API
    //https://smartpot-api.vercel.app/insertUser
  
  });


  

