var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(e) {
  console.log('on');
  console.log(e);
}

// page init
jQuery(function(){
  //initCustomBtn();
});

function initCustomBtn() {
  var player;
}
