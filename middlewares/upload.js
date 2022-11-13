import util from 'util';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { MONGO_URI_FILES } from '../config.js';

const storage = new GridFsStorage({
    url: MONGO_URI_FILES,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-blog-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`,
        };
    },
});

const uploadFile = multer({ storage: storage }).single("file");
export const uploadFilesMiddleware = util.promisify(uploadFile);
