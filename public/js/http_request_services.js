function HttpRequest() {
    var httpRequest = null,
        response = null,
        self = this;

    this.method = null;
    this.url = null;
    this.async = true;
    this.data = null;

    this.send = function() {
        httpRequest.open(this.method, this.url, this.asnyc);
        // httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.send(this.data);
    };

    if(window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    }
    else if(window.ActiveXObject) {
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP.6.0");
        }
        catch(e) {
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }
            catch(error) {
                self.fail("not supported");
            }
        }
    }

    if(httpRequest == null) return false;

    httpRequest.onreadystatechange = function() {
        if(this.readyState == 4) {
            if(this.status == 200) self.success(this.responseText);
            else self.fail(this.responseText);
        }
    };
}