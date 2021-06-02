//project module
const {
  json_read,
  json_Obj
} = require("../utils");

//Gallery class
class Gallery {
  constructor() {
    if (json_read() === "") {
      console.log("gallery init > empty");
      this.images = [];
    } else {
      console.log("gallery init > json");
      this.images = json_Obj().images;
    }
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
