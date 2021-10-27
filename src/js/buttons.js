import $ from 'jquery';

export function init() {
    var $btn = $('.c-btn'),
    $btnInk = $btn.find('.c-btn__ink');
    if (!$btnInk.height() && !$btnInk.width()) {
        var d = Math.max($btn.outerWidth(), $btn.outerHeight());
        $btnInk.css({height: d, width: d});
    }
    $btn.on('mouseenter', function (e) {
        var $rippler = $(this),
            $ink = $(this).find('.c-btn__ink');
        $ink.removeClass('c-btn__ink--active');
        var x = e.pageX - $rippler.offset().left - $ink.width() / 2;
        var y = e.pageY - $rippler.offset().top - $ink.height() / 2;

        $ink.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass('c-btn__ink--active');
    });

    $btn.on('mouseleave', function (e) {
        var $rippler = $(this),
        $ink = $(this).find('.c-btn__ink');
        var x = e.pageX - $rippler.offset().left - $ink.width() / 2;
        var y = e.pageY - $rippler.offset().top - $ink.height() / 2;
        $ink.css({
            top: y + 'px',
            left: x + 'px'
        }).removeClass('c-btn__ink--active');
    });
}