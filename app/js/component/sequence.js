(function($, window, document) {

  $(".sequence-nav li").click(function() {
    let $item_value = $(".sequence-nav li").index(this);
    $(".sequence-nav li").removeClass("js_active");
    $(".sequence-tabs li")
      .addClass("js_hide")
      .removeClass("js_show");

    $(".sequence-nav li:eq(" + $item_value + ")").addClass("js_active");
    $(".sequence-tabs li:eq(" + $item_value + ")")
      .addClass("js_show")
      .removeClass("js_hide");
  });

  $(() => {
    
  });
})(window.jQuery, window, document);
