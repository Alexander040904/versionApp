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


    document.getElementById("insertUser").addEventListener("submit", function(event) {
      event.preventDefault(); // Previene el comportamiento predeterminado de redireccionamiento
      
      // Obtener los datos del formulario
      var formData = new FormData(event.target);
      const dataForm = Object.fromEntries(formData.entries());
      const camposExtras = { "type": "user", "img": "" };
    
      var jsonCombinado = Object.assign({}, dataForm, camposExtras);
      console.log(jsonCombinado);
        
      insertUserfortwo(jsonCombinado);
      
      // Realizar una solicitud POST utilizando Fetch API
      //https://smartpot-api.vercel.app/insertUser
    
    });

    var boton = document.getElementById("loginWithGoogle");

    // Agregar un controlador de eventos para el evento 'click'
    boton.addEventListener("click", function() {
        trySampleRequest();
        
    });

    var YOUR_CLIENT_ID = '1079496864365-o7jcnrhfcstmr1hi58lbhonarc0dulhu.apps.googleusercontent.com';
    var YOUR_REDIRECT_URI = 'http://127.0.0.1:5500/www/index.html';
     var fragmentString = location.hash.substring(1);

  // Parse query string to see if page request is coming from OAuth 2.0 server.
  var params = {};
  var regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(fragmentString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
    if (params['state'] && params['state'] == 'try_sample_request') {
      trySampleRequest();
    }
  }

  // If there's an access token, try an API request.
  // Otherwise, start OAuth 2.0 flow.
  function trySampleRequest() {
  var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
  if (params && params['access_token']) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
        'https://www.googleapis.com/drive/v3/about?fields=user&' +
        'access_token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var user = JSON.parse(xhr.response).user; // Parse the response and access the 'user' property
        console.log(user);
        console.log(user.emailAddress); // Print the emailAddress property
        isertgoogle(user);
        console.log(user.displayName);
        
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        // Token invalid, so prompt for user permission.
        oauth2SignIn();
      }
    };
    xhr.send(null);
  } else {
    oauth2SignIn();
  }
}
  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */
  function oauth2SignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': YOUR_CLIENT_ID,
                  'redirect_uri': YOUR_REDIRECT_URI,
                  'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                  'state': 'try_sample_request',
                  'include_granted_scopes': 'true',
                  'response_type': 'token'};

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
  function revokeToken() {
  var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
  if (params && params['access_token']) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4) {
        // Clear stored parameters and reload the page or perform any other logout logic
        localStorage.removeItem('oauth2-test-params');
        location.reload(); // You might want to customize this behavior
      }
    };
    xhr.send(null);
  }
}

// Agrega un botón para cerrar sesión
 var logoutButton = document.createElement('button');
  logoutButton.textContent = 'Cerrar Sesión';
  logoutButton.onclick = revokeToken;

  // Selecciona el div existente donde deseas agregar el botón
  var divExistente = document.getElementById("puto");
  divExistente.appendChild(logoutButton);

/*innseeertt */

  function insertUserfortwo (jsonCombinado) {

    fetch('https://smartpot-api.vercel.app/insertUser', {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(jsonCombinado)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al enviar el formulario.');
      }
      return response.text();
    })
    .then(data => {
      // Manejar la respuesta del servidor si es necesario
      console.log(data);
      alert(data);
      // Puedes redirigir al usuario a otra página si lo deseas
      // window.location.href = 'pagina-de-exito.html';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al enviar el formulario.');
    });
  }



  function isertgoogle(jsonCombinado){
    console.log("as");
    console.log( jsonCombinado)
    const camposExtras = { "gmail" : jsonCombinado.emailAddress, "type": "google", "img": jsonCombinado.photoLink };
    insertUserfortwo(camposExtras);
  }