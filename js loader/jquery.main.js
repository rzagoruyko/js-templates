;(function(w) {
  w.addEventListener('load', function() {
    var loader = document.querySelector('html');

    if (loader) {
      loader.classList.add('loaded');
    }

    if(window.jcf) {
      jcf.refreshAll();
    }
  });
}(window));