let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function () {
    mainNav.classList.toggle('active');
});
let theDate = new Date();
document.getElementById('year').textContent = theDate.getFullYear() + '. All right reserved';

function openModal(modalToOpen,action){
    var modal = document.getElementById(modalToOpen);
    modal.style.display = "block";
    if(action=='addParty'){
        let modalTitle = document.getElementById('modalTitle');
        modalTitle.textContent="Add new party"
    }
}
// When the user clicks on <span> (x), close the modal
function closeModal(modalToClose) {
    var modal = document.getElementById(modalToClose);
    modal.style.display = "none";
}
/*
    App functions and methods
*/
function getAuth(){
    window.location='../UI/parties.html';
    // let email = document.querySelector('#email').value;
    // let password = document.querySelector('#password').value;
    // const params = {
    //     email: email,
    //     password: password
    // }
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