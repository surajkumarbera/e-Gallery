const showEachImage = (img) => {
  const { id, name, submittedBy } = img;
  const gallery = document.getElementById('gallery');
  const image = document.createElement('img');
  image.src = `/${name}`;
  image.width = image.height = 250;
  image.style = "margin: 5px;";
  gallery.appendChild(image);
};

const showAll = (images) => {
  console.log(images);
  images.map((img) => {
    showEachImage(img);
  });
};

const showAllImages = () => {
  fetch('/gallery')
    .then((res) => res.json())
    .then(showAll);
};
