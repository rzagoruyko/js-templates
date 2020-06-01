// page init
jQuery(function(){
  initImageLoad();
});

function initImageLoad() {
  var win = jQuery(window);
  var priorityArray = [];
  var imagesArray = [];
  var priority;
  var loadedClass = 'loaded';
  var priorityQueue = 0;

  jQuery('.load-bg').each(function () {
    var image = jQuery(this);

    if(image.hasClass('priority')){
      priority = true;

      priorityArray.push({
        target: image,
        imageSrc: image.data('bg-src'),
        preloadImg: jQuery('<img>')
      });
    }else{
      imagesArray.push({
       target: image,
       imageSrc: image.data('bg-src'),
       preloadImg: jQuery('<img>')
      });
    }
 });

  win.on('load', function() {
    if(priority){
      priorityArray.forEach(function(elem, i) {
        elem.preloadImg.attr('src', elem.imageSrc)

        elem.preloadImg.on('load', function(){
          elem.target.css('background-image', 'url('+elem.imageSrc+')');
          elem.target.addClass(loadedClass);
          priorityQueue += 1;

          if(priorityQueue === priorityArray.length){
            imagesArray.forEach(function(elem) {
              elem.preloadImg.attr('src', elem.imageSrc)

              elem.preloadImg.on('load', function(){
                elem.target.css('background-image', 'url('+elem.imageSrc+')');
                elem.target.addClass(loadedClass);
              })
            })
          }
        })
      });
    }else{
      imagesArray.forEach(function(elem) {
        elem.preloadImg.attr('src', elem.imageSrc)

        elem.preloadImg.on('load', function(){
          elem.target.css('background-image', 'url('+elem.imageSrc+')');
          elem.target.addClass(loadedClass);
        })
      })
    }
  });
}
