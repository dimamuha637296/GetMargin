$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        navText: ["", ""]
    });

    $(".home-range").ionRangeSlider({
        min: 1,
        max: 1000,
        from: 200,
        step: 1,
        to: 1000,
        skin: "big",
        hide_min_max: false,
        onStart: function (data) {
            // data.slider.closest(".modal-rate").find('.views-span').text(data.from);
        }
    });
    $("select").chosen({
        disable_search: true,
        max_selected_options: 1
    });

    $(".homeTabs button").on('click', function () {
        if (!($(this).hasClass("active"))) {
            $(this).addClass("active").siblings().removeClass("active");
        }
    });

    $(".openTextBtn").on('click', function () {
        $(this).closest($(".container")).find($("[hidden]")).removeAttr("hidden");
        $(this).css('display', 'none');
    });
});


