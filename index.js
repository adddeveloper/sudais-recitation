

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
  
