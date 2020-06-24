$(document).ready(function(){
    getCanciones();
    iniciarReproductor();
});

var audio = document.getElementById('player');
var musica;

function iniciarReproductor(){
    $('#shuffle').click(function(){
        $('#playlist').empty();
        console.log(shuffle(musica.canciones));
        getLista(musica);
        playCancion(0);
    })
}


var MEDIA_ELEMENT_NODES = new WeakMap();


function getCanciones(){
    $.getJSON("js/app.json", function(mjson){
        musica = mjson;
        getLista(musica);
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

    var canvas = document.querySelector('canvas'),
       canvasCtx = canvas.getContext('2d');
        WIDTH = canvas.width;
        HEIGHT = canvas.height;

document.body.appendChild(audio);
       audioContext = new AudioContext(),
       source = audioContext.createMediaElementSource(audio),
       analyser = audioContext.createAnalyser();

source.connect(analyser);
analyser.connect(audioContext.destination);

       analyser.fftSize = 256;
      var bufferLengthAlt = analyser.frequencyBinCount;
      console.log(bufferLengthAlt);
      var dataArrayAlt = new Uint8Array(bufferLengthAlt);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      var drawAlt = function() {
        drawVisual = requestAnimationFrame(drawAlt);

        analyser.getByteFrequencyData(dataArrayAlt);

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        var barWidth = (WIDTH / bufferLengthAlt) * 2.5;
        var barHeight;
        var x = 0;

        for(var i = 0; i < bufferLengthAlt; i++) {
          barHeight = dataArrayAlt[i];

          canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
          canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

          x += barWidth + 1;
        }
      };

      drawAlt();


}
    
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






//esta función es una prueba de código

function ecualizador(){


const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

// set basic variables for example
const myAudio = document.querySelector('audio');
const pre = document.querySelector('pre');
const myScript = document.querySelector('script');

pre.innerHTML = myScript.innerHTML;

const targetAtTimePlus = document.querySelector('.set-target-at-time-plus');
const targetAtTimeMinus = document.querySelector('.set-target-at-time-minus');
const linearRampPlus = document.querySelector('.linear-ramp-plus');
const linearRampMinus = document.querySelector('.linear-ramp-minus');
const expRampPlus = document.querySelector('.exp-ramp-plus');
const expRampMinus = document.querySelector('.exp-ramp-minus');
const atTimePlus = document.querySelector('.at-time-plus');
const atTimeMinus = document.querySelector('.at-time-minus');
const valueCurve = document.querySelector('.value-curve');

myAudio.addEventListener('play', () => {
  audioCtx = new AudioContext();

  // Create a MediaElementAudioSourceNode
  // Feed the HTMLMediaElement into it
  const source = audioCtx.createMediaElementSource(myAudio);

  // Create a gain node and set it's gain value to 0.5
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.5;
  let currGain = gainNode.gain.value;

  // connect the AudioBufferSourceNode to the gainNode
  // and the gainNode to the destination
  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // set buttons to do something onclick
  targetAtTimePlus.onclick = function() {
    currGain += 0.25;
    gainNode.gain.setValueAtTime(currGain, audioCtx.currentTime + 1);
  }

  targetAtTimeMinus.onclick = function() {
    currGain -= 0.25;
    gainNode.gain.setValueAtTime(currGain, audioCtx.currentTime + 1);
  }

  linearRampPlus.onclick = function() {
    currGain = 1.0;
    gainNode.gain.linearRampToValueAtTime(1.0, audioCtx.currentTime + 2);
  }

  linearRampMinus.onclick = function() {
    currGain = 0;
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2);
  }

  expRampPlus.onclick = function() {
    currGain = 1.0;
    gainNode.gain.exponentialRampToValueAtTime(1.0, audioCtx.currentTime + 2);
  }

  expRampMinus.onclick = function() {
    currGain = 0;
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2);
  }

  atTimePlus.onclick = function() {
    currGain = 1.0;
    gainNode.gain.setTargetAtTime(1.0, audioCtx.currentTime + 1, 0.5);
  }

  atTimeMinus.onclick = function() {
    currGain = 0;
    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime + 1, 0.5);
  }

  let waveArray = new Float32Array(9);
  waveArray[0] = 0.5;
  waveArray[1] = 1;
  waveArray[2] = 0.5;
  waveArray[3] = 0;
  waveArray[4] = 0.5;
  waveArray[5] = 1;
  waveArray[6] = 0.5;
  waveArray[7] = 0;
  waveArray[8] = 0.5;

  valueCurve.onclick = function() {
    gainNode.gain.setValueCurveAtTime(waveArray, audioCtx.currentTime, 2);

  }

});





   }





function reset(){
mediaElement = document.getElementById('leftdisc');
document.getElementById('hi').value=50;
document.getElementById('mid').value=50;
document.getElementById('lo').value=50;
sourceNode = context.createMediaElementSource(mediaElement);

lofilter = context.createBiquadFilter();
midfilter = context.createBiquadFilter();
hifilter = context.createBiquadFilter();

// Low-pass filter. See BiquadFilterNode docs http://www.html5rocks.com/en/tutorials/webaudio/intro/
lofilter.type = "lowpass"; 
// high-pass filter. See BiquadFilterNode docs http://www.html5rocks.com/en/tutorials/webaudio/intro/
midfilter.type = "peaking"; 
hifilter.type = "highpass"; 


lofilter.frequency.value = 800; // Set cutoff to 440 HZ
midfilter.frequency.value = 3000; // Set cutoff to 440 HZ
hifilter.frequency.value = 5000; // Set cutoff to 440 HZ

sourceNode.connect(lofilter);
sourceNode.connect(midfilter);
sourceNode.connect(hifilter);

lofilter.connect(context.destination);
midfilter.connect(context.destination);
hifilter.connect(context.destination);
leftdisc.volume=1-document.getElementById('xfade').value/100; 
};

//when changing the equalizer

function eq(str){
  console.log(str);
  //since range is defaulted at 50 we need to default at 0
  strval = (document.getElementById(str).value-50)*0.8; // Set hi mid low db from -40 to 40


switch(str) {
case "lo":

this.lofilter = audioCtx.createBiquadFilter();
this.lofilter.type = "lowshelf";
this.lofilter.frequency.value = 320.0;
this.lofilter.gain.value = 0.0;
this.lofilter.connect( this.xfade );


console.log(lofilter);

    break;

case "mid":    

this.mid = audioCtx.createBiquadFilter();
this.mid.type = "peaking";
this.mid.frequency.value = 1000.0;
this.mid.Q.value = 0.5;
this.mid.gain.value = 0.0;
this.mid.connect( this.low );

    break;

case "hi":    


this.hifilter = audioCtx.createBiquadFilter();
this.hifilter.type = "highshelf";
this.hifilter.frequency.value = 3200.0;
this.hifilter.gain.value = 0.0;
this.hifilter.connect( this.mid );
    break;

default:
    console.log('default');
}


}





