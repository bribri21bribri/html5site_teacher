var musics = [
  { name: "十年", url: "十年.mp3" },
  { name: "K歌之王", url: "K歌之王.mp3" },
  { name: "兄妹", url: "兄妹.mp3" },
  { name: "好就不見", url: "好久不見.mp3" },
  { name: "我們都寂寞", url: "我們都寂寞.mp3" }];
var index = 0;

//like & shuffle button
$('.heart').click(function(){
  $(this).toggleClass('clicked');
});

$('.shuffle').click(function(){
  $(this).toggleClass('clicked');
});

//show info box on hover
$('#player').hover(function(){ 
  $('.info').toggleClass('up');
});

//music player settings

let audio = new Audio('../musics/十年.mp3');

$('.pause').hide(); //hide pause button until clicked

//play button
$('.play').click(function(){
  audio.play();
  $('.play').hide();
  $('.pause').show();
});

//pause button
$('.pause').click(function(){
  audio.pause();
  $('.play').show();
  $('.pause').hide();
});

