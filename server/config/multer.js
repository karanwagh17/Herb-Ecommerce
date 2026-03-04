const multer = require("multer");
const fs = require("fs");
const foldername = "./uploads";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      if (!fs.existsSync(foldername)) {
        fs.mkdirSync(foldername);
      }

      cb(null, foldername);
    } catch (error) {
      console.log(error);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports=upload
