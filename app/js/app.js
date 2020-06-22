$(document).ready(function(){
    getCanciones();
});

var audio = document.getElementById('player');
var musica;

function getCanciones(){
    $.getJSON("js/app.json", function(mjson){
        musica = mjson;
        getLista(musica);
    });
}

function playCancion(id){
    console.log(id);
    $('#img-album').attr('src', musica.canciones[id].rutaImagen);
    $('#player').attr('src', musica.canciones[id].rutaAudio);
    audio.play();
}

function getLista(musica){
    console.log(musica.canciones);
    $.each(musica.canciones, function(i, cancion){
        $('#playlist').append('<li class="list-group-item" id="' + i + '">' + cancion.nombre + '</li>');   
    });
    $('#playlist li').click(function(){
        var cancionSeleccionada = $(this).attr('id');
        playCancion(cancionSeleccionada);
    })
}
