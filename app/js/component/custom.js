(function($, window, document) {
  $(() => {
    $("body").css("opacity", 1);

    $("a").css("transition", "all .3s ease");

    $(".lazy").Lazy({
      threshold: 1200
    });
  });
})(window.jQuery, window, document);
