var audio = document.getElementById("audioHolder");
var scrubberHolder = document.querySelector(".custom-range");
scrubberHolder.value = 0;
var files, surahs, current = 0, timeselector = false;
fetch("sudais/files.json")
.then(res => res.json())
.then(data=>{
    files = data;
    audio.src = "sudais/"+files["files"][current];
})

fetch("sudais/surahs.json")
.then(res => res.json())
.then(data=>{
    surahs = data;
    document.getElementById("surahname").innerHTML = surahs['surat'][current]['name'];
});

function formatTime(timeStamp){
    var h = Math.floor(timeStamp/3600);
    var m = Math.floor((timeStamp%3600)/60);
    var s = Math.floor(timeStamp%60);
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

audio.addEventListener("loadedmetadata", ()=>{
    document.querySelector(".time").innerHTML = "<span class='smalltext'>"+(formatTime(audio.currentTime))+"</span>"+"/"+"<span class='bigtext'>"+(formatTime(audio.duration))+"</span>";
    timeselector = true;
})

var play = document.getElementById("play");
var isplaying = false, firsttime = true;
play.addEventListener("click", function() {
    if (audio.src !== window.location.href && audio.src !== "" && !isplaying) {
      audio.play();
      isplaying = true;
      if(!firsttime){
        play.children[0].classList.toggle("d-none"); play.children[1].classList.toggle("d-none");
      }
      firsttime = false;
    } else if(isplaying){
        audio.pause();
        isplaying = false;
        play.children[0].classList.toggle("d-none"); play.children[1].classList.toggle("d-none");
    }
});  

audio.addEventListener("ended", ()=>{
    isplaying = false;
})

audio.addEventListener("timeupdate", function() {
    if(Math.floor((audio.currentTime / audio.duration) * 100)){
        scrubberHolder.value = Math.floor((audio.currentTime / audio.duration) * 100);
        document.querySelector(".time").innerHTML = "<span class='smalltext'>"+(formatTime(audio.currentTime))+"</span>"+"/"+"<span class='bigtext'>"+(formatTime(audio.duration))+"</span>";
    }
});

var scrubberHolderClicked = false;
scrubberHolder.addEventListener("input", (e)=>{
    if(!timeselector) return;
    scrubberHolderClicked = true;
    console.log("clicked")
    audio.currentTime = (audio.duration * (scrubberHolder.value)/100);
})

scrubberHolder.addEventListener("change", ()=>{
    if(Math.floor((audio.currentTime / audio.duration) * 100)){
        document.querySelector(".time").innerHTML = "<span class='smalltext'>"+(formatTime(audio.currentTime))+"</span>"+"/"+"<span class='bigtext'>"+(formatTime(audio.duration))+"</span>";
    }
})

var previous = document.getElementById("previous");
previous.addEventListener("click", ()=>{
    if(current > 0){
        current--;
        isplaying = false;
        timeselector = false;
        audio.src = "sudais/"+files["files"][current];
        
        document.getElementById("surahname").innerHTML = surahs['surat'][current]['name']
        scrubberHolder.value = 0;
        play.children[0].classList.add("d-none"); play.children[1].classList.remove("d-none");
    } else{
        current = files['files'].length-1;
        isplaying = false;
        timeselector = false;
        audio.src = "sudais/"+files["files"][current];

        document.getElementById("surahname").innerHTML = surahs['surat'][current]['name']
        scrubberHolder.value = 0;
        play.children[0].classList.add("d-none"); play.children[1].classList.remove("d-none");
    }
})
var next = document.getElementById("next");
next.addEventListener("click", ()=>{
    if(current < files['files'].length-1){
        current++;
        isplaying = false;
        timeselector = false;
        audio.src = "sudais/"+files["files"][current];

        document.getElementById("surahname").innerHTML = surahs['surat'][current]['name']
        scrubberHolder.value = 0;
        play.children[0].classList.add("d-none"); play.children[1].classList.remove("d-none");
    } else {
        current = 0;
        isplaying = false;
        timeselector = false;
        audio.src = "sudais/"+files["files"][current];

        document.getElementById("surahname").innerHTML = surahs['surat'][current]['name']
        scrubberHolder.value = 0;
        play.children[0].classList.add("d-none"); play.children[1].classList.remove("d-none");
    }
})

var loop = document.getElementById("loop");
loop.addEventListener("click", function() {
    if (audio.src !== window.location.href && audio.src !== "") {
        if(audio.loop){
            audio.loop = false;
        } else {
            audio.loop = true;
        }
    }
});
