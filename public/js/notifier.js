function Notifier(type,msg) {
    var body = document.getElementById('main-body');
    var div = document.createElement('div');
    div.setAttribute('id', 'toast')
    body.appendChild(div)

    var divToast = document.getElementById('toast');
    divToast.className = "show";
    divToast.textContent = msg;

    setTimeout(function(){
        divToast.className = divToast.className.replace("show", ""); 
    }, 3000);
}