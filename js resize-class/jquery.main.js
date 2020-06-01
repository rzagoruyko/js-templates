// page init
jQuery(function(){
  initResizeClass();
});

// Resize class init
function initResizeClass(){
  var win = $(window),
    doc = $('html'),
    resizeClass = 'resize-active',
    flag, timer;

  function removeClassHandler() {
    flag = false;
    doc.removeClass(resizeClass);
  };

  function resizeHandler() {
    if(!flag) {
      flag = true;
      doc.addClass(resizeClass);
    }
    clearTimeout(timer);
    timer = setTimeout(removeClassHandler, 500);
  };

  win.on('resize orientationchange', resizeHandler);
}