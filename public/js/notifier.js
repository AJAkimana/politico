function Notifier(type,msg) {
    var x = document.getElementById("toast");
    x.className = "show";
    x.textContent = msg;
    setTimeout(function(){
        x.className = x.className.replace("show", ""); 
    }, 3000);
}