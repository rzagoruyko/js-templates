// page init
jQuery(function(){
  initHeaderHeight();
});

// fake header init
function initHeaderHeight(){
  var win = jQuery(window);

  jQuery('#wrapper').each(function() {
    var heightValue;
    var parent = jQuery(this);
    var headerElement = parent.find('#header');

    heightHandler();
    win.on('resize orientationchange load', heightHandler)

    function heightHandler(){
      heightValue = headerElement.outerHeight(true);
      parent.css('padding-top', heightValue);
    }
  });
}