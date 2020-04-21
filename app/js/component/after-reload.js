(function($, window, document) {
  $(() => {
    $("head").prepend(
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css" />`
    );

    $("head").prepend(
      `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css" />`
    );

    $("head").prepend(
      `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css" />`
    );

    $("head").prepend(
      `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:300,500|Playfair+Display:400,600,700,900&display=swap&subset=latin-ext" />`
    );
  });
})(window.jQuery, window, document);
