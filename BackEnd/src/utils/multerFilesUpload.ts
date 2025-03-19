import multer from 'multer';
import path from 'path';

// Define storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'post-assets/'); // Specify where to store files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Set the file name
    },
  });

// Initialize Multer with storage configuration
const multerUpload = multer({ storage: storage });

export default multerUpload;
