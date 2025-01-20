import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // Write your code here
  destination: function (req, file, cb) {
    // Specify the destination directory
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const UploadFile= multer({ storage:storage });
