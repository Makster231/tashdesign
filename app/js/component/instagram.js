(function($, window, document) {
  $(() => {
    // var tok = "25308669721.1677ed0.8a7eee478fc24c1999cfdeee0006d028",
    var tok = "3891048528.1677ed0.6960f257b4a84f31947b7d1feadb67ee",
      // var tok = '7275792056.1677ed0.062fe0121d3c42619c886e5823c5131b',
      userid = 3891048528,
      kolichestvo = 12;

    $.ajax({
      url: "https://api.instagram.com/v1/users/" + userid + "/media/recent",
      dataType: "jsonp",
      type: "GET",
      data: { access_token: tok, count: kolichestvo },
      success: function(result) {
        // console.log(result);
        for (kolichestvo in result.data) {
          $(".instagram-media").append(
            '<li><img alt="Image_from_instagram" loading="lazy" src="' +
              result.data[kolichestvo].images.standard_resolution.url +
              '"></li>'
          );
          // result.data[x].images.thumbnail.url - URL картинки 150х150
          // result.data[x].images.standard_resolution.url - URL картинки 612х612
          // result.data[x].link - URL страницы данного поста в Инстаграм
        }
      },
      error: function(result) {
        console.log(result);
      }
    });
  });
})(window.jQuery, window, document);
