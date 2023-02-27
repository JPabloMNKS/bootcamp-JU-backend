import { AppDataSource } from '../data-source';
import ReportModel from '../models/report.model';

export class ReportRepository {
  protected repository = AppDataSource.getRepository(ReportModel);

  async create(newFile: ReportModel) {
    await this.repository.insert(newFile);
    return newFile;
  }

  async read(id: string) {
    const foundAccount = await this.repository.findOneBy({ id });

    if (foundAccount) {
      return foundAccount;
    }
  }

  async readAll() {
    const allAccounts = await this.repository.find();

    if (allAccounts) {
      return allAccounts;
    }
  }

  async readByUploaderId(uploaderId: string) {
    const readedUploadId = await this.repository.findOne({
      where: { uploaderId: uploaderId },
    });
    if (readedUploadId) {
      return readedUploadId;
    }
  }

  async update(updateFile: ReportModel) {
    const response = await this.repository.update(
      { id: updateFile.id },
      updateFile
    );
    return response;
  }

  async delete(id: string) {
    const deleteFile = await this.repository.delete({ id });

    if (deleteFile) {
      return deleteFile;
    }
  }

  async dailyUpdate() {
    await this.repository.update(
      {},
      { downloadsToday: 0, accumulatedSizeDay: 0 }
    );
  }
}
