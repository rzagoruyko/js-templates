// page init
jQuery(function(){
  initTest();
});

function initTest() {
  if (! Cookies.get("VisitDetect")){
     jQuery('body').addClass('first-visit');
     Cookies.set("VisitDetect", "visited")
  }

  console.log(Cookies.get("VisitDetect"));
}
