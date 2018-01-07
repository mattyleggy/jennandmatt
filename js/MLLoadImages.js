/*
 * MLLoadImages written by Matthew Lord
 * Last updated: 2017-12-10
 */
function MLLoadImages(images) {
  this.preloadedImages = 0;
  this.images = images;
}

/*
 * Increase count of how many images have been loaded.
 * &return the current percentage of images loaded
 */
MLLoadImages.prototype.addLoadedImage = function() {
  this.preloadedImages++;
  return this.getLoadedPercent();
}

/*
 * Load the provided images array.
 * &return a callback to provide the current percentage of images loaded.
 */
MLLoadImages.prototype.loadImages = function(callback) {
  for (i=0;i<this.images.length;i++) {
    currentObject = this;
    //use jQuery to load image at this point until a better JavaScript solution is found
    $("<img src='"+this.images[i]+"' />").on("load",function(){
      return callback(currentObject.addLoadedImage()); //provide a callback to know the current percentage of images loaded
    });
  }
}

/*
 * Get the current loaded percentage based on the amount of images provided
 * &return loaded image percentage 
 */
MLLoadImages.prototype.getLoadedPercent = function() {
  return (this.preloadedImages / this.images.length) * 100;
}
