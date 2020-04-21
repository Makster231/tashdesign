(function($, window, document) {
  $(() => {
    function ThisIsWebP() {
      var def = $.Deferred(),
        crimg = new Image();
      crimg.onload = function() {
        def.resolve();
      };
      crimg.onerror = function() {
        def.reject();
      };
      crimg.src = "../../images/webp.webp";
      return def.promise();
    }

    ThisIsWebP().then(
      function() {
        $("body").addClass("js_is-webp");
      },
      function() {
        $("body").addClass("js_isnt-webp");
      }
    );
  });
})(window.jQuery, window, document);
