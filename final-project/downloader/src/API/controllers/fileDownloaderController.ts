import { Request, Response, NextFunction } from 'express';
import FileDownloadService from '../../services/base/fileDownloaderService';
import { HttpError } from '../middlewares/errorHandler';

const fileDownloadService = new FileDownloadService();
export default class FileDownloaderController {
  static async readOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { fileDownloadId } = request.params;
      const file = await fileDownloadService.read(fileDownloadId);
      response.status(200).json(file);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(404, error.message)
      );
    }
  }

  static async readAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const files = await fileDownloadService.readAll();
      response.status(200).json(files);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  }

  static async getWebLinksByUploaderId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { uploaderId } = request.params;
    try {
      const file = await fileDownloadService.getWebLinks(uploaderId);
      return response.status(200).json(file);
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
      const file = await fileDownloadService.readByUploaderId(uploaderId);
      return response.status(200).json(file);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  }
}
