jQuery(function() {
  initValidation();
});

function initValidation() {
  var errorClass = 'js-error';
  var page = jQuery('body, html');
  var animSpeed = 300;
  var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var regNumber = /^[0-9]+$/;

  jQuery('[data-main-form]').each(function() {
    var form = jQuery(this).attr('novalidate', 'novalidate');
    var requireInputs = form.find('[data-require]');
    var successFlag;
    var firstIncorrect;

    form.on('submit', function(e) {
      successFlag = true;
      firstIncorrect = false;

      validateInputs();

      if(!successFlag) {
        e.preventDefault();
        page.stop().animate({
          scrollTop: firstIncorrect.offset().top
        },{
          duration: animSpeed
        });
      }
    });

    function validateInputs() {
      requireInputs.each(function() {
        var input = jQuery(this);
        var row = input.closest('[data-validate-row]');

        if(input.data('require') == 'email') {
          valid(row, input, !regEmail.test(input.val()));
        }

        if(input.data('require') == 'number') {
          valid(row, input, !regNumber.test(input.val()));
        }

        if(input.data('require') == 'checkbox') {
          valid(row, input, !input.prop('checked'));
        }

        if(input.data('require') == 'radio') {
          valid(row, input, !requireInputs.filter('[name="' + input.attr('name') + '"]').filter(':checked').length);
          console.log(input.attr('name'));
        }

        if(input.data('require') == 'text') {
          valid(row, input, !input.val().length);
        }

        if(input.data('require') == 'select') {
          valid(row, input, input.get(0).selectedIndex === 0);
        }

        if(input.data('require') == 'password') {
          valid(row, input, !input.val().length);
        }
      });

      return successFlag;
    }

    function valid(row, input, state) {
      if(state) {
        successFlag = false;
        row.addClass(errorClass);

        input.one('focus', function() {
          row.removeClass(errorClass);
        });


        if(!firstIncorrect) {
          firstIncorrect = input;
        }
      }
    }
  });
}