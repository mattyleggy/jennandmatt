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
    "images/respondby.png"
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
      $("#svg-wrapper").addClass("no-pulsate");
      setTimeout(function(){
        $("#splash-screen").fadeOut(500);
        $("audio")[0].play();
      },1000);
    }
  });
});
