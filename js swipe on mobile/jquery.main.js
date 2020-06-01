jQuery(function() {
  initSwipe();
});

function initSwipe() {
  jQuery(".box").each(function() {
    var self = jQuery(this);

    self.on("touchstart", function(event){
      var xClick = event.originalEvent.touches[0].pageX;

      self.one("touchmove", function(event){
        var xMove = event.originalEvent.touches[0].pageX;

        if( Math.floor(xClick - xMove) > 5 ){
          console.log('right');
        }
        else if( Math.floor(xClick - xMove) < -5 ){
          console.log('left');
        }
      });

      self.on("touchend", function(){
        self.off("touchmove");
      });
    });
  });
}