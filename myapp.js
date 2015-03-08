// BEGIN DAY 1.
var gallery;
var artistMap;
var selectedArtistId;

var isPlaying =false;

function setup() {
  gallery = document.getElementById('myGallery');

  gallery.addEventListener('drawer-open',handleOpen);
  gallery.addEventListener('drawer-close',handleClose);
  gallery.addEventListener('thumbnail-tap', handleTap);
  gallery.addEventListener('thumbnail-tap', handleTap);

  var sampleTrack = document.getElementById('sample-track');
  sampleTrack.addEventListener('tap',handlePlayback);

  drawThumbnails();
}

function handlePlayback(){
  var daSong = artistMap[selectedArtistId].sampletrack.url;
  var myAudio = document.getElementById('music-sample');
  var playImage = document.getElementById('play');
  var equalImage = document.getElementById('equalizer');
  var loadImage = document.getElementById('load');

  if (isPlaying){
    myAudio.pause();
  } else {
    myAudio.src = daSong;
    myAudio.play();
    loadImage.style.opacity =1;
    playImage.style.opacity =0;
  }


  myAudio.addEventListener('canplay', function() {
    isPlaying = true;
    loadImage.style.opacity =0;
    equalImage.style.opacity = 1;

  });

  myAudio.addEventListener('pause', function() {
    isPlaying = false;
    equalImage.style.opacity = 0;
    playImage.style.opacity = 1;
  });
}

function handleTap(e) {
  selectedArtistId = e._args;
  gallery.setDrawerBackground(artistMap[selectedArtistId].thumbnail);
  gallery.openDrawer();
}

function handleOpen(){
  var artistName = document.getElementById('artist-name');
  artistName.innerHTML = artistMap[selectedArtistId].name;

  var artistDescription = document.getElementById('artist-description')
  artistDescription.innerHTML =artistMap[selectedArtistId].description;

  var songName = document.getElementById('song');
  song.innerHTML = artistMap[selectedArtistId].sampletrack.trackname;

  var mainContent = document.getElementById('main-content');
  mainContent.style.opacity = 1;
}

function handleClose(){
  var mainContent = document.getElementById('main-content');
  mainContent.style.opacity = 0;
}

function drawThumbnails(){
 fetchData();
}

function fetchData(){
  $.getJSON('https://burning-fire-9671.firebaseio.com/artists.json', function(dagoods){
    artistMap = dagoods;
    gallery.drawThumbnailsFromObject(dagoods);
  // console.log(dagoods);
  });
}

window.addEventListener('WebComponentsReady', function(e) {
  setup();
});