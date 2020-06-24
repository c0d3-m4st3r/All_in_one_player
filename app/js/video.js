$(document).ready(function(){
    

getVideos();
iniciarReproductor();



});



var video = document.getElementById('video');
var archivos;





function PantallaCompleta(){


var video = document.getElementById('video');

if (!video.fullscreenElement) {
      video.documentElement.requestFullscreen();
  } else {
    if (video.exitFullscreen) {
      video.exitFullscreen(); 
    }
  }

}

function playPause(){

if(video.paused){
    video.play();
}else{

    video.pause();

}
}


function stop(){

video.pause();
video.currentTime = 0;

}


function skip(value){

video.currentTime += value;

}


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
    console.log(videos.videos);
    $.each(videos.videos, function(i, video){
        $('#playVideos').append('<li class="list-group-item" id="' + i + '">' + video.nombre + '</li>');
        
              
    });
    $('#playVideos li').click(function(){
        var videoSeleccionado = $(this).attr('id');
        playVideo(videoSeleccionado);
   
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






