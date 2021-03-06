// project module
const {
  readGalleryFileContent,
  createRequiredDirectories,
  writeGalleryFileContent,
} = require('./appUtils');

const { formatImgFileName, generateFileName } = require('./helpers');
const { renameFile, unlinkFile } = require('./utils');
const ImageInfo = require('./models/ImageInfo');

createRequiredDirectories();
const galleryData = readGalleryFileContent();

// update image storage
const appendNewImageData = (imageInfo) => {
  const { id } = imageInfo;
  galleryData.images[id] = imageInfo;
  writeGalleryFileContent(galleryData);
};

// add image to Gallery
const addImageToGallery = (gallery, imageInfo) => {
  gallery.addImage(imageInfo);
};

// upload image and store data
const updateImagesGallery = (req) => {
  const { title, description, submittedBy } = req.fields;
  const { img } = req.files;
  const { gallery } = req.app.locals;

  const imageId = gallery.getImagesCount();
  const imageName = generateFileName(imageId, img);
  const formattedFileName = formatImgFileName(imageName);
  const newImageInfo = new ImageInfo(
    imageId,
    imageName,
    title,
    description,
    submittedBy
  );

  addImageToGallery(gallery, newImageInfo);
  appendNewImageData(newImageInfo);
  renameFile(img.path, formattedFileName);
};

// remove invalid image from image folder
const removeInvalidImage = (req) => {
  const imagePathtoBeUnlinked = req.files.img.path;
  unlinkFile(imagePathtoBeUnlinked);
};

// export controllers
module.exports = {
  updateImagesGallery,
  removeInvalidImage,
};
