(function($, window, document) {
  $("body").on("click", "a.js_scroll", function(event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr("href"),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top - $(".header-top").height();

    //анимируем переход на расстояние - top за 1500 мс
    $("body,html").animate({ scrollTop: top }, 700);
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".header-top").addClass("js-fixed-menu");
    } else {
      $(".header-top").removeClass("js-fixed-menu");
    }
  });

  $(() => {});
})(window.jQuery, window, document);
