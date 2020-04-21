(function($, window, document) {
  $(() => {
    $(".slick-slider").slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 2,
      adaptiveHeight: true,
      lazyLoad: "progressive",
      responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    });

    $(".achievements-content").slick({
      infinite: true,
      dots: true,
      arrows: true,
    });
  });
})(window.jQuery, window, document);
