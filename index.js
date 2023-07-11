var audioFile = document.getElementById("audioFile");
var audioHolder = document.getElementById("audioHolder");
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var loop = document.getElementById("loop");
var scrubber = document.getElementById("scrubber");

audioHolder.addEventListener("timeupdate", function() {
  scrubber.style.width = ((audioHolder.currentTime / audioHolder.duration) * 100) + "%";
});

audioFile.addEventListener("click", function() {
  audioFile.value = "";
});

audioFile.addEventListener("input", function() {
  var file = audioFile.files[0];
  audioHolder.src = URL.createObjectURL(file);
  audioHolder.type = file.type;
});

play.addEventListener("click", function() {
  if (audioHolder.src !== window.location.href && audioHolder.src !== "") {
    audioHolder.play();
  }
});

pause.addEventListener("click", function() {
  if (audioHolder.src !== window.location.href && audioHolder.src !== "") {
    audioHolder.pause();
  }
});

loop.addEventListener("click", function() {
    if (audioHolder.src !== window.location.href && audioHolder.src !== "") {
        if(audioHolder.loop){
            audioHolder.loop = false;
        } else {
            audioHolder.loop = true;
        }
    }
});
  
