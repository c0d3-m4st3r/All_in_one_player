$(function(){
    getInfo();
    iniciarReproductor();
    $('#newPlaylistModal').on('shown.bs.modal', guardaPlaylist());
});

var audio = document.getElementById('player');
var musica;

function iniciarReproductor(){
    $('#shuffle').click(function(){
        $('#playlist').empty();
        console.log(shuffle(musica.canciones));
        $.each(musica.canciones, function(i, cancion){
            botonFavoritos = '<div class="ml-auto"><button class="btn btn-danger favoritos" id="fav' + i + '"><i class="fa fa-star"></button></div>';
                $('#playlist').append('<li class="list-group-item" style="background-color: #696969; color: white;" id="' + i + '"><div class="text_holder d-flex ">' + cancion.nombre + botonFavoritos + '</div></li>');
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
        getListas();
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
    $.each(musica.listas, function(i,lista){
        if (musica.listas[i].id == idPlaylist){
            listaElegida = lista;
        }
    });
    if(listaElegida.id == -1){
        $("#tituloPlaylist").text(listaElegida.nombre);
        $.each(listaElegida.canciones, function(j, lista){
            $.each(musica.canciones, function(i, cancion){
                var count = 0;
                var dropDown = '<div class="dropdown"><button class="btn btn-warning dropdown-toggle add" type="button" id="add' + i + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-plus"></i></button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
            $.each(musica.listas, function(k){
                if(musica.listas[k].id != -1 && musica.listas[k].id != -2){
                    count++;
                    var id = -2-count;
                    dropDown = dropDown +  '<a class="dropdown-item listasDesplegadas" href="#" id="lista' + id + '">' + musica.listas[k].nombre +'</a>';
                }
                				
            });
            if(count == 0){
                dropDown = dropDown +  '<a class="dropdown-item" href="#" >No hay playlists</a>';
            }
            dropDown = dropDown + ' </div></div>';
                if(musica.canciones[i].id == lista){
                    botonFavoritos = '<div class="btn-group ml-auto"><button class="btn btn-danger favoritos" id="fav' + i + '"><i class="fa fa-star"></i></button>' + dropDown +'</div>';
                    $('#playlist').append('<li class="list-group-item" style="background-color: #696969; color: white;" id="' + i + '"><div class="text_holder d-flex ">' + cancion.nombre + botonFavoritos + '</div></li>');   
                } 
            });
        });
    }else{
            $("#tituloPlaylist").text(listaElegida.nombre);
            $.each(listaElegida.canciones, function(lista){
                $.each(musica.canciones, function(i, cancion){
                    if(musica.canciones[i].id == lista){
                        botonEliminar = '<div class="ml-auto"><button class="btn btn-danger eliminar" id="del' + i + '"><i class="fa fa-trash"></button></div>';
                        $('#playlist').append('<li class="list-group-item" style="background-color: #696969; color: white;" id="' + i + '"><div class="text_holder d-flex ">' + cancion.nombre + botonEliminar + '</div></li>');   
                    } 
                });
            });
    }
    

    $('#playlist li').click(function(){
        var cancionSeleccionada = $(this).attr('id');
        playCancion(cancionSeleccionada);
    });

    $('button.favoritos').click(function(){
        var cancionFavoritaS = $(this).attr('id');
        cancionFavoritaS = cancionFavoritaS.replace('fav','');
        var cancionFavorita = parseInt(cancionFavoritaS);
        console.log('id: ' + cancionFavorita);
        
        $.each(musica.canciones, function(i, cancion){
            if(musica.canciones[i].id == cancionFavorita){
               musica.listas[1].canciones.push(cancionFavorita);
            }
        });
        console.log(musica);
        console.log(JSON.stringify(musica));
        $.ajax({
            type:"POST",
            dataType:"json",
            contentType: "application/json",
            data: JSON.stringify(musica),
            url:"/guardaJSON",
            success: function(response){
                console.log("Response of update: ",response)
                $.getJSON("js/app.json", function(mjson){
                    musica = mjson;
                });
            },
            error: function(err){
                console.log("Error al guardar: ", err);
            }
        });
        console.log(musica);
    });

    $('button.eliminar').click(function(){
        var cancionEliminadaS = $(this).attr('id');
        cancionEliminadaS = cancionEliminadaS.replace('del','');
        var cancionEliminada = parseInt(cancionEliminadaS);
        console.log('id: ' + cancionEliminada);
    
        var listaEstaCancion;
        var numeroLista;
        $.each(musica.listas, function(i, lista){
            
            if(musica.listas[i].id == idPlaylist){
                console.log(lista);
                listaEstaCancion = lista;
                numeroLista = i;
            }
        });
        $.each(listaEstaCancion.canciones, function(i){
            if(listaEstaCancion.canciones[i] == cancionEliminada){
                musica.listas[numeroLista].canciones.splice(i, 1);
            }
        });
        console.log(musica);
        console.log(JSON.stringify(musica));

        var idCancion = "#" + cancionEliminada.toString();
        $.ajax({
            type:"POST",
            dataType:"json",
            contentType: "application/json",
            data: JSON.stringify(musica),
            url: "/guardaJSON",
            success: function(response){
                $(idCancion).remove();
            },
            error: function(err){
                console.log("Error al eliminar: ", err);
            }
        });
    });
    $('button.add').click(function(){
        var cancionS = $(this).attr('id');
        cancionS = cancionS.replace('add','');
        var cancion = parseInt(cancionS);
        $('a.listasDesplegadas').click(function(){
            var listaS = $(this).attr('id');
            listaS = listaS.replace('lista','');
            var lista = parseInt(listaS);
            $.each(musica.listas, function(i){
                if(musica.listas[i].id == lista){
                    musica.listas[i].canciones.push(cancion);
                }
            })
            $.ajax({
                type:"POST",
                dataType:"json",
                contentType: "application/json",
                data: JSON.stringify(musica),
                url:"/guardaJSON",
                success: function(response){
                    console.log("Response of update: ",response)
                    $.getJSON("js/app.json", function(mjson){
                        musica = mjson;
                    });
                },
                error: function(err){
                    console.log("Error al guardar: ", err);
                }
            });

        })
    });
}

function getListas(){
    var botonEliminar = "";
    $('#listasDisponibles').empty();
    count = 0;
    $.each(musica.listas, function(i,lista){
        if(musica.listas[i].id == -1 || musica.listas[i].id == -2 ){
            botonEliminar = '';
        }else{
            count++;
            var id = -2-count;
            botonEliminar = '<div class="ml-auto"><button class="btn btn-danger eliminarLista" id="eliminarLista' + id + '"><i class="fa fa-trash"></button></div>';
        }
        $('#listasDisponibles').append('<li class="list-group-item listaReproduccion" id="' + lista.id + '" style="background-color: #696969; color: white;"><div class="text_holder d-flex ">' + lista.nombre + botonEliminar + '</div></li>');					
    });

    $('#listasDisponibles li').click(function(){
        var listaSeleccionada = $(this).attr('id');
        $('#playlist').empty();
        getCanciones(listaSeleccionada);
    });

    $('button.eliminarLista').click(function(){
        var listaEliminadaS = $(this).attr('id');
        listaEliminadaS = listaEliminadaS.replace('eliminarLista','');
        var listaEliminada = parseInt(listaEliminadaS);
        
        console.log(listaEliminada);


        $.each(musica.listas, function(i){    
            if(musica.listas[i].id == listaEliminada){
                musica.listas.splice(i, 1);
            }
        });

        console.log(musica);
        console.log(JSON.stringify(musica));

        var idLista = "#" + listaEliminada.toString();
        $.ajax({
            type:"POST",
            dataType:"json",
            contentType: "application/json",
            data: JSON.stringify(musica),
            url: "/guardaJSON",
            success: function(response){
                $(idLista).remove();
            },
            error: function(err){
                console.log("Error al eliminar: ", err);
            }
        });
        
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

function guardaPlaylist(){
    $('#enviarNombrePlaylist').click(function(){
        var nombre = $("#nombrePlaylist").val();
        var cont = 1;
        $.each(musica.listas, function(){
            cont++;
        })
        var playlist = {
            "id": 0 - cont,
            "nombre":nombre,
            "canciones":[]
        }
        musica.listas.push(playlist);
        console.log(musica);
        $.ajax({
            type:"POST",
            dataType:"json",
            contentType: "application/json",
            data: JSON.stringify(musica),
            url: "/guardaJSON",
            success: function(response){
                $('#nombrePlaylist').val('');
                $('#newPlaylistModal').modal('hide');
                getListas();
                $('#playlist').empty();
                getCanciones(0-cont);
            },
            error: function(err){
                console.log("Error al guardar: ", err);
            }
        });
        

    });
}