(function($, window, document) {
  $(() => {
    $("input").each(function(index, item) {
      $(item).keyup(function() {
        let $input_name = $(item).attr("name");
        let $input_value = $(item).val();

        $("input[name=" + $input_name + "]").val($input_value);
      });
    });

    $(".input-check").each(function(index, item) {
      $(item).click(function() {
        if ($(item).attr("checked") === "checked") {
          $(".input-check").attr("checked", "checked");
        } else {
          $(".input-check").attr("checked", " ");
        }
      });
    });
  });
})(window.jQuery, window, document);
