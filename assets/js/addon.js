(function ($) {

  "use strict";
  /* ---------------------------------------------
    CountDown
    --------------------------------------------- */


  function addZero(your_number, length) {
    var num = '' + your_number;
    while (num.length < length) {
      num = '0' + num;
    }
    return num;
  }

  /* ---------------------------------------------

  Navigation menu

  --------------------------------------------- */

  // dropdown for mobile

  $(document).ready(function () {


  });

  // accordion script starts
  var Shadepro_Accordion = function ($scope, $) {
    var accordionTitle = $scope.find('.shadepro-accordion-title');

    var accmin = $scope.find('.shadepro-accordion-single-item');

    accmin.each(function () {
      if ($(this).hasClass('yes')) {
        $(this).addClass('wraper-active');
      }
    });

    accordionTitle.each(function () {
      if ($(this).hasClass('active-default')) {
        $(this).addClass('active');
        $(this).next('.shadepro-accordion-content').slideDown();
      }
    });

    // Remove multiple click event for nested accordion
    accordionTitle.unbind('click');

    //$accordionWrapper.children('.shadepro-accordion-content').first().show();
    accordionTitle.click(function (e) {
      e.preventDefault();

      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).next().slideUp(400);
        $(this).parent().removeClass('wraper-active');

      } else {
        $(this).parent().parent().find('.shadepro-accordion-title').removeClass('active');

        accmin.removeClass('wraper-active');

        $(this).parent('.yes').removeClass('wraper-active');

        $(this).parent().parent().find('.shadepro-accordion-content').slideUp(400);

        $(this).parent().addClass('wraper-active');

        $(this).toggleClass('active');
        $(this).next().slideToggle(400);

      }
    });
  }
  //portfolio js start
  var Shadepro_Portfolio_Gallery_Js = function () {

    if ($.fn.isotope) {
      var $gridMas = $('.shadepro-pf-gallery-wrap.layout-mode-masonry');

      $gridMas.isotope({
        itemSelector: '.shadepro-pf-gallery-wrap .shadepro-portfolio-item-wrap',
        percentPosition: true,
        layoutMode: 'packery',
      }).resize();

      $gridMas.imagesLoaded().progress(function () {
        $gridMas.isotope({
          itemSelector: '.shadepro-pf-gallery-wrap .shadepro-portfolio-item-wrap',
          percentPosition: true,
          layoutMode: 'packery',

        }).resize()
      });

    }

  }
  //portfolio js start
  var Shadepro_Portfolio_Js = function () {

    if ($.fn.isotope) {
      var $gridMas = $('.shadepro-portfolio-wrap.layout-mode-masonry');
      var $grid = $('.shadepro-portfolio-wrap.layout-mode-normal');

      $grid.isotope({
        itemSelector: '.shadepro-portfolio-item-wrap',
        percentPosition: true,
        layoutMode: 'fitRows',
      })

      $grid.imagesLoaded().progress(function () {
        $grid.isotope({
          itemSelector: '.shadepro-portfolio-item-wrap',
          percentPosition: true,
          layoutMode: 'fitRows',

        })
      });

      $gridMas.isotope({
        itemSelector: '.shadepro-portfolio-item-wrap',
        percentPosition: true,
        layoutMode: 'packery',
      })

      $gridMas.imagesLoaded().progress(function () {
        $gridMas.isotope({
          itemSelector: '.shadepro-portfolio-item-wrap',
          percentPosition: true,
          layoutMode: 'packery',

        }).resize()
      });


      $(".pf-isotope-nav li").on('click', function () {
        $(".pf-isotope-nav li").removeClass("active");
        $(this).addClass("active");

        var selector = $(this).attr("data-filter");
        $gridMas.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          }
        }).resize();

      });


      $(".pf-isotope-nav li").on('click', function () {
        $(".pf-isotope-nav li").removeClass("active");
        $(this).addClass("active");

        var selector = $(this).attr("data-filter");
        $grid.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          }
        }).resize();

      });
    }

    // comment load more button click event
    $('.shadepro-pf-loadmore-btn').on('click', function () {
      var button = $(this);

      // decrease the current comment page value
      var dpaged = button.data('paged'),
        total_pages = button.data('total-page'),
        nonce = button.data('referrar'),
        ajaxurl = button.data('url');

      dpaged++;
      // console.log(foio_portfolio_js_datas);
      $.ajax({
        url: ajaxurl, // AJAX handler, declared before
        dataType: 'html',
        data: {
          'action': 'shadepro_loadmore_callback', // wp_ajax_cloadmore
          // 'post_id': foio_portfolio_js_datas.parent_post_id, // the current post
          'paged': dpaged, // current comment page
          'folio_nonce': nonce,
          'portfolio_settings': button.data('portfolio-settings'),
        },
        type: 'POST',
        beforeSend: function (xhr) {
          button.text('Loading...'); // preloader here
        },
        success: function (data) {
          if (data) {
            $('.shadepro-portfolio-wrap').append(data);
            $('.shadepro-portfolio-wrap').isotope('reloadItems').isotope()
            button.text('More Portfolios');
            button.data('paged', dpaged);
            // if the last page, remove the button
            if (total_pages == dpaged)
              button.remove();
          } else {
            button.remove();
          }
        }
      });
      return false;
    });

  }
  //end portfolio js




  $(window).load(function () {

    var cPriceHeadHeight = $('.pricing-style-classic .shadepro-price-wrap').height();
    var mPriceHeadHeight = $('.pricing-style-minimal .shadepro-price-wrap').height();

    $('.pricing-style-classic .shadepro-pricing-head-filler').css("height", cPriceHeadHeight + "px");
    $('.pricing-style-minimal .shadepro-pricing-head-filler').css("height", mPriceHeadHeight + "px");

  })

  /*   function countDown() {
      var second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

      var shadeproDate = $(".shadepro-countdown#date").data("date");
      var countDown = new Date(shadeproDate).getTime(),
        x =  setInterval(function () {

          var now = new Date().getTime(),
            distance = countDown - now;
          var cDays = document.getElementById("days");
          if (cDays) {
            (document.getElementById("days").innerHTML = addZero(Math.floor(distance / day)),
              (document.getElementById("hours").innerHTML = addZero(Math.floor(
                (distance % day) / hour
              ), 2))),

            (document.getElementById("minutes").innerHTML = addZero(Math.floor(
              (distance % hour) / minute
            ), 2)),
            (document.getElementById("seconds").innerHTML = addZero(Math.floor(
              (distance % minute) / second
            ), 2));
          }
        }, second);

        
    } */

  function makeTimer() {

    var shadeproDate = $(".shadepro-countdown#date").data("date");
    var endTime = new Date(shadeproDate);
    endTime = (Date.parse(endTime) / 1000);

    var now = new Date();
    now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (hours < "10") {
      hours = "0" + hours;
    }
    if (minutes < "10") {
      minutes = "0" + minutes;
    }
    if (seconds < "10") {
      seconds = "0" + seconds;
    }

    $("#days").html(days);
    $("#hours").html(hours);
    $("#minutes").html(minutes);
    $("#seconds").html(seconds);

  }



  var ShadeProCountDown = function () {
    setInterval(function () {
      makeTimer();
    }, 1000);
  }

  var ShadePricingTable = function () {

    $("[data-pricing-trigger]").on("click", function (e) {
      $(e.target).toggleClass("active");
      var target = $(e.target).attr("data-target");
      if ($(target).attr("data-value-active") == "monthly") {
        $(target).attr("data-value-active", "yearly");
      } else {
        $(target).attr("data-value-active", "monthly");
      }
    })

    // Classic tab switcher
    $("[data-pricing-tab-trigger]").on("click", function (e) {
      $('[data-pricing-tab-trigger]').removeClass("active");
      $(this).addClass("active");
      var target = $(e.target).attr("data-target");
      if ($(target).attr("data-value-active") == "monthly") {
        $(target).attr("data-value-active", "yearly");
      } else {
        $(target).attr("data-value-active", "monthly");
      }
    })

  }

  var ShadeProductCategories = function () {

    if ($.fn.isotope) {
      var $gridMas = $('.product-categories-wrap.masonry');

      $gridMas.isotope({
        itemSelector: '.shade-product-cat-wrap',
        percentPosition: true,
        layoutMode: 'packery',
      })

      $gridMas.imagesLoaded().progress(function () {
        $gridMas.isotope({
          itemSelector: '.shade-product-cat-wrap',
          percentPosition: true,
          layoutMode: 'packery',

        })
      });
    }
  }

  var ShadePostLoop = function () {
    if ($.fn.isotope) {

      $('.shade-post-widget-area.masonry').isotope({
        itemSelector: '.shade-post-widget-area.masonry>div',
        percentPosition: true,
        layoutMode: 'packery',
      })

    }
  }

  var ShadeJobLoop = function () {
    if ($.fn.owlCarousel) {
      $('.shade-job-carousel').owlCarousel({
        margin: 30,
        responsiveClass: true,
        navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],
        responsive: {
          0: {
            items: 1,
            nav: true
          },
          768: {
            items: 2,
            nav: false
          },
          1000: {
            items: 4,
            nav: true,
            loop: false
          }
        }
      })
    }
  }

  //sakib testimonial
  var ShadeTestimonialCarousel = function ($scope, $) {
    var twraper = $scope.find(".shadepro--tcarousel");
    var settings = twraper.data('settings'),
      rtl = $('body').hasClass('rtl') ? true : false;
    if ($.fn.owlCarousel) {
      $('.shadepro--tcarousel').owlCarousel({
        rtl: rtl,
        margin: settings['margin'],
        responsiveClass: true,
        loop: settings['loop'],
        dots: settings['dots'],
        nav: settings['nav'],
        autoplay: settings['autoplay'],
        items: settings['tes_per_coulmn'],
        autoplaytimeout: settings['autoplaytimeout'],
        navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
        responsive: {
          0: {
            items: settings['tes_per_coulmn_mobile'],
          },
          600: {
            items: settings['tes_per_coulmn_tablet'],
          },

          768: {
            items: settings['tes_per_coulmn_tablet'],
          },
          1000: {
            items: settings['tes_per_coulmn'],
          }
        }
      })
    }
  }

  //sakib testimonial
  var ShadeImageCarousel = function ($scope, $) {
    var twraper = $scope.find(".shadepro-image-carousel");
    var settings = twraper.data('settings'),
      rtl = $('body').hasClass('rtl') ? true : false;

    $('.shadepro-image-carousel').slick({
      infinite: settings['loop'],
      rtl: rtl,
      slidesToShow: 3,
      autoplay: settings['autoplay'],
      autoplaySpeed: settings['autoplaytimeout'],
      slidesToScroll: 1,
      dots: settings['dots'],
      arrows: settings['nav'],
      centerMode: true,
      centerPadding: '350px',
      prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></i></button>',
      responsive: [{
          breakpoint: 1800,
          settings: {
            slidesToShow: 3,
            centerPadding: '200px',

          }
        },
        {
          breakpoint: 1670,
          settings: {
            slidesToShow: 3,
            centerPadding: '250px',

          }
        },
        {
          breakpoint: 1640,
          settings: {
            slidesToShow: 3,
            centerPadding: '200px',

          }
        },
        {
          breakpoint: 1550,
          settings: {
            slidesToShow: 3,
            centerPadding: '170px',

          }
        },
        {
          breakpoint: 1450,
          settings: {
            slidesToShow: 3,
            centerPadding: '180px',

          }
        },
        {
          breakpoint: 1350,
          settings: {
            slidesToShow: 3,
            centerPadding: '100px',

          }
        },
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 3,
            centerPadding: '50px',

          }
        },
        {
          breakpoint: 1150,
          settings: {
            slidesToShow: 3,
            centerPadding: '0px',

          }
        },
        {
          breakpoint: 1050,
          settings: {
            slidesToShow: 1,
            centerPadding: '300px',

          }
        },
        {
          breakpoint: 950,
          settings: {
            slidesToShow: 1,
            centerPadding: '250px',

          }
        },
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 1,
            centerPadding: '200px',
          }
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 1,
            centerPadding: '150px',
          }
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 1,
            centerPadding: '100px',
          }
        },
        {
          breakpoint: 515,
          settings: {
            slidesToShow: 1,
            autoplay: true,
            centerPadding: '0px',
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            autoplay: true,
            centerPadding: '0px',
            arrows: false,
          }
        }

      ]
    });
  }


  //sakib tab 
  var shadeproTab = function ($scope, $) {
    $('ul.tabs li').on('click', function () {
      var tab_id = $(this).attr('data-tab');

      $('ul.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');

      $(this).addClass('current');
      $("#" + tab_id).addClass('current');
    })
  };

  //Main menu
  var ShadeProMainMenu = function ($scope, $) {

    $('.shadepro-mega-menu').closest('.elementor-container').addClass('megamenu-full-container');
    var count = 0;
    $(".main-navigation ul.navbar-nav>li.shadepro-mega-menu>.sub-menu>li").each(function (index) {
      count++;
      if ($(this).is('li:last-child')) {
        $(this).parent().addClass('mg-column-' + count);
        count = 0;
      }
    });

  };

  var ShadeCowWOrkingSearch = function ($scope, $) {
    if ($.fn.datepicker) {
      $('#coworking-date').datepicker();
    }

    if ($.fn.niceSelect) {
      $('select').niceSelect();
    }

  }


  var ShadeproGlobal = function ($scope, $) {

    if ($scope.hasClass('shadepro-sticky-yes')) {
      var current_widget = $scope;
      current_widget.wrap('<div class="sticky-wrapper"></div>');
      var headerHeight = $(current_widget).parent('.sticky-wrapper').height(),
        stickyWrapper = $(current_widget).parent('.sticky-wrapper');
      stickyWrapper.css('height', headerHeight + "px")
      window.onscroll = function () {
        scrollFunction()
      };

      function scrollFunction() {

        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          if ($scope.hasClass('shadepro-sticky-yes')) {
            stickyWrapper.addClass("is-sticky");
            console.log(stickyWrapper);
          }
        } else {
          if ($scope.hasClass('shadepro-sticky-yes')) {
            stickyWrapper.removeClass("is-sticky");
          }
        }
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
          if ($scope.hasClass('shadepro-sticky-yes')) {
            $scope.addClass("reveal-sticky");
          }
        } else {
          if ($scope.hasClass('shadepro-sticky-yes')) {
            $scope.removeClass("reveal-sticky");
          }
        }

      }

    }

    // Watch the changes of spacing control
    var current_gr = $scope.attr('class');
    current_gr = "." + current_gr.split(' ').join('.');
    current_gr += " .shadepro-gradient-canvas";

    if ($scope.hasClass('shadepro-adv-gradient-yes')) {

      $scope.prepend('<canvas class="shadepro-gradient-canvas" data-js-darken-top data-transition-in><canvas>');

      var gradient = new Gradient();
      gradient.initGradient(current_gr);

    }

    if (typeof (elementor) !== 'undefined') {

      elementor.channels.editor.on('change', function (view) {
        let changed = view.elementSettingsModel.changed;

        if ($scope.hasClass('shadepro-adv-gradient-yes')) {

          if ($scope.find(".shadepro-gradient-canvas").length == 0) {
            $scope.prepend('<canvas class="shadepro-gradient-canvas" data-js-darken-top data-transition-in><canvas>');
          }

          if ($scope.find(".shadepro-gradient-canvas").length > 0) {
            var gradient = new Gradient();
            gradient.initGradient(current_gr);
          }
        } else {
          if ($scope.find(".shadepro-gradient-canvas").length > 0) {
            $scope.find(".shadepro-gradient-canvas").remove();
          }
        }


        // for accordion 
        $('.shadepro-disable-default-yes .elementor-accordion-item').find('.elementor-active').removeClass('elementor-active');
        $('.shadepro-disable-default-yes .elementor-accordion-item').find('.elementor-tab-content').removeAttr('style');

      });
    }


    $('.shadepro-disable-default-yes .elementor-accordion-item').find('.elementor-active').removeClass('elementor-active');
    $('.shadepro-disable-default-yes .elementor-accordion-item').find('.elementor-tab-content').removeAttr('style');

  }

  $(window).on("elementor/frontend/init", function () {

    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-accordion.default", Shadepro_Accordion);
    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-product-categories.default", ShadeProductCategories);
    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-price-table.default", ShadePricingTable);
    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-job-loop.default", ShadeJobLoop);
    elementorFrontend.hooks.addAction("frontend/element_ready/blog-loop.default", ShadePostLoop);
    elementorFrontend.hooks.addAction("frontend/element_ready/testimonial-sahde-pro.default", ShadeTestimonialCarousel);
    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-image-carousel.default", ShadeImageCarousel);
    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-tab.default", shadeproTab);
    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-countdown.default", ShadeProCountDown);
    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-portfolio.default", Shadepro_Portfolio_Js);
    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-portfolio-gallery.default", Shadepro_Portfolio_Gallery_Js);
    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-main-menu.default", ShadeProMainMenu);
    elementorFrontend.hooks.addAction("frontend/element_ready/shadepro-main-menu.default", ShadeCowWOrkingSearch);
    elementorFrontend.hooks.addAction("frontend/element_ready/global", ShadeproGlobal);

  });

})(jQuery);