// page init
jQuery(function(){
  initVideo();
  initCustomVideo();
});

function initVideo() {
  jQuery('.video-box').each(function () {
    var videoBox = jQuery(this);
    var playBtn = videoBox.find('.play-btn');
    var pauseBtn = videoBox.find('.pause-btn');
    var stopBtn = videoBox.find('.stop-btn');
    var videoFrame = videoBox.find('iframe');
    var youTubeId = videoFrame.attr('id');
    var youTubeVideo;

    function readyYoutube(){
      var srcProp = videoFrame.attr('src');

      videoFrame.attr('src', srcProp + '?enablejsapi=1' + '&showinfo=0' + '&rel=0' + '&modestbranding=0');

      if((typeof YT !== "undefined") && YT && YT.Player){
        youTubeVideo = new YT.Player(youTubeId, {
          events: {
            'onStateChange': getPlayState
          }
        });
      }else{
        setTimeout(readyYoutube, 100);
      }
    }

    function getPlayState(e) {
      if (e.data == YT.PlayerState.PLAYING) {
        videoBox.removeClass('paused');
        videoBox.addClass('playing');
      }
      if (e.data == YT.PlayerState.PAUSED) {
        videoBox.removeClass('playing');
        videoBox.addClass('paused');
      }
      if (e.data == YT.PlayerState.CUED) {
        videoBox.removeClass('playing');
        videoBox.removeClass('paused');
      }
    }

    readyYoutube();

    playBtn.on('click', function(e){
      e.preventDefault();
      youTubeVideo.playVideo();
    })

    pauseBtn.on('click', function(e){
      e.preventDefault();
      youTubeVideo.pauseVideo();
    })

    stopBtn.on('click', function(e){
      e.preventDefault();
      youTubeVideo.stopVideo();
    })
  });
}

function initCustomVideo() {
  jQuery('.custom-video-box').each(function () {
    var videoBox = jQuery(this);
    var playBtn = videoBox.find('.custom-play');
    var videoFrame = videoBox.find('iframe');
    var youTubeId = videoFrame.attr('id');
    var youTubeVideo;

    function readyYoutube(){
      var srcProp = videoFrame.data('src');

      videoFrame.attr('src', srcProp + '?enablejsapi=1' + '&showinfo=0' + '&rel=0' + '&modestbranding=0' + '&autoplay=1');

      if((typeof YT !== "undefined") && YT && YT.Player){
        youTubeVideo = new YT.Player(youTubeId, {
          events: {
            'onStateChange': getPlayState
          }
        });
      }else{
        setTimeout(readyYoutube, 100);
      }
    }

    function getPlayState(e) {
      if (e.data == YT.PlayerState.PLAYING) {
        videoBox.removeClass('paused');
        videoBox.addClass('playing');
      }
      if (e.data == YT.PlayerState.PAUSED) {
        videoBox.removeClass('playing');
        videoBox.addClass('paused');
      }
      if (e.data == YT.PlayerState.CUED) {
        videoBox.removeClass('playing');
        videoBox.removeClass('paused');
      }
    }

    playBtn.on('click', function(e){
      e.preventDefault();
      readyYoutube();
      jQuery(e.currentTarget).removeClass('visible');
    })
  });
}

if (!window['YT']) {var YT = {loading: 0,loaded: 0};}if (!window['YTConfig']) {var YTConfig = {'host': 'http://www.youtube.com'};}if (!YT.loading) {YT.loading = 1;(function(){var l = [];YT.ready = function(f) {if (YT.loaded) {f();} else {l.push(f);}};window.onYTReady = function() {YT.loaded = 1;for (var i = 0; i < l.length; i++) {try {l[i]();} catch (e) {}}};YT.setConfig = function(c) {for (var k in c) {if (c.hasOwnProperty(k)) {YTConfig[k] = c[k];}}};var a = document.createElement('script');a.type = 'text/javascript';a.id = 'www-widgetapi-script';a.src = 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vfl1aVfNF/www-widgetapi.js';a.async = true;var c = document.currentScript;if (c) {var n = c.nonce || c.getAttribute('nonce');if (n) {a.setAttribute('nonce', n);}}var b = document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a, b);})();}
