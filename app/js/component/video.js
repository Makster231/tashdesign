(function($, window, document) {

  $("video").each(function(index, item) {
    $(item).on("playing", function() {
      $(".aboutUs").addClass("js_active-video");
    });

    $(item).on("pause", function() {
      $(".aboutUs").removeClass("js_active-video");
    });
  });

  $(() => {
    const players = Array.from(document.querySelectorAll(".js-player")).map(
      p => new Plyr(p, { fullscreen: { enabled: false } })
    );
  });
})(window.jQuery, window, document);
