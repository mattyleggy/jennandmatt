var mobileWidth = 1200;

$(function(){
  var requiredImagesLoaded = 0;
  var requiredImages = [
    "images/leaf.png",
    "images/monogram.jpg",
  ]

  var siteImages = new MLLoadImages([
    "images/attire.png",
    "images/bg1.jpg",
    "images/bg2.jpg",
    "images/date.png",
    "images/leaves1.png",
    "images/leaves2.png",
    "images/leaves3.png",
    "images/map.png",
    "images/page1.png",
    "images/quirkydots.png",
    "images/respondby.png",
    "images/monogram.png",
    "images/speaker.png",
    "images/speaker-mute.png",
    "images/down-arrow.png"
  ]);

  for(i=0;i<$("#preload-images img").length;i++) {
    $("<img src='"+requiredImages[i]+"' />").on("load",function(){
      requiredImagesLoaded++;
      if (requiredImagesLoaded == $("#preload-images img").length) {
        var spanHTML = "";
        for (x=0;x<24;x++) {
          spanHTML += "<span></span>";
        }
        $("#circle-leaves").html(spanHTML);
        $("#svg-wrapper").fadeIn(200);
      }
    });
  }

  siteImages.loadImages(function(loadedPercent){
    //when an image has loaded, get current loaded percentage
    var leafCount = $("#circle-leaves").find("span").length;
    var loadedLeaves = leafCount*(loadedPercent/100);
    $("#circle-leaves").find("span:not(.loaded)").each(function(){
      var leafIndex = $(this).index();
      if (leafIndex <= loadedLeaves) {
        $(this).addClass("loaded");
      } else {
        return false;
      }
    });

    if (loadedPercent == 100) {
      setTimeout(function(){
        $("#splash-screen").css("overflow-y","hidden").fadeOut(500);
        $("html, body").animate({ scrollTop: "0" }, 0);
        setTimeout(function(){
          $("#front-page").fadeIn(2000);
          $("#front-leaves").fadeIn(2000);
        },500);
        $("body").css("overflow-y","auto");
        $("audio")[0].play();
      },0); //add in 1000 again when ready
    }
  });

  $.scrollToPosition = function(position) {
    $("html, body").animate({ scrollTop: position }, 1000);
    $("#next-page").addClass("disabled");
    setTimeout(function(){
      $("#next-page").removeClass("disabled");
    },800);
  }

  $.fn.getMiddleOffset = function() {
    return ($(this).offset().top - ($(window).outerHeight() / 2)) + ($(this).outerHeight() / 2);
  }

  $(window).scroll(function(e){
    checkSlideIn($(this).scrollTop());
  });

  $(window).resize(function(){
    if ($(this).outerWidth() > mobileWidth) {
      if (!$("#splash-screen").is(":visible") && !$("#front-page").is(":visible")) {
        $("#front-page").fadeIn(2000);
      }
    }
  });

  $(document).on("click","#volume-speaker",function(){
    $(this).toggleClass("volume-disabled");
    if ($(this).hasClass("volume-disabled")) {
      $("audio")[0].pause();
    } else {
      $("audio")[0].play();
    }
  });

  $(document).on("click","#next-page",function(){
    jumperLength = $(".jumper").length;
    if ($(".jumper.active").length && jumperLength == $("#page-content .jumper.active").index()) {
      lastJumper = $("#page-content .jumper:last-child");
      lastJumperHeight = lastJumper.outerHeight();
      lastJumperTop = lastJumper.offset().top;
      pageContentHeight = $("#page-content").outerHeight();
      windowHeight = $(window).outerHeight();
      scrollToPos = lastJumperTop - (windowHeight - lastJumperHeight);
      $.scrollToPosition(scrollToPos);
      $(".jumper.active").removeClass("active").next(".jumper").addClass("active");
    } else if ($(".jumper.active").length && jumperLength >= $("#page-content .jumper.active").index()) {
      $.scrollToPosition($(".jumper.active").removeClass("active").next(".jumper").addClass("active").getMiddleOffset());
    } else {
      $.scrollToPosition($($(".jumper")[0]).addClass("active").getMiddleOffset());
    }
  });

  //abc
});

function checkSlideIn(windowTop) {
  var windowHeight = $(window).outerHeight();
  var windowWidth = $(window).outerWidth();
  if (windowWidth > 1200) {
    var windowHeightTolerance = Math.floor(windowHeight/6.5);
    var tolerance = windowHeight/3;


    $(".slide-in").each(function(){
      var side = $(this).attr("side");
      var start = $(this).attr("position-start");
      var end = $(this).attr("position-end");
      var offsetTop = ($(this).offset().top - windowTop) + windowHeightTolerance;
      if (offsetTop < windowHeight) {
        if (offsetTop <= windowHeight && offsetTop >= 0) {
          var factor = Math.abs(offsetTop/tolerance)-2;
          if (factor < 0) { factor = 0; }
          var opacityFactor = 1 * factor;
          if (opacityFactor>1) { opacityFactor = 1; }
          var difference = Math.abs(start) - Math.abs(end);
          var position = Math.abs(end) + (difference * factor);

          if (side == "center") {
            //$(this).css("transform","translate(0,-"+((1-opacityFactor)*100)+"%)");
          } else {
            $(this).css(side,"-"+position+"%");
          }
          $(this).css("opacity",(1 - opacityFactor));
        } else if (offsetTop >= 0) {
          $(this).css("opacity","0");
        } else {
          $(this).css("opacity","1");
          if (side == "center") {
            //$(this).css("transform","scale(1)");
          } else {
            $(this).css(side,end+"%");
          }
        }
      } else {
        $(this).css(side,"-50%");
        $(this).css("opacity","0");
      }
    });
  }
}
