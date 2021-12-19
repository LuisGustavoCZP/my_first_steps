function LoadJSON(path, callback) {
    var xObj = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.JSON");
    xObj.overrideMimeType("application/json");
    xObj.open('GET', path, true);
    // 1. replace './data.json' with the local path of your file
    xObj.onreadystatechange = function() {
        if (xObj.readyState === 4 && xObj.status === 200) {
            // 2. call your callback function
            callback(xObj.responseText);
        }
    };
    xObj.send(null);
}
