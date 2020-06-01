// page init
jQuery(function(){
  initReplaceElement();
});

function initReplaceElement() {
  var win = jQuery(window);
  var itemsArray = [];

  jQuery('[data-mobile-target]').each(function() {
    var item = jQuery(this);

    itemsArray.push({
      item: item,
      mobilePlace: jQuery(item.data('mobileTarget')),
      tabletPlace: jQuery(item.data('tabletTarget')),
      markerPosition: jQuery('<span class="mark-position"></span>'),
      isMobilePosition: false,
      isTabletPosition: false
    });
  });

  itemsArray.forEach(function (obj) {
    obj.markerPosition.insertBefore(obj.item);
    movement(obj);
  });

  win.on('resize orientationchange', function() {
    itemsArray.forEach(function (obj) {
      movement(obj);
    });
  });

  function movement(object) {
    if(object.markerPosition.css('zIndex') == 3){ // mobile
      if(object.isMobilePosition) return;
      object.isMobilePosition = true;
      object.isTabletPosition = false;
      object.item.appendTo(object.mobilePlace);
    }

    if(object.markerPosition.css('zIndex') == 2){ // tablet
      if(object.isTabletPosition) return;
      object.isTabletPosition = true;
      object.isMobilePosition = false;
      if(object.tabletPlace.length){
        object.item.appendTo(object.tabletPlace);
      }else{
        object.item.insertAfter(object.markerPosition);
      }
    }

    if(object.markerPosition.css('zIndex') == 1){ // desktop
      if(!object.isTabletPosition && !object.isMobilePosition) return;
      object.isMobilePosition = false;
      object.isTabletPosition = false;
      object.item.insertAfter(object.markerPosition);
    }
  }
}