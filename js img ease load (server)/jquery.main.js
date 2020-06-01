// page init
jQuery(function(){
  initImageLoad();
});

function initImageLoad() {
  // on load

  var win = jQuery(window);
  var priorityArray = [];
  var imagesArray = [];
  var priority;
  var priorityQueue = 0;


  jQuery('.load-img').each(function () {
    var image = jQuery(this);

    if(image.hasClass('priority')){
      priority = true;

      priorityArray.push({
        target: image,
        imageSrc: image.data('src')
      });
    }else{
      imagesArray.push({
       target: image,
       imageSrc: image.data('src')
      });
    }
 });

  win.on('load', function() {
    if(priority){
      priorityArray.forEach(function(elem, i) {
        elem.target.attr('src', elem.imageSrc);

        elem.target.on('load', function () {
          priorityQueue += 1;
          elem.target.addClass('loaded');

          if(priorityQueue === priorityArray.length){
            imagesArray.forEach(function(elem) {
              elem.target.attr('src', elem.imageSrc);

              elem.target.on('load', function () {
                elem.target.addClass('loaded');
              })
            })
          }
        })
      });
    }else{
      imagesArray.forEach(function(elem) {
        elem.target.attr('src', elem.imageSrc);

        elem.target.on('load', function () {
          elem.target.addClass('loaded');
        })
      })
    }
  });




  // on scroll

//   var win = jQuery(window);
//   var scrollValue = win.scrollTop();
//   var imagesArray = [];

//   jQuery('.load-img').each(function () {
//     var image = jQuery(this);

//     imagesArray.push({
//      target: image,
//      imageSrc: image.data('src'),
//      flag: false
//    });
//  });

//   function detectImage(object) {
//     if(scrollValue >= object.topPosition && scrollValue <= object.bottomPosition && !object.flag){
//       object.target.attr('src', object.imageSrc);
//       object.flag = true;
//     }
//   }

//   win.on('load', function() {
//     imagesArray.forEach(function(elem) {
//       elem.topPosition = elem.target.offset().top - win.outerHeight();
//       elem.bottomPosition = elem.target.offset().top + elem.target.outerHeight();
//       detectImage(elem);
//     });
//   })

//   win.on('scroll', function() {
//     scrollValue = win.scrollTop();

//     imagesArray.forEach(function(elem) {
//       detectImage(elem);
//     });
//   });
}
