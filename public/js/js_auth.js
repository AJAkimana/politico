function login(){
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    const params = {
        email: email,
        password: password
    }
    window.location='../UI/parties.html';
    // let request = new HttpRequest();
    // request.method = "POST";
    // request.data = JSON.stringify(params);
    // request.url = "http://localhost:5600/user.signin";

    // //create callback for success containing the response
    // request.success = function(response) {
    //     console.log('response: '+response);
    // };

    // //and a fail callback containing the error
    // request.fail = function(error) {
    //     console.log('Error:'+error);
    //     Notifier('',error);
    // };
    // // console.log('params:'+JSON.stringify(params))
    // //and finally send it away
    // request.send();
}