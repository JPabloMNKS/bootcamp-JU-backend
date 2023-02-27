import { Request, Response, NextFunction } from 'express';
import ReportService from '../../services/base/reportService';
import { HttpError } from '../middlewares/errorHandler';

const fileReportService = new ReportService();

export class ReportController {
  static async readAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const files = await fileReportService.readAll();
      response.status(200).json(files);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  }

  static async readByUploaderId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { uploaderId } = request.params;
    try {
      const file = await fileReportService.readByUploaderId(uploaderId);
      return response.status(200).json(file);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  }
}
