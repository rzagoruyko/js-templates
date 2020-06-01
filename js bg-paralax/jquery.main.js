// page init
jQuery(function(){
  initBgParalax();
});

function initBgParalax() {
  var win = jQuery(window);
  var parentBox = '.paralax';
  var defaultSpeed = 40; //min 20
  var scrollValue = win.scrollTop();
  var imagesArray = [];

  jQuery('.visual').each(function() {
    var target = jQuery(this);

    imagesArray.push({
      target: target,
      parent: target.closest(parentBox),
      direction: target.data('direction'),
      speedValue: target.data('speedRate'),
      parentHeight: target.closest(parentBox).outerHeight(),
      topParentPosition: target.closest(parentBox).offset().top - win.outerHeight(),
      bottomParentPosition: target.closest(parentBox).offset().top + target.closest(parentBox).outerHeight()
    });
  });

  imagesArray.forEach(function(elem) {
    startImagePosition(elem);
    if(scrollValue >= elem.topParentPosition && scrollValue <= elem.bottomParentPosition){
      moveImage(elem);
    }
  });

  win.on('resize orientationchange', function() {
    scrollValue = win.scrollTop();

    imagesArray.forEach(function(elem) {
      elem.parentHeight = elem.parent.outerHeight();
      elem.topParentPosition = elem.parent.offset().top - win.outerHeight();
      elem.bottomParentPosition = elem.parent.offset().top + elem.parent.outerHeight();
      startImagePosition(elem);
    });
  });

  win.on('scroll', function() {
    scrollValue = win.scrollTop();

    imagesArray.forEach(function(elem) {
      if(scrollValue >= elem.topParentPosition && scrollValue <= elem.bottomParentPosition){
        moveImage(elem);
      }
    });
  });

  function startImagePosition(object) {
    if(object.direction === 'up'){
      object.target.css({
        'height': object.parentHeight * 2,
        'top': 0
      });
    }else{
      object.target.css({
        'height': object.parentHeight * 2,
        'top': -object.parentHeight
      });
    }
  }

  function moveImage(object) {
    if (object.speedValue){
      if(object.direction === 'up'){
        object.target.css({
          'transform': 'translate3d(0, '+ -(scrollValue - object.topParentPosition) / object.speedValue +'%, 0)',
          '-webkit-transform': 'translate3d(0, '+ -(scrollValue - object.topParentPosition) / object.speedValue +'%, 0)'
        });
      }else{
        object.target.css({
          'transform': 'translate3d(0, '+ (scrollValue - object.topParentPosition) / object.speedValue +'%, 0)',
          '-webkit-transform': 'translate3d(0, '+ (scrollValue - object.topParentPosition) / object.speedValue +'%, 0)'
        });
      }
    }else{
      if(object.direction === 'up'){
        object.target.css({
          'transform': 'translate3d(0, '+ -(scrollValue - object.topParentPosition) / defaultSpeed +'%, 0)',
          '-webkit-transform': 'translate3d(0, '+ -(scrollValue - object.topParentPosition) / defaultSpeed +'%, 0)'
        });
      }else{
        object.target.css({
          'transform': 'translate3d(0, '+ (scrollValue - object.topParentPosition) / defaultSpeed +'%, 0)',
          '-webkit-transform': 'translate3d(0, '+ (scrollValue - object.topParentPosition) / defaultSpeed +'%, 0)'
        });
      }
    }
  }
}