$(document).ready(function(){
    getCanciones();
});

var audio;
var musica;

function getCanciones(){
    $.getJSON("js/app.json", function(mjson){
        musica = mjson;
        console.log(musica);
        getLista(musica);
    });
}

function getLista(musica){
 console.log(musica.canciones);

 $.each(musica.canciones,function(i,canciones){

        $('#playlist').append('<li class="list-group-item" id="' +i+'">'+canciones.nombre+'</li>');

});

$('#playlist li').click(function(){

var seleccionarCancion = $(this).attr('id');
console.log(seleccionarCancion);

});

}
