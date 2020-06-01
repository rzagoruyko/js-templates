// page init
jQuery(function(){
  initDragImage();
});

function initDragImage() {
  var win = jQuery(window);
  var animDelay = 50;

  jQuery('.drag-image').each(function() {
    var parent = jQuery(this);
    var frontSlide = parent.find('.front');
    var slider = parent.find('.slider');
    var parentWidth = parent.innerWidth();
    var sliderWidth = slider.outerWidth();
    var mousePosition;
    var pressed = false;

    function moveSlider() {
      frontSlide.css('width', mousePosition);
      slider.css('left', mousePosition);

      if (mousePosition >= parentWidth - sliderWidth) {
        frontSlide.css('width', parentWidth - (sliderWidth / 2));
        slider.css('left', parentWidth - (sliderWidth / 2));
      }
      if(mousePosition <= sliderWidth){
        frontSlide.css('width', sliderWidth / 2);
        slider.css('left', sliderWidth / 2);
      }
    }

    parent.on('mousedown touchstart', function(e) {
      if(pressed) return;
      if(e.button == 2) return;
      pressed = true;
      mousePosition = e.pageX - parent.offset().left;
      moveSlider();
    });

    parent.on('mousemove touchmove', function(e) {
      if(pressed){
        mousePosition = e.pageX - parent.offset().left;
        moveSlider();
      }
    });

    win.on('mouseup touchend', function() {
      pressed = false;
      return;
    });

    frontSlide.css('width', '50%');
    slider.css('left', '50%');

    win.on('resize orientationchange', function() {
      parentWidth = parent.innerWidth();
      sliderWidth = slider.outerWidth();
      frontSlide.css('width', '50%');
      slider.css('left', '50%');
    });
  });
}