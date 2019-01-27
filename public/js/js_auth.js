function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};
function login(){
  const params = {
        // email: document.querySelector('#email').value,
        // password: document.querySelector('#password').value
        email: 'Akimana',
        password: 'Umuhuza'
    }
    var request = new HttpRequest();
    request.method = "POST";
    request.data = JSON.stringify(params);
    request.url = "http://localhost:5600/user.signin";

    //create callback for success containing the response
    request.success = function(response) {
        console.log('response: '+response);
    };

    //and a fail callback containing the error
    request.fail = function(error) {
        console.log('Error:'+error);
    };
    // console.log('params:'+JSON.stringify(params))
    //and finally send it away
    request.send();
}