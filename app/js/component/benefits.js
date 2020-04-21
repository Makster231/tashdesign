(function($, window, document) {
  $(".benefits-block").each(function(index, item) {
    if ($(window).width() < 1366) {
      $(item).on("click", function() {
        if ($(item).hasClass("js_active-benefit")) {
          $(item).removeClass("js_active-benefit");
        } else {
          $(item).addClass("js_active-benefit");
        }
      });
    }
  });

  $(() => {});
})(window.jQuery, window, document);

