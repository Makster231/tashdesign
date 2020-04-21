(function($, window, document) {
  $(() => {
    jQuery.fn.extend({
      disableSelection: function() {
        this.each(function() {
          this.onselectstart = function() {
            return false;
          };
          this.unselectable = "on";
          jQuery(this).css("-moz-user-select", "none");
        });
      },
      enableSelection: function() {
        this.each(function() {
          this.onselectstart = function() {};
          this.unselectable = "off";
          jQuery(this).css("-moz-user-select", "auto");
        });
      }
    });

    // кроссбраузерный вызов
    $("body *").disableSelection();

    //  Prevent default drag
    $("body img").on("dragstart", function(e) {
      e.preventDefault();
    });
  });
})(window.jQuery, window, document);
