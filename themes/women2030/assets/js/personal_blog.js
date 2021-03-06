"use strict";

(function ($, window, Drupal, drupalSettings) {

  Drupal.Women = Drupal.Women || {};


  Drupal.behaviors.zircon = {
    attach: function (context, settings) {

      $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
      });

      $('.btn-btt').smoothScroll({
        speed: 1000
      });

      if ($("#search-block-form [name='keys']").val() === "") {
        $("#search-block-form input[name='keys']").val(Drupal.t("Keywords"));
      }

      $("#search-block-form input[name='keys']").focus(function () {
        if ($(this).val() === Drupal.t("Keywords")) {
          $(this).val("");
        }
      }).blur(function () {
        if ($(this).val() === "") {
          $(this).val(Drupal.t("Keywords"));
        }
      });

      $(window).scroll(function () {
        if ($(window).scrollTop() > 200) {
          $('.btn-btt').show();
        } else {
          $('.btn-btt').hide();
        }
      }).resize(function () {
        if ($(window).scrollTop() > 200) {
          $('.btn-btt').show();
        } else {
          $('.btn-btt').hide();
        }
      });

      Drupal.Women.matchHeight();
      Drupal.Women.mobileMenu();


      if ($('html').attr('dir') == 'rtl') {
        $('.carousel-responsive').slick({
          dots: false,
          infinite: true,
          speed: 1000,
          slidesToShow: 4,
          slidesToScroll: 4,
          rtl: true,

          responsive: [{
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            }, {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            }, {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }]
        });
      }

      var base_path = drupalSettings.path.baseUrl;
      fixImageSources();

      function fixImageSources() {
        (jQuery)('img').each(function (i, e) {
          var self = (jQuery)(this);
          var src = self.attr('src');
          if (src.indexOf('/sites/default') > 0) {
            var tmphref = src.split('sites/default')[0];
            src = src.replace(tmphref, base_path);
            self.attr('src', src);
          }
        });
      }
    }
  };

  Drupal.Women.mobileMenu = function () {
    $('#btn-main-menu').mobileMenu();
    var $wd = $(window).width();
    if ($wd < 991) {
      $('.block-social-media-links-block').appendTo('.mobile-main-menu');
      $('#block-searchapipagesearchblockform').appendTo('.mobile-main-menu');
      var $langs = $('#block-languageswitcher');
      $langs.appendTo('#header .container');
      $('#block-languageswitcher a[hreflang="en"]').text('en');
      $('#block-languageswitcher a[hreflang="ar"]').text('ع');
      $langs.remove();
    }
  }

  Drupal.Women.matchHeight = function () {
    /* console.log('hello');*/
    var maxHeight = 0;
    $('.gallery-list .view-row .views-col .views-field-title').each(function () {
      if ($(this).outerHeight() > maxHeight) {
        maxHeight = $(this).outerHeight();
      }
    });
    /*console.log(maxHeight);*/
    $('.gallery-list .view-row .views-col .views-field-title').css('height', maxHeight);

    $('.view-featured .views-field-title .field-content').matchHeight();
  };

})(jQuery, this, Drupal, drupalSettings);