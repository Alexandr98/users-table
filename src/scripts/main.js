// jquery code
$(document).ready(function() {
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
    $('.carousel-main').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoHeight: false,
        autoplayTimeout: 1500,
        margin: 0,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    })
});

function formatState (opt) {
    if (!opt.id) {
        return opt.text.toUpperCase();
    }

    const optimage = $(opt.element).attr('data-image');
    if(!optimage){
        return opt.text.toUpperCase();
    } else {
        const $opt = $(
            '<span><img src="' + optimage + '" width="60px" alt="flag"/> ' + opt.text.toUpperCase() + '</span>'
        );
        return $opt;
    }
};