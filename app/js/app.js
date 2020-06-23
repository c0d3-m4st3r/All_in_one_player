$(document).ready(function(){
    getInfo();
    iniciarReproductor();
    $('#listasDisponibles li').click(function(){
        var listaSeleccionada = $(this).attr('id');
        $('#playlist').empty();
        getCanciones(listaSeleccionada);
    })
});

var audio = document.getElementById('player');
var musica;

function iniciarReproductor(){
    $('#shuffle').click(function(){
        $('#playlist').empty();
        console.log(shuffle(musica.canciones));
        $.each(musica.canciones, function(i, cancion){
            $('#playlist').append('<li class="list-group-item" style="background-color: #696969; color: white;" id="' + i + '">' + cancion.nombre + '</li>');
        });
        playCancion(0);
    })
    $('#nuevaPlaylist').click(function(){
        $('#playlist').addClass();
    })
}

function getInfo(){
    $.getJSON("js/app.json", function(mjson){
        musica = mjson;
        getCanciones(-1);
    });
}

function playCancion(id){
    console.log(id);
    var long = musica.canciones;
    if(id >= long.length){
       console.log("se acabó");
       audio.pause();
    }else{
     $('#img-album').attr('src', musica.canciones[id].rutaImagen);
     $('#player').attr('src', musica.canciones[id].rutaAudio);
    audio.play();
    console.log("Hay más canciones");
    scheduleCancion(id);

    }
    
}

function getCanciones(idPlaylist){
    var listaElegida = musica.listas[0];
    $.each(musica.listas, function(lista){
        if (lista.id == idPlaylist){
            listaElegida = lista;
        }
    });
    $("#tituloPlaylist").text(listaElegida.nombre);
    $.each(listaElegida.canciones, function(lista){
        $.each(musica.canciones, function(i, cancion){
            if(musica.canciones[i].id == lista){
                $('#playlist').append('<li class="list-group-item" style="background-color: #696969; color: white;" id="' + i + '">' + cancion.nombre + '</li>');   
            } 
        });
    });

    $('#playlist li').click(function(){
        var cancionSeleccionada = $(this).attr('id');
        playCancion(cancionSeleccionada);
    })
}




function scheduleCancion(id){
    audio.onended = function(){
        console.log("termino la canción");
        playCancion(parseInt(id)+1);
    }
}

function shuffle(array){
    for(var random, temp, position = array.length; position; random = Math.floor(Math.random()*position), temp = array[--position], array[position] = array[random], array[random] = temp);
    return array;
}