// page init
jQuery(function(){
  initClassOnScroll();
});

function initClassOnScroll() {
  var win = jQuery(window);
  var header = jQuery('.header')
  var itemsArray = [];
  var scrollValue;

  jQuery('.section').each(function() {
    var item = jQuery(this);

    itemsArray.push({
      item: item,
      itemHeight: item.outerHeight(),
      itemOffset: item.offset().top,
      stateFlag: false,
      dataClass: item.data('headerClass')
    });
  });

  function scrollHandler() {
    scrollValue = win.scrollTop();

    itemsArray.forEach(function (obj) {
      if(scrollValue >= obj.itemOffset && scrollValue <= obj.itemOffset + obj.itemHeight){
        if(obj.stateFlag) return;
        obj.stateFlag = true;
        header.addClass(obj.dataClass);
      }else{
        if(!obj.stateFlag) return;
        obj.stateFlag = false;
        header.removeClass(obj.dataClass);
      }
    })
  }

  scrollHandler();

  win.on('scroll', function() {
    scrollHandler();
  });

  win.on('resize orientationchange', function() {
    itemsArray.forEach(function (obj) {
      obj.itemOffset = obj.item.offset().top;
      obj.itemHeight = obj.item.outerHeight();
    });
  });
}