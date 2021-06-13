//IP and Port
const IP = '127.0.0.1';
const PORT = process.env.PORT || 3300;

//initializing express app
const app = require('./src/app.js');

//start listening server...
app.listen(PORT, IP, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(
      `\n${process.env.npm_package_name} start listening at ${IP}:${PORT}`
    );
  }
});
