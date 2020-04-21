"use strict";

(function ($, window, document) {
  $(function () {
    function ThisIsWebP() {
      var def = $.Deferred(),
          crimg = new Image();

      crimg.onload = function () {
        def.resolve();
      };

      crimg.onerror = function () {
        def.reject();
      };

      crimg.src = "../../images/webp.webp";
      return def.promise();
    }

    ThisIsWebP().then(function () {
      $("body").addClass("js_is-webp");
    }, function () {
      $("body").addClass("js_isnt-webp");
    });
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  $(".benefits-block").each(function (index, item) {
    if ($(window).width() < 1366) {
      $(item).on("click", function () {
        if ($(item).hasClass("js_active-benefit")) {
          $(item).removeClass("js_active-benefit");
        } else {
          $(item).addClass("js_active-benefit");
        }
      });
    }
  });
  $(function () {});
})(window.jQuery, window, document);

(function ($, window, document) {
  $(function () {
    jQuery.fn.extend({
      disableSelection: function disableSelection() {
        this.each(function () {
          this.onselectstart = function () {
            return false;
          };

          this.unselectable = "on";
          jQuery(this).css("-moz-user-select", "none");
        });
      },
      enableSelection: function enableSelection() {
        this.each(function () {
          this.onselectstart = function () {};

          this.unselectable = "off";
          jQuery(this).css("-moz-user-select", "auto");
        });
      }
    }); // кроссбраузерный вызов

    $("body *").disableSelection(); //  Prevent default drag

    $("body img").on("dragstart", function (e) {
      e.preventDefault();
    });
  });
})(window.jQuery, window, document);

"use strict";

(function ($, window, document) {
  //  Get value from the inputs
  var name = $('input[name="name"]');
  var phone = $('input[name="phone"]'); //  validate Name

  function isValidName(name) {
    return /^([A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?){2,}/i.test(name);
  }

  function isValidPhone(phone) {
    return phone.split("").filter(function (i) {
      return !Number.isNaN(Number.parseInt(i));
    }).length >= 10;
  }

  var validate = function validate(input, validator) {
    var value = input.val();

    if (validator(value)) {
      input.removeClass("js-inValid");
      input.addClass("js-valid");
      return true;
    } else {
      input.removeClass("js-valid");
      input.addClass("js-inValid");
      return false;
    }
  };

  var addFieldValidation = function addFieldValidation(input, validator) {
    input.on("keyup", function () {
      if (validate(input, validator, true)) {
        if (input.val().length === 0) {
          input.removeClass("js-valid js-inValid");
        }
      }
    });
    input.on("blur", function () {
      validate(input, validator);

      if (input.val().length === 0) {
        input.removeClass("js-valid js-inValid");
      }
    });
  };

  $(function () {
    addFieldValidation(name, isValidName);
    addFieldValidation(phone, isValidPhone);
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  $(function () {
    $("input").each(function (index, item) {
      $(item).keyup(function () {
        var $input_name = $(item).attr("name");
        var $input_value = $(item).val();
        $("input[name=" + $input_name + "]").val($input_value);
      });
    });
    $(".input-check").each(function (index, item) {
      $(item).click(function () {
        if ($(item).attr("checked") === "checked") {
          $(".input-check").attr("checked", "checked");
        } else {
          $(".input-check").attr("checked", " ");
        }
      });
    });
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  $(function () {
    $(".gallery-nav li").click(function () {
      var $item_value = $(this).attr("data-gallery-nav");
      $(".gallery-nav li").removeClass("active");
      $(this).addClass("active");
      $(".gallery-slider li").addClass("js_hide").removeClass("js_show");

      if ($item_value === "residential") {
        $('.gallery-slider li[data-gallery-name="' + $item_value + '"]').removeClass("js_hide").addClass("js_show");
      } else if ($item_value === "commercial") {
        $('.gallery-slider li[data-gallery-name="' + $item_value + '"]').removeClass("js_hide").addClass("js_show");
      } else {
        $(".gallery-slider li").removeClass("js_hide");
      }
    });
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  $(function () {
    // var tok = "25308669721.1677ed0.8a7eee478fc24c1999cfdeee0006d028",
    var tok = "3891048528.1677ed0.6960f257b4a84f31947b7d1feadb67ee",
        // var tok = '7275792056.1677ed0.062fe0121d3c42619c886e5823c5131b',
    userid = 3891048528,
        kolichestvo = 12;
    $.ajax({
      url: "https://api.instagram.com/v1/users/" + userid + "/media/recent",
      dataType: "jsonp",
      type: "GET",
      data: {
        access_token: tok,
        count: kolichestvo
      },
      success: function success(result) {
        // console.log(result);
        for (kolichestvo in result.data) {
          $(".instagram-media").append('<li><img alt="Image_from_instagram" loading="lazy" src="' + result.data[kolichestvo].images.standard_resolution.url + '"></li>'); // result.data[x].images.thumbnail.url - URL картинки 150х150
          // result.data[x].images.standard_resolution.url - URL картинки 612х612
          // result.data[x].link - URL страницы данного поста в Инстаграм
        }
      },
      error: function error(result) {
        console.log(result);
      }
    });
  });
})(window.jQuery, window, document); // (function ($, window, document) {
//     function preventDefault(e) {
//         e.preventDefault();
//     }
//     function disableScroll() {
//         document.body.addEventListener('touchmove', preventDefault, {passive: false});
//     }
//     function enableScroll() {
//         document.body.removeEventListener('touchmove', preventDefault, {passive: false});
//     }
//     $(() => {
//         // $('body').on('click', function(){
//         //     if ($('body').hasClass('fancybox-active')) {
//         //         $('body').removeClass('js_no-scroll');
//         //     }
//         // })
//         // $('.js_popup').click(function(){
//         //     $('body').addClass('js_no-scroll');
//         // })
//     });
// }(window.jQuery, window, document));


(function ($, window, document) {
  $(function () {
    var pic = new Image();
    var pic2 = new Image();
    var pic3 = new Image();
    var pic4 = new Image();
    pic.src = "../../images/header/header-bg-2.jpg";
    pic2.src = "../../images/header/header-bg-3.jpg";
    pic3.src = "../../images/header/header-bg-4.jpg";
    pic4.src = "../../images/header/header-bg-5.jpg";
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  $("body").on("click", "a.js_scroll", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault(); //забираем идентификатор бока с атрибута href

    var id = $(this).attr("href"),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
    top = $(id).offset().top - $(".header-top").height(); //анимируем переход на расстояние - top за 1500 мс

    $("body,html").animate({
      scrollTop: top
    }, 700);
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".header-top").addClass("js-fixed-menu");
    } else {
      $(".header-top").removeClass("js-fixed-menu");
    }
  });
  $(function () {});
})(window.jQuery, window, document);

(function ($, window, document) {
  $(".sequence-nav li").click(function () {
    var $item_value = $(".sequence-nav li").index(this);
    $(".sequence-nav li").removeClass("js_active");
    $(".sequence-tabs li").addClass("js_hide").removeClass("js_show");
    $(".sequence-nav li:eq(" + $item_value + ")").addClass("js_active");
    $(".sequence-tabs li:eq(" + $item_value + ")").addClass("js_show").removeClass("js_hide");
  });
  $(function () {});
})(window.jQuery, window, document);

(function ($, window, document) {
  $(".services-block").each(function (index, item) {
    if ($(window).width() < 1366) {
      $(item).on("click", function (e) {
        if ($(item).hasClass('js_hover-animation')) {
          $(item).removeClass("js_hover-animation");
          $(".services-blocks").removeClass("js_hover-animation-bg");
        } else {
          $('.services-block').removeClass("js_hover-animation");
          $(item).addClass("js_hover-animation");
          $(".services-blocks").addClass("js_hover-animation-bg");
        }
      });
    } else {
      $(item).on("mouseenter", function () {
        $(item).toggleClass("js_hover-animation");
        $(".services-blocks").addClass("js_hover-animation-bg");
      });
      $(item).on("mouseleave", function () {
        $(".services-block").removeClass("js_hover-animation");
        $(".services-blocks").removeClass("js_hover-animation-bg");
      });
    }
  });
  $(function () {});
})(window.jQuery, window, document);

(function ($, window, document) {
  $(function () {
    $(".slick-slider").slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 2,
      adaptiveHeight: true,
      lazyLoad: "progressive",
      responsive: [{
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }]
    });
    $(".achievements-content").slick({
      infinite: true,
      dots: true,
      arrows: true
    });
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  $("video").each(function (index, item) {
    $(item).on("playing", function () {
      $(".aboutUs").addClass("js_active-video");
    });
    $(item).on("pause", function () {
      $(".aboutUs").removeClass("js_active-video");
    });
  });
  $(function () {
    var players = Array.from(document.querySelectorAll(".js-player")).map(function (p) {
      return new Plyr(p, {
        fullscreen: {
          enabled: false
        }
      });
    });
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  if ($('body').hasClass('js-main-page')) {
    var start_lazy_map = function start_lazy_map() {
      if (!map_loaded) {
        var map_block = document.getElementById("map_lazy");
        map_loaded = true;
        map_block.setAttribute("src", map_block.getAttribute("data-src"));
        map_block.removeAttribute("data_src");
      }
    };

    var map_container = document.getElementById("map");
    var options_map = {
      once: true,
      //once start, thereafter destroy listener
      passive: true,
      capture: true
    };
    map_container.addEventListener("click", start_lazy_map, options_map);
    map_container.addEventListener("mouseover", start_lazy_map, options_map);
    map_container.addEventListener("touchstart", start_lazy_map, options_map);
    map_container.addEventListener("touchmove", start_lazy_map, options_map);
    var map_loaded = false;
  }

  $(function () {});
})(window.jQuery, window, document);

(function ($, window, document) {
  $(function () {
    $("head").prepend("<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css\" />");
    $("head").prepend("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css\" />");
    $("head").prepend("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css\" />");
    $("head").prepend("<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Raleway:300,500|Playfair+Display:400,600,700,900&display=swap&subset=latin-ext\" />");
  });
})(window.jQuery, window, document);

(function ($, window, document) {
  $(function () {
    $("body").css("opacity", 1);
    $("a").css("transition", "all .3s ease");
    $(".lazy").Lazy({
      threshold: 1200
    });
  });
})(window.jQuery, window, document);
//# sourceMappingURL=custom.js.map
