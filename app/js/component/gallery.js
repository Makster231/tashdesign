(function($, window, document) {
  $(() => {
    $(".gallery-nav li").click(function() {
      let $item_value = $(this).attr("data-gallery-nav");
      $(".gallery-nav li").removeClass("active");
      $(this).addClass("active");
      $(".gallery-slider li")
        .addClass("js_hide")
        .removeClass("js_show");

      if ($item_value === "residential") {
        $('.gallery-slider li[data-gallery-name="' + $item_value + '"]')
          .removeClass("js_hide")
          .addClass("js_show");
      } else if ($item_value === "commercial") {
        $('.gallery-slider li[data-gallery-name="' + $item_value + '"]')
          .removeClass("js_hide")
          .addClass("js_show");
      } else {
        $(".gallery-slider li").removeClass("js_hide");
      }
    });
  });
})(window.jQuery, window, document);
