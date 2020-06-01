// page init
jQuery(function(){
  initVideo();
});

function initVideo() {
  var playClass = 'playing';

  jQuery('.banner-video').each(function() {
    var holder = jQuery(this);
    var playBtn = holder.find('.play');
    var videoElement = holder.find('video')[0];
    var percentage = (videoElement.currentTime / videoElement.duration) * 100;
    var progressHolder = holder.find('.custom-progress');
    var progressLine = progressHolder.find('span');
    var clickPosition;
    var videoTime;

    videoElement.controls = false;

    videoElement.ontimeupdate = function(){
      percentage = (videoElement.currentTime / videoElement.duration) * 100;
      progressLine.css('width', percentage+'%');

      if(videoElement.ended){
        videoElement.pause();
        videoElement.currentTime = 0;
        holder.removeClass(playClass);
      }
    };

    progressHolder.on('click', function(e){
        clickPosition = (e.pageX - progressHolder.offset().left);
        percentage = (clickPosition / progressHolder.width());
        videoTime = videoElement.duration * percentage;
        videoElement.currentTime = videoTime;
    });

    playBtn.on('click', function(e) {
      e.preventDefault();

      if (videoElement.paused) {
        videoElement.play();
        holder.addClass(playClass);
      } else {
        videoElement.pause();
        holder.removeClass(playClass);
      }
    });
  });
}