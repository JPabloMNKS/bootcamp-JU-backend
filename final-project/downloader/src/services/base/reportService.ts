import { ReportRepository } from '../../DB/repository/reportRepository';
import ReportModel from '../../DB/models/report.model';
import { NewFileReportValues } from '../../utils/types';

export default class ReportService {
  private fileReportRepository: ReportRepository;
  constructor() {
    this.fileReportRepository = new ReportRepository();
  }

  async readAll() {
    return await this.fileReportRepository.readAll();
  }

  async read(id: string) {
    return await this.fileReportRepository.read(id);
  }

  async readByUploaderId(uploaderId: string) {
    const file: ReportModel = await this.fileReportRepository.readByUploaderId(
      uploaderId
    );

    return file;
  }

  async updateOrCreateFileByUploaderId(message: any) {
    const fileFromDb: ReportModel | undefined = await this.read(message.id);
    const filetoUpdate: ReportModel = fileFromDb || new ReportModel();

    filetoUpdate.uploaderId = message.uploaderId;
    filetoUpdate.downloadsToday = message.downloadsToday;
    filetoUpdate.downloadsTotal = message.downloadsTotal;
    filetoUpdate.accumulatedSizeTotal = message.accumulatedSizeTotal;
    filetoUpdate.accumulatedSizeDay = message.accumulatedSizeDay;

    return await this.fileReportRepository.update(filetoUpdate);
  }

  async create(fileReport: NewFileReportValues) {
    const newFileReport = new ReportModel();
    newFileReport.uploaderId = fileReport.uploaderId;
    newFileReport.downloadsTotal = fileReport.downloadsTotal;
    newFileReport.downloadsToday = fileReport.downloadsToday;
    newFileReport.accumulatedSizeTotal = fileReport.accumulatedSizeTotal;
    newFileReport.accumulatedSizeDay = fileReport.accumulatedSizeDay;

    const createdFileReport = await this.fileReportRepository.create(
      newFileReport
    );
    return createdFileReport;
  }

  // async updateFileReportById(message: any) {
  //   const filetoUpdate: ReportModel | undefined = await this.read(message.id);

  //   filetoUpdate.uploaderId = message.uploaderId;
  //   filetoUpdate.downloadsToday = message.downloadsToday;
  //   filetoUpdate.downloadsTotal = message.downloadsTotal;
  //   filetoUpdate.accumulatedSizeTotal = message.acumulatedSizeTotal;
  //   filetoUpdate.accumulatedSizeDay = message.acumulatedSizeDay;

  //   return await this.fileReportRepository.update(filetoUpdate);
  // }

  async updateFileReport(updateFile: ReportModel) {
    const existingFile = await this.read(updateFile.id);
    if (!existingFile) {
      throw new Error('File not found');
    }
    existingFile.uploaderId = updateFile.uploaderId;
    existingFile.downloadsToday = updateFile.downloadsToday;
    existingFile.downloadsTotal = updateFile.downloadsTotal;
    existingFile.accumulatedSizeTotal = updateFile.accumulatedSizeTotal;
    existingFile.accumulatedSizeDay = updateFile.accumulatedSizeDay;

    return await this.fileReportRepository.update(existingFile);
  }

  async dailyUpdateDownloads() {
    this.fileReportRepository.dailyUpdate();
  }
}
