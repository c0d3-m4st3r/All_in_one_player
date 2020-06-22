$(document).ready(function(){
    getCanciones();
});

var audio;
var musica;

function getCanciones(){
    $.getJSON("js/app.json", function(mjson){
        musica = mjson;
        console.log(musica);
    });
}