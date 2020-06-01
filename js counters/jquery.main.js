// page init
jQuery(function(){
  initCounters();
});

function initCounters() {
  jQuery('.counter-load').counterUp({
      delay: 40,
      time: 2000,
      initMode: 'load'
  });
  jQuery('.counter-scroll').counterUp({
      delay: 10,
      time: 3000
  });
}

(function( $ ){
  "use strict";

  $.fn.counterUp = function( options ) {

    // Defaults
    var settings = $.extend({
      time: 400,
      delay: 10,
      initMode: 'scroll'
    }, options);

    return this.each(function(){

      // Store the object
      var target = $(this);
      var startFlag = false;
      var win = jQuery(window);
      var targetOffset = target.offset().top;

      var counterUpper = function() {
        var nums = [];
        var divisions = settings.time / settings.delay;
        var num = String(target.data('value'));
        var isComma = /[0-9]+,[0-9]+/.test(num);
        num = num.replace(/,/g, '');
        var isInt = /^[0-9]+$/.test(num);
        var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
        var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;

        // Generate list of incremental numbers to display
        for (var i = divisions; i >= 1; i--) {

          // Preserve as int if input was int
          var newNum = parseInt(num / divisions * i);

            // Preserve float if input was float
            if (isFloat) {
              newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
            }

            // Preserve commas if input had commas
            if (isComma) {
              while (/(\d+)(\d{3})/.test(newNum.toString())) {
                newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
              }
            }

          nums.unshift(newNum);
        }

        target.data('counterup-nums', nums);
        target.text('0');

        // Updates the number until we're done
        var f = function() {
          target.text(target.data('counterup-nums').shift());
          if (target.data('counterup-nums').length) {
            setTimeout(target.data('counterup-func'), settings.delay);
          } else {
            delete target.data('counterup-nums');
            target.data('counterup-nums', null);
            target.data('counterup-func', null);
          }
        };
        target.data('counterup-func', f);

        // Start the count up
        setTimeout(target.data('counterup-func'), settings.delay);
        startFlag = true;
      };

        function counterScrollHandler() {
          if(win.scrollTop() >= targetOffset - win.outerHeight() + target.outerHeight()){
            counterUpper();
          }
        }

        if(settings.initMode == 'load'){
          counterUpper();
        }

        if(settings.initMode == 'scroll' && targetOffset + target.outerHeight() <= win.outerHeight()){
          counterUpper();
        }

        if(settings.initMode == 'scroll' && targetOffset + target.outerHeight() >= win.outerHeight()){
          if(startFlag) return;
          counterScrollHandler();

          win.on('scroll', function() {
            if(startFlag) return;
            counterScrollHandler();
          });
        }
    });
  };
})( jQuery );