//Gallery class
class Gallery {
  constructor() {
    this.images = {};
  }

  addImage(image) {
    this.images[image.id] = image;
  }

  getImages() {
    return this.images;
  }
  setImages(images) {
    this.images = images;
  }

  getImagesCount() {
    return Object.keys(this.images).length;
  }
}

module.exports = Gallery;
