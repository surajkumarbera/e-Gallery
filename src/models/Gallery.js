//Gallery class
class Gallery {
  constructor() {
    this.images = [];
  }

  addImage(image) {
    this.images[image.id] = image;
  }

  getImage(image) {
    return this.images[image.id];
  }

  getImagesCount() {
    return this.images.length;
  }
}

module.exports = Gallery;
