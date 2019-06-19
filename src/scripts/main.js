// jquery code
$(document).ready(function() {
    toolbarTransform();
    $(".country").select2({
        templateResult: formatState,
        templateSelection: formatState
    });
    $('.select2-selection__arrow').append('<i class="fa fa-angle-down"></i>');
    $('#open-menu').click(function(){
        $('.navbar-collapse').addClass('show');
    });
    $('#close-menu').click(function(){
        $('.navbar-collapse').removeClass('show');
    });
    $('#demo').on('click', function(e) {
        $('.width .collapse').addClass('show');//you can list several class names
    });
    $('#icon').append('<i class="fa fa-toggle fa-chevron-circle-down" aria-hidden="true"></i>').click(function(){
        $('.fa-toggle').toggleClass('fa-chevron-circle-down fa-chevron-circle-up')
    });;
    $('.carousel-main').owlCarousel({
        items: 1,
        loop: true,
        autoplay: false,
        autoHeight: false,
        autoplayTimeout: 1500,
        margin: 0,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    });
    $("#carousel").owlCarousel({
        items: 3,
        autoplay: false,
        lazyLoad: true,
        loop: false,
        margin: 0,
        responsiveClass: true,
        autoHeight: false,
        autoplayTimeout: 7000,
        smartSpeed: 800,
        nav: false,
        responsive: {
            0: {
                items: 1
            },

            600: {
                items: 2
            },

            1024: {
                items: 3
            },

        }
    });
    $("#carousel-after-news").owlCarousel({
        items: 2,
        autoplay: false,
        lazyLoad: true,
        loop: false,
        margin: 0,
        responsiveClass: true,
        autoHeight: true,
        autoplayTimeout: 7000,
        smartSpeed: 800,
        nav: false,
        responsive: {
            0: {
                items: 1
            },

            800: {
                items: 2
            },
        }
    });
});

function formatState (opt) {
    if (!opt.id) {
        return opt.text.toUpperCase();
    }

    const optimage = $(opt.element).attr('data-image');
    if(!optimage){
        return opt.text;
    } else {
        const $opt = $(
            '<span><img src="' + optimage + '" width="60px" alt="flag"/> ' + opt.text.toUpperCase() + '</span>'
        );
        return $opt;
    }
};

function toolbarTransform(params) {
    var toolbarBg = $('.wrap-toolbar');
    var toolbarList = $('.toolbar');
    var menu = $('.wrap-menu');
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 150) {
            toolbarBg.css('background-color', '#fff');
            toolbarList.css('color', '#222');
        } else {
            toolbarBg.attr('style', '');
            toolbarList.attr('style', '');
        }
    });
}