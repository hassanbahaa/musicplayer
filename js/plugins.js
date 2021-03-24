//define variables

let audio, playbtn, title, poster, artists,mutebtn, seekslider,volumeslider,
    seeking=false, seekto,curtimetext,durtimetext,playlist_status,dir,playlist,
    ext,agent,playlist_artist,repeat,random;


    // init. of array of music ,title , poster image, artists


    dir="music/";
    playlist = ["Cartoon-On-_-On", "Elektronomia"];
    title = ["Cartoon - On & On feat. Daniel Levi", "Elektronomia"];

    artists = ["(feat. Daniel Levi) [NCS Release]", "Elektronomia-Sky High [NCS Release]"];
    poster = ["images/ncs1.jpeg", "images/ncs2.jpg"];


    //used to run on every browser

    ext = ".mp3";
    agent = navigator.userAgent.toLowerCase();
    if(agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1){
        ext - ".ogg";
        }

// Set object references
playbtn = document.getElementById("playpausebtn");
nextbtn = document.getElementById("nextbtn");
prevbtn = document.getElementById("prevbtn");
mutebtn = document.getElementById("mutebtn");
seekslider = document.getElementById("seekslider");
volumeslider = document.getElementById("volumeslider");
curtimetext = document.getElementById("curtimetext");
durtimetext = document.getElementById("durtimetext");
playlist_status = document.getElementById("playlist_status");
playlist_artist = document.getElementById("playlist_artist");
repeat = document.getElementById("repeat");
randomSong = document.getElementById("random");
playlist_index = 0;

//Audio Object


audio = new Audio();
audio.src = dir + playlist[0] + ext; //music/musicname.mp3
audio.loop = false;
playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artists[playlist_index];
console.log(audio.duration);


//add event  handling

playbtn.addEventListener("click",playpause);
nextbtn.addEventListener("click",nextsong);
prevbtn.addEventListener("click",prevsong);
mutebtn.addEventListener("click",mute);
seekslider.addEventListener("mousedown",function(event){
seeking = true;
seek(event);
});
seekslider.addEventListener("mousemove",function(event){
seek(event);
});

seekslider.addEventListener("mouseup",function(){
seeking = false;
});

volumeslider.addEventListener("mousemove",setvolume);
audio.addEventListener("timeupdate",function(){
    seektimeupdate();
});
audio.addEventListener("ended",function(){
    switchtrack();
});

repeat.addEventListener("click",loop);

randomSong.addEventListener("click",random);

//functions

function fetchMusicDetails(){
    //Poster Image, Pause/Play Image
    $("#playpausebtn img").attr("src", "images/pause-red.png");
    $("#bgImage").attr("src", poster[playlist_index]);
    $("#image").attr("src", poster[playlist_index]);
    //Title and Artist
    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artists[playlist_index];
    // Audio
    audio.src = dir+playlist[playlist_index] +ext;
    audio.play();
    
    }

function playpause() {
    if(audio.paused){
        audio.play();
        $('#playpausebtn img').attr("src","images/pause-red.png");
    }else{
        audio.pause();
        $('#playpausebtn img').attr("src","images/play-red.png");
    }
}



function nextsong(){
    playlist_index++;
    console.log("00");
    if(playlist_index > playlist.length - 1){
    playlist_index = 0;
    }
    fetchMusicDetails();
}


function prevsong(){
    playlist_index--;
    if(playlist_index < 0){
    playlist_index = playlist.length - 1;
    }
    fetchMusicDetails();
    }

function mute(){
    if(audio.muted) {
    audio.muted = false;
    $("#mutebtn img").attr("src", "images/speaker.png");
    }else{
    audio.muted = true;
    $("#mutebtn img").attr("src","images/mute.png");
    }
}


function seek(event){
    if(audio.duration == 0){
    null
    }else{
    if(seeking) {
    seekslider.value = event.clientX - seekslider.offsetLeft;
    seekto = audio.duration * (seekslider.value / 100);
    audio.currentTime = seekto;
    
    }
    }
    }


   
    function setvolume(){
        audio.volume = volumeslider.value / 100;
        }
        function seektimeupdate(){
        if(audio.duration) {
        let nt = audio.currentTime * (100 / audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if(cursecs < 10){ cursecs = "0" + cursecs}
        if(dursecs < 10){ dursecs = "0" + dursecs}
        if(curmins < 10){ curmins = "0" + curmins}
        if(dursecs < 10){ dursecs = "0" + dursecs}
        
        curtimetext.innerHTML = curmins + ":" + cursecs;
        durtimetext.innerHTML = durmins + ":"+ dursecs;
        }else{
        curtimetext.innerHTML = "00"+":"+"00";
        durtimetext.innerHTML = "00"+":"+"00";
        }
        }

     