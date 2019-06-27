// jquery code
var currentSlideModal = 0;

$(document).ready(function() {
    toolbarTransform();
    initThumbnailSlider();
    initModalThumbnailSlider();
    $(".country").select2({
        templateResult: formatState,
        templateSelection: formatState
    });
    $(".custom-select").select2();
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
    });
    $('#open-modal').click(function(){
        $('.wrap-slider-modal').addClass('open');
    });
    $('#close-modal').click(function(){
        $('.wrap-slider-modal').removeClass('open');

    });
    $('.wrap-slider-modal').bind('click', function () {
        $('.wrap-slider-modal').removeClass('open');
    })
    $('.slider-modal').bind('click', function (e) {
        e.stopPropagation();
    })
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

function initMap() {
    // The location of Uluru
    var portDAndratx = {lat: 39.544, lng: 2.389};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14.5, center: portDAndratx, disableDefaultUI: true,});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: portDAndratx, map: map});
    $(window).resize(function () {
        if(window.innerWidth < 992){
            $('#map').css({'min-width': window.innerWidth})
        }else{
            $('#map').css({'min-width': '0'})
        }
    });
    $(window).trigger('resize');
}

function initModalThumbnailSlider() {
    var sync3 = $('#sync3');

    var sync4 = $('#sync4');
    if(!(sync3.length && sync4.length)){
        return
    }
    var sliderItem = sync4.children('div.item');

    var slidesPerPage = 12; //globaly define number of elements per page
    var syncedSecondary = false;

    sync3
        .owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: true,
            autoplay: false,
            dots: false,
            loop: true,
            responsiveRefreshRate: 200,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            responsive: {
                767: {
                    nav: false
                }
            }
        })
        .on('changed.owl.carousel', syncPosition3);

    sync4
        .on('initialized.owl.carousel', function() {
            sync4
                .find('.owl-item')
                .eq(currentSlideModal)
                .addClass('current');
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: false,
            nav: true,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100,
        })
        .on('changed.owl.carousel', syncPosition4);

    function syncPosition3(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        sync4
            .find('.owl-item')
            .removeClass('current')
            .eq(current)
            .addClass('current');
        var onscreen = sync4.find('.owl-item.active').length - 1;
        var start = sync4
            .find('.owl-item.active')
            .first()
            .index();
        var end = sync4
            .find('.owl-item.active')
            .last()
            .index();

        if (current > end) {
            sync3.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync3.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition4(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync3.data('owl.carousel').to(number, 100, true);
        }
    }

    sync4.on('click', '.owl-item', function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync3.data('owl.carousel').to(number, 300, true);
    });


    function resizeThumbnails(){
        $(window).resize(function() {
            if ($(window).width() > 991) {
                setItemHeight(sliderItem);
            }  else {
                sliderItem.css({
                    height: 'auto',
                });
            }
        });
        $(window).trigger('resize');
    }
    resizeThumbnails()
}

function initThumbnailSlider(){
    var sync1 = $('#sync1');

    var sync2 = $('#sync2');
    if(!(sync1.length && sync2.length)){
        return
    }
    var sliderItem = sync2.children('div.item');

    var slidesPerPage = 12; //globaly define number of elements per page
    var syncedSecondary = false;

    sync1
        .owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: true,
            autoplay: false,
            dots: false,
            loop: true,
            responsiveRefreshRate: 200,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            responsive: {
                767: {
                    nav: false
                }
            }
        })
        .on('changed.owl.carousel', syncPosition1);

    sync2
        .on('initialized.owl.carousel', function() {
            sync2
                .find('.owl-item')
                .eq(0)
                .addClass('current');
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: false,
            nav: true,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100,
        })
        .on('changed.owl.carousel', syncPosition2);

    function syncPosition1(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        sync2
            .find('.owl-item')
            .removeClass('current')
            .eq(current)
            .addClass('current');
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2
            .find('.owl-item.active')
            .first()
            .index();
        var end = sync2
            .find('.owl-item.active')
            .last()
            .index();
        currentSlideModal = current
        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
        $('#sync3').trigger('to.owl.carousel',currentSlideModal )
        $('#sync4').trigger('to.owl.carousel',currentSlideModal )
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on('click', '.owl-item', function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });


    function resizeThumbnails(){
        $(window).resize(function() {
            if ($(window).width() > 991) {
                setItemHeight(sliderItem);
            } else {
                sliderItem.css({
                    height: 'auto',
                });
            }
        });
        $(window).trigger('resize');
    }
    resizeThumbnails()
}

function  setItemHeight(sliderItem) {
    var itemWidth = sliderItem.width();
    var itemHeight = itemWidth
    sliderItem.css({height: itemHeight+'px'})
}

function triggerResizeSlider() {
    var sync3 =  $('#sync3')
    var sync4 =  $('#sync4')
    sync3.trigger('to.owl.carousel',currentSlideModal )
    sync4.trigger('to.owl.carousel',currentSlideModal )
    setTimeout(function () {
        sync3.trigger('refresh.owl.carousel');
        sync4.trigger('refresh.owl.carousel');
        $(window).trigger('resize');
    },0)
    $(window).resize(function () {
        if(window.innerHeight < window.innerWidth && $(window).width() < 768){
           var sync3child= sync3.find('img.item')
            sync3child.css({height: window.innerHeight})
        }
    })
    $(window).trigger('resize');

}

function toolbarTransform(params) {
    var toolbarBg = $('.wrap-toolbar');
    var toolbarList = $('.toolbar');
    var menu = $('.wrap-menu');
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 150) {
            toolbarBg.css('background-color', '#fff');
            toolbarList.find('*').css('color', '#222');
        } else {
            toolbarBg.attr('style', '');
            toolbarList.attr('style', '');
            toolbarList.find('*').attr('style', '');

        }
    });
}