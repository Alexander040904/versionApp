/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}


if(localStorage.getItem("login")){
  window.location.href ="interface.html"
}
class SendData{ 
  constructor(){

  }

  send(jsonCombinado, direction){
      //https://smartpot-api.vercel.app/insertUser
      fetch(direction, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
         body: JSON.stringify(jsonCombinado)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al enviar el formulario.' + response);
        }
        return response.text();
      })
      .then(data => {
        // Manejar la respuesta del servidor si es necesario
        
        
        if(direction == "https://smartpot-api.vercel.app/login" || direction == "https://smartpot-api.vercel.app/insertUser"){
          if(data == "true"){
            localStorage.setItem("login", jsonCombinado.gmail)
            window.location.href = 'interface.html';
          }
          else{
            alert(data)
          }
         

        }
        
        
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al enviar el formulario.');
      });

  }

  validationCode(jsonCombinado, direction) {
    //https://smartpot-api.vercel.app/insertUser
    return fetch(direction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonCombinado)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al enviar el formulario.' + response);
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            return data; // Devolver el dato sin alerta
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al enviar el formulario.');
        });
  }



}
class TypeUser{ 
  
  constructor(){
    this.sendata = new SendData()
  
  }

  async ValidateUser(formData) {
    let direction = "https://smartpot-api.vercel.app/insertUser";
    const dataForm = Object.fromEntries(formData.entries());
    const camposExtras = { "type": "user", "img": "" };
    var jsonCombinado = Object.assign({}, dataForm, camposExtras);
    console.log(jsonCombinado);
    let data = await this.sendata.validationCode(jsonCombinado, direction); // Esperar a que la Promesa se resuelva
    console.log("desde ty "+data);
    return data;
  }
  
  insertUser(data){
    let direction = "https://smartpot-api.vercel.app/insertUser";

    this.sendata.send(data, direction);
  }

  isertgoogle(data){
    console.log("as");
    console.log(data)
    const camposExtras = { "gmail" : data.emailAddress, "type": "google", "img": data.photoLink };
    let direction = "https://smartpot-api.vercel.app/insertUser";

    this.sendata.send(camposExtras, direction);
  }

  loginUser(formData){
    const dataForm = Object.fromEntries(formData.entries());
    let direction = "https://smartpot-api.vercel.app/login";
    console.log(dataForm);  
    this.sendata.send(dataForm,direction);
    
    // Realizar una solicitud POST utilizando Fetch API
    //https://smartpot-api.vercel.app/insertUser
  }

 

}

class OAuthManager {
  constructor(clientId, redirectUri) {
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.typeuser = new TypeUser()
  }

  handleOAuthResponse() {
    let fragmentString = location.hash.substring(1);
    let params = {};
    let regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(fragmentString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    if (Object.keys(params).length > 0) {
        localStorage.setItem('oauth2-test-params', JSON.stringify(params));
        if (params['state'] && params['state'] == 'try_sample_request') {
            this.trySampleRequest();
        }
    } else {
        this.oauth2SignIn(); // Llama a oauth2SignIn() si no se encuentran parámetros en la respuesta OAuth
    }
}


  trySampleRequest() {
    let params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET',
          'https://www.googleapis.com/drive/v3/about?fields=user&' +
          'access_token=' + params['access_token']);
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let user = JSON.parse(xhr.response).user;
            console.log(user);
            console.log(user.emailAddress);
    
            this.typeuser.isertgoogle(user);
            
            console.log(user.displayName);
        } else if (xhr.readyState === 4 && xhr.status === 401) {
            this.oauth2SignIn();
        }
      };
      xhr.send(null);
    } else {
      this.oauth2SignIn();
    }
  }

  oauth2SignIn() {
    let oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    let form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);
    let params = {
      'client_id': this.clientId,
      'redirect_uri': this.redirectUri,
      'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'state': 'try_sample_request',
      'include_granted_scopes': 'true',
      'response_type': 'token'
    };

    for (let p in params) {
      let input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }

  revokeToken() {
    console.log("remover");
    let params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + params['access_token']);
      xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
          localStorage.removeItem('oauth2-test-params');
          location.reload();
        }
      };
      xhr.send(null);
    }
  }
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

//Informacion de Outh
var CLIENT_ID = '1079496864365-o7jcnrhfcstmr1hi58lbhonarc0dulhu.apps.googleusercontent.com';
var REDIRECT_URI = 'http://127.0.0.1:5501/www/index.html';
var fragmentString = location.hash.substring(1);

//DOM
let boton = document.getElementById("loginWithGoogle");
let envia = document.getElementById("enviar");
let inputValidationCode = document.getElementById("validationCode");

//Data
var jsonCombinado;
var validationCode;
/**
 * @param {string} CLIENT_ID - se envia el cliente id para poder hacer la verificacion de outh
 * @param {string} REDIRECT_URI - se envia la redireccion a la que se le enviara al cliente.
 */

let prncipal = new TypeUser()
var sectionnav = new SectionNav();
let oauthManager = new OAuthManager(CLIENT_ID, REDIRECT_URI);

/**@param {object} formData -Se envia el contenido del formulario */

document.getElementById("insertUser").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  var formData = new FormData(event.target);
  const dataForm = Object.fromEntries(formData.entries());
  const camposExtras = { "type": "user", "img": "", "pots":[]};
  jsonCombinado = Object.assign({}, dataForm, camposExtras);
  
  try {
    validationCode = await prncipal.ValidateUser(formData); // Esperar a que se resuelva la Promesa
    if(validationCode == "false"){
      alert("el gmail ya existe");
    } 
    else{
    let createAccount = document.getElementById("createAccount");
    let SecvalidarToken = document.getElementById("SecvalidarToken");
    createAccount.style.display = "none";
    SecvalidarToken.style.display = "block";
    }
    
  
    // Ahora puedes utilizar validationCode sin que sea undefined
    console.log(validationCode);
  } catch (error) {
    console.error("Error:", error);
    // Manejar el error si ocurre
  }
});



// Iniciar sesion por google mediante el boton 
boton.addEventListener("click", function() {
    oauthManager.handleOAuthResponse();
});

envia.addEventListener("click", function() {
  let inputValidationCode = document.getElementById("validationCode").value; // Obtener el valor del input al hacer clic en el botón
  console.log("as" + validationCode);
  event.preventDefault(); 
  if (inputValidationCode == validationCode) {
    prncipal.insertUser(jsonCombinado);
  } else {
    console.log("input " + inputValidationCode);
    alert("código incorrecto");
  }
});


document.getElementById("loginWithUser").addEventListener("submit", function(event) {
  event.preventDefault(); // Previene el comportamiento predeterminado de redireccionamiento
  
  // Obtener los datos del formulario
  var formData = new FormData(event.target);
  prncipal.loginUser(formData);

});



var logoutButton = document.createElement('button');
  logoutButton.textContent = 'Cerrar Sesión';
  logoutButton.onclick = oauthManager.revokeToken();

  // Selecciona el div existente donde deseas agregar el botón
  var divExistente = document.getElementById("puto");
  divExistente.appendChild(logoutButton);