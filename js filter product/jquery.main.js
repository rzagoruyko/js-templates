jQuery(function() {
  initFilter();
});

function initFilter() {
  var navActiveClass = 'active';
  var boxActiveClass = 'show';

  jQuery('.filter-holder').each(function () {
    var holder = jQuery(this);
    var filterNav = holder.find('.filter-nav');
    var filterNavItems = filterNav.find('li');
    var filterBoxes = holder.find('[data-filter]');

    filterNavItems.each(function() {
      var item = jQuery(this);
      var link = item.find('[data-nav-filter]');
      var filterData = link.data('navFilter');
      var filterArray = filterData.split(' ');

      if(item.hasClass(navActiveClass)){
        filtration(filterData, filterArray);
      }

      link.on('click', function(e) {
        e.preventDefault();
        filterNavItems.removeClass(navActiveClass);
        item.addClass(navActiveClass);
        filterBoxes.removeClass(boxActiveClass);
        filtration(filterData, filterArray);
      });
    });

    function filtration(filterData, filterArray) {
      if(filterData === 'all'){
        filterBoxes.addClass(boxActiveClass);
      } else {
        filterBoxes.each(function() {
          var box = jQuery(this);
          var checkValues = 0;

          filterArray.forEach(function(filterName) {
            box.data('filter').split(' ').forEach(function(itemName) {
              if(filterName === itemName){
                checkValues++;
              }
            });
          })

          if(filterArray.length === checkValues){
            box.addClass(boxActiveClass);
          }
        });
      }
    }
  });
}