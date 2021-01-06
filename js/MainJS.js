$(window).on('load', function (event) {
    $('body').removeClass('preloading');
    $('.load').delay(500).fadeOut('fast');
});