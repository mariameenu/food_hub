// middleware/upload.js
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname,"uploads");

if (!fs.existsSync(uploadPath)){
  fs.mkdirSync(uploadPath);
}

// Store uploaded images in /uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const uniqueName = uniqueSuffix + '-' + file.originalname;
    cb(null, uniqueName);  
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = upload;