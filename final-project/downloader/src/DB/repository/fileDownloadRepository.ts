import { AppDataSource } from '../data-source';
import FileDownloadModel from '../models/fileDownload.model';

export default class FileDownloadRepository {
  protected repository = AppDataSource.getRepository(FileDownloadModel);

  async create(downloadFile: FileDownloadModel) {
    await this.repository.save(downloadFile);
    return downloadFile;
  }

  async read(id: string) {
    return await this.repository.findOneBy({
      id: id,
    });
  }

  async readAll() {
    const downloadFiles = await this.repository.find();
    return downloadFiles
      ? downloadFiles.map((downloadFile) => downloadFile as FileDownloadModel)
      : undefined;
  }

  async readByUploaderId(uploaderId: string) {
    const readedUploaderId = await this.repository.find({
      where: { uploaderId: uploaderId },
    });
    if (readedUploaderId) {
      return readedUploaderId;
    }
  }

  async readByUploaderIdAndAccountId(uploaderId: string, accountId: string) {
    const FileAccountFound = await this.repository.findOneBy({
      uploaderId,
      accountId,
    });

    if (FileAccountFound) {      
      return FileAccountFound;
    } else {      
      return undefined;
    }
  }

  async update(downloadFile: FileDownloadModel) {
    return await this.repository.save(downloadFile);
  }

  async delete(id: string) {
    const deletedFile = await this.repository.delete({
      id: id,
    });
    if (deletedFile) {
      return deletedFile;
    } else {
      throw new Error(`Uploaded File with id:${id} not found`);
    }
  }

  async deleteByUploaderAndAccountId(uploaderId: string, accountId: string) {
    const deletedFiles = await this.repository.delete({
      uploaderId: uploaderId,
      accountId: accountId,
    });
    if (deletedFiles) {
      return deletedFiles;
    } else {
      throw new Error(`Uploaded Files with id:${uploaderId} not found`);
    }
  }
}
