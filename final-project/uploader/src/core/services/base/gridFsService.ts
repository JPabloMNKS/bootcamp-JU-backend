import { Db, MongoClient } from 'mongodb';
import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
import mongodb from 'mongodb';

// const diskStorage = multer.diskStorage({
//   destination: function (request, file, callback) {
//     callback(null, './uploads/');
//   },
//   filename: function (request, file, callback) {
//     const date = new Date();
//     callback(null, `${date.getTime()}_${file.originalname}`);
//   },
// });

const storage = new GridFsStorage({
  url: 'mongodb://0.0.0.0:27017/file-uploader',
  options: { useUnifiedTopology: true },
  file: (request, file) => {
    return new Promise((resolve) => {
      const filename = `${new Date().getTime()}_${file.originalname}`;
      resolve(filename);
    });
  },
});

const upload = multer({ storage: storage });

// function handleFileUpload(request: Request, response: Response, next: NextFunction) {
//   const { file } = request;
//   const stream = fs.createReadStream(file.path);
//   storage
//     .fromStream(stream, request, file)
//     .then(() => {
//       FileUploaderController.createFile(request, response, next);
//     })
//     .catch((error) => {
//       if (error instanceof Error) {
//         response.status(500).json({ message: error.message });
//       }
//     });
// }

export { storage, upload };

// export { diskStorage, storage, upload, handleFileUpload };

export class GridFsService {
  private client: MongoClient;
  private db: Db;

  async getFileFromGridFS(filename: string) {
    this.client = await mongodb.MongoClient.connect('mongodb://0.0.0.0:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.client.db('file-uploader');
    const filesCollection = this.db.collection('fs.files');
    const chunksCollection = this.db.collection('fs.chunks');

    const file = await filesCollection.findOne({ filename: filename });

    const chunks = await chunksCollection
      .find({ files_id: file._id })
      .sort({ n: 1 })
      .toArray();

    const fileBuffer = Buffer.concat(
      chunks.map((chunk: any) => Buffer.from(chunk.data.buffer))
    );
    if (fileBuffer) {
      return fileBuffer;
    } else {
      console.log('error');
    }
  }
}
