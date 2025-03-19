import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'post-assets/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
    },
  });

const multerUpload = multer({ storage: storage });

export default multerUpload;
