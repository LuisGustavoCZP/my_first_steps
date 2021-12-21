document.getElementById("input-text").onchange = Callback;
function Callback (evt) {
    console.log(evt.target.value);
}