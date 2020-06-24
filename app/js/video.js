$(document).ready(function(){
    

    getVideos();
    iniciarReproductor();
    $('#newVideoModal').on('shown.bs.modal', guardaVideo());
});
    
    
    
    var video = document.getElementById('video');
    var archivos;
    
    
    
    
    function iniciarReproductor(){
        $('#shuf').click(function(){
            $('#playVideos').empty();
            console.log(shuffle(archivos.videos));
            getLista(archivos);
            playVideo(0);
        })
    }
    
    function getVideos(){
        $.getJSON("js/video.json", function(mjson){
            archivos = mjson;
            console.log(mjson);
            getLista(archivos);
        });
    }
    
    function playVideo(id){
        console.log(id);
        var long = archivos.videos;
        if(id >= long.length){
           console.log("se acabó");
           video.pause();
        }else{
        $('#video').attr('src', archivos.videos[id].rutaVideo);
        video.play();
        console.log("Hay más videos");
        scheduleVideo(id);
    }
    
    }
    
    function getLista(videos){
        var botonEliminar;
        console.log(videos.videos);
        $.each(videos.videos, function(i, video){
            botonEliminar = '<div class="ml-auto"><button class="btn btn-danger eliminar" id="del' + i + '"><i class="fa fa-trash"></button></div>';
            $('#playVideos').append('<li class="list-group-item" style="background-color: #696969; color: white;" id="' + i + '"><div class="text_holder d-flex ">' + video.nombre + botonEliminar + '</div></li>');
            
                  
        });
        $('#playVideos li').click(function(){
            var videoSeleccionado = $(this).attr('id');
            playVideo(videoSeleccionado);
       
        });

        $('button.eliminar').click(function(){
            var videoEliminadoS = $(this).attr('id');
            videoEliminadoS = videoEliminadoS.replace('del', '');
            var videoEliminado = parseInt(videoEliminadoS);
            
            archivos.videos.forEach(function(video, i){
                if(video.id == videoEliminado){
                    archivos.videos.splice(i, 1);
                }
            });

            $.ajax({
                type:"POST",
                dataType:"json",
                contentType: "application/json",
                data: JSON.stringify(archivos),
                url: "/guardaJSONVideos",
                success: function(response){
                    $('#playVideos').empty();                    
                    getLista(archivos);
                },
                error: function(err){
                    console.log("Error al guardar: ", err);
                }
            });

            
        })
    }
    
    
    function scheduleVideo(id){
        video.onended = function(){
            console.log("termino el video");
            playVideo(parseInt(id)+1);
        }
    }
    
    function shuffle(array){
        for(var random, temp, position = array.length; position; random = Math.floor(Math.random()*position), temp = array[--position], array[position] = array[random], array[random] = temp);
        return array;
    }
    

    function guardaVideo(){
        $('#enviarVideo').click(function(){
            var count = 0;
            archivos.videos.forEach(function(video, i){
                count ++;
            });
            var nombre = $('#nombreVideo').val();
            var artista = $('#artistaVideo').val();
            var ruta = $('#rutaVideo').val();

            var video = {
                "id": count, 
                "nombre": nombre,
                "artista": artista,
                "rutaVideo": ruta
            }
            archivos.videos.push(video);
            console.log(archivos);

            $.ajax({
                type:"POST",
                dataType:"json",
                contentType: "application/json",
                data: JSON.stringify(archivos),
                url: "/guardaJSONVideos",
                success: function(response){
                    $("#nombreVideo").val('');
                    $("#artistaVideo").val('');
                    $("#rutaVideo").val('');
                    $('#newVideoModal').modal('hide');
                    $('#playVideos').empty();
                    getLista(archivos);
                },
                error: function(err){
                    console.log("Error al guardar: ", err);
                }
            });
        });
    }
    
    