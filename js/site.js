var images = [
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
];

var loadedImages = 0;

function preloadImages(images) {
  for (i=0;i<images.length;i++) {
    $(document).on("load","<img src='"+images[i]+"' />",function(){
      console.log()
    });
  }
}

$(document).ready(function(){
  preloadImages();
  alert('a');
});


//show the leaves for the background
function showLeaves() {
  //$(".triangle").attr("style","left: 50%; top: 50%"); //clear delay
  //$("#triangles").attr("style","transform: matrix3d(0.995668, 0, -0.0929788, 0, -0.0149777, 0.98694, -0.160389, 0, 0.0917645, 0.161087, 0.982665, 0, 0, -0.005, 0, 1)");
  var leafArray = [];
  //var randomLeaves = Math.ceil(Math.random()*5)+0;
  var speedArray = [2200,2800,2900,3300,3900,4300];
  var scaleArray = [1.5,1.3,1.1,1,0.8,0.6];
  var animations = ["falling","fallingReverse","falling1","fallingReverse1","falling2","fallingReverse2"];
  for (i=0; i < 10; i++) {
    randomLeaf = Math.floor(Math.random()*2);
    randomIndex = Math.floor(Math.random()*6);
    randomLeft = Math.floor(Math.random()*100);
    randomDelay = Math.floor(Math.random()*3000);
    randomAnimationIndex = Math.floor(Math.random()*animations.length);
    leafArray.push("<div class='leaves leaf-"+randomLeaf+"' style='animation: "+speedArray[randomIndex]+"ms linear "+animations[randomIndex]+" infinite; animation-delay: "+randomDelay+"ms;  left: "+randomLeft+"%;'></div>");
  }

  leafArray = leafArray.join('');
  $("#leaves").html(leafArray);
}
