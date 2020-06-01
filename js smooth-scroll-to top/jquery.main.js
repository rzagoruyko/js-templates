// page init
jQuery(function(){
	SmoothScroll.init();
	initBackToTop();
});




// back to top init
function initBackToTop() {
	jQuery('a.go-up[href^=#]').click(function(e) {
		e.preventDefault();
		SmoothScroll.scrollToOffsset(0);
	});
}




// smooth scroll
var SmoothScroll = {
	options: {
		animSpeed: 800
	},
	init: function() {
		this.isWP = /MSIE 10.*Touch/.test(navigator.userAgent) || /Windows Phone OS 7./.test(navigator.userAgent);
		this.scrollHolder = /WebKit/.test(navigator.userAgent) ? jQuery('body') : jQuery('html');
		this.win = jQuery(window);
	},
	scrollToOffsset: function(offset, animSpeed) {
		if (this.isWP) {
			this.win.scrollTop(offset);
		} else {
			this.scrollHolder.stop().animate({scrollTop: offset}, animSpeed || this.options.animSpeed);
		}
	}
};

