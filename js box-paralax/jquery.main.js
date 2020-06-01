// page init
jQuery(function(){
  initBoxParalax();
});

function initBoxParalax() {
  var win = jQuery(window);
  var parentBox = '.paralax-holder';
  var defaultSpeed = 3; //min 0.1
  var scrollValue = win.scrollTop();
  var boxsArray = [];

  win.scrollTop(0);

  jQuery('.anim-box').each(function() {
    var target = jQuery(this);

    boxsArray.push({
      target: target,
      parent: target.closest(parentBox),
      direction: target.data('direction'),
      speedValue: target.data('speedRate'),
      parentHeight: target.closest(parentBox).outerHeight(),
      topParentPosition: target.closest(parentBox).offset().top - win.outerHeight(),
      bottomParentPosition: target.closest(parentBox).offset().top + target.closest(parentBox).outerHeight()
    });
  });

  boxsArray.forEach(function(elem) {
    startBoxPosition(elem);
    if(scrollValue >= elem.topParentPosition && scrollValue <= elem.bottomParentPosition){
      moveBox(elem);
    }
  });

  win.on('resize orientationchange', function() {
    scrollValue = win.scrollTop();

    boxsArray.forEach(function(elem) {
      elem.parentHeight = elem.parent.outerHeight();
      elem.topParentPosition = elem.parent.offset().top - win.outerHeight();
      elem.bottomParentPosition = elem.parent.offset().top + elem.parent.outerHeight();
      startBoxPosition(elem);
    });
  });

  win.on('scroll', function() {
    scrollValue = win.scrollTop();

    boxsArray.forEach(function(elem) {
      if(scrollValue >= elem.topParentPosition && scrollValue <= elem.bottomParentPosition){
        moveBox(elem);
      }
    });
  });

  function startBoxPosition(object) {
    if(object.direction === 'up'){
      object.target.css({
        'top': (object.parent.offset().top - object.topParentPosition) / object.speedValue * 0.6
      });
    }else{
      object.target.css({
        'top': -(object.parent.offset().top - object.topParentPosition) / object.speedValue * 0.6
      });
    }
  }

  function moveBox(object) {
    if (object.speedValue) {
      if(object.direction === 'up'){
        object.target.css({
          'transform': 'translate3d(0, '+ -(scrollValue - object.topParentPosition) / object.speedValue +'px, 0)',
          '-webkit-transform': 'translate3d(0, '+ -(scrollValue - object.topParentPosition) / object.speedValue +'px, 0)'
        });
      }else{
        object.target.css({
          'transform': 'translate3d(0, '+ (scrollValue - object.topParentPosition) / object.speedValue +'px, 0)',
          '-webkit-transform': 'translate3d(0, '+ (scrollValue - object.topParentPosition) / object.speedValue +'px, 0)'
        });
      }
    }else{
      if(object.direction === 'up'){
        object.target.css({
          'transform': 'translate3d(0, '+ -(scrollValue - object.topParentPosition) / defaultSpeed +'px, 0)',
          '-webkit-transform': 'translate3d(0, '+ -(scrollValue - object.topParentPosition) / defaultSpeed +'px, 0)'
        });
      }else{
        object.target.css({
          'transform': 'translate3d(0, '+ (scrollValue - object.topParentPosition) / defaultSpeed +'px, 0)',
          '-webkit-transform': 'translate3d(0, '+ (scrollValue - object.topParentPosition) / defaultSpeed +'px, 0)'
        });
      }
    }
  }
}
