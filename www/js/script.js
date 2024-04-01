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


// Crear una instancia de la clase 'SectionManager'
var sectionnav = new SectionNav();

console.log(localStorage.getItem("login"));






//REDES DISPONIBLES
function a() {
    const listado = document.getElementById('miLista');
    
    WifiWizard2.scan()
        .then(function(results) {
            // Extraer solo los SSID de los resultados del escaneo
            const ssids = results.map(function(result) {
                return result.SSID;
            });
            let lista = '';
            for (let i = 0; i < ssids.length; i++) {
                // Acceder al SSID en la posición i y mostrarlo en la consola
                lista += `<li  value="${ssids[i]}">${ssids[i]}</li>`
            }
            listado.innerHTML = lista;
            //alert("SSIDs de las redes escaneadas: " + JSON.stringify(ssids));
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

}
function connectToWifi(ssid, password) {
    WifiWizard2.connect(ssid, true, password, 'WPA') // Aquí asumo que 'WPA' es el algoritmo para WPA2
        .then(function(result) {
            // Manejar el resultado de la conexión aquí
            alert("Resultado de la conexión: " + JSON.stringify(result));
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
/*
  function insertUserfortwo () {
      let data = {gmail: localStorage.getItem("login") }

    //https://smartpot-api.vercel.app/insertUser
    fetch("http://localhost:9001/showUser", {
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
      showUser(a);

      
      
   
      // Puedes redirigir al usuario a otra página si lo deseas
      
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al enviar el formulario.');
    });
  }



   insertUserfortwo ();
  
    function showUser(data){
      let nav =document.getElementById("userNameNav");
       let nameUser = document.getElementById("name");
       let gmail = document.getElementById("gmail");
       let password = document.getElementById("password");


       for (const doc of data) {
        nav.innerHTML =  doc.name;
        nameUser.innerHTML = doc.name;
        gmail.innerHTML = doc.gmail;
        password.innerHTML = doc.password;
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
    

      updateUser(jsonCombinado, direction);
      
      // Realizar una solicitud POST utilizando Fetch API
      //https://smartpot-api.vercel.app/insertUser
    
    });


    function updateUser (json, direction) {
      

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


*/