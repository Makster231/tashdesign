(function ($, window, document) {
  $(".services-block").each(function(index, item) {
    if ($(window).width() < 1366) {
      $(item).on("click", function(e) {
        if ($(item).hasClass('js_hover-animation')) {
          $(item).removeClass("js_hover-animation");
          $(".services-blocks").removeClass("js_hover-animation-bg");
        } else {
          $('.services-block').removeClass("js_hover-animation");
          $(item).addClass("js_hover-animation");
          $(".services-blocks").addClass("js_hover-animation-bg");
        }
      });
    }else{
      $(item).on("mouseenter", function() {
        $(item).toggleClass("js_hover-animation");
        $(".services-blocks").addClass("js_hover-animation-bg");
      });
      $(item).on("mouseleave", function() {
        $(".services-block").removeClass("js_hover-animation");
        $(".services-blocks").removeClass("js_hover-animation-bg");
      });
    }
  });

  $(() => {
    
  });
})(window.jQuery, window, document);
