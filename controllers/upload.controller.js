import { uploadFilesMiddleware as upload } from '../middlewares/upload.js';
import { MONGO_URI_FILES } from '../config.js';

import { MongoClient } from 'mongodb';
import { GridFSBucket } from 'mongodb';

const client = new MongoClient(MONGO_URI_FILES, { useNewUrlParser: true, useUnifiedTopology: true });

export const uploadFile = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.file);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        return 
    } catch (err) {
        console.log(err);
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({ message: "File size cannot be larger than 2MB!" });
        }
        return res.status(500).send({ message: `Could not upload the file: ${req.file.originalname}. ${err}` });
    }
};

export const getListFiles = async (req, res) => {
    try{
        await client.connect();
        const database = client.db();
        const images = database.collection('images.files');

        const cursor = images.find({});

        if (!cursor) {
            res.status(404).send({ message: "No files found!" });
        }

        let files = [];
        await cursor.forEach((doc) => {
            files.push({
                filename: doc.filename,
                originalname: doc.metadata.originalname,
                id: doc._id,
            });
        });

        return res.status(200).send(files);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Could not retrieve files" });
    }
};

export const download = async (req, res) => {
    try {
        await client.connect();
        const database = client.db();
        const bucket = new GridFSBucket(database, {
            bucketName: 'images',
        });

        let downloadStream = bucket.openDownloadStreamByName(req.params.name);

        downloadStream.on('data', function (chunk) {
            res.write(chunk);
        });

        downloadStream.on('error', function () {
            res.sendStatus(404);
        });

        downloadStream.on('end', function () {
            res.end();
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Could not download the file. " + err });
    }
};
