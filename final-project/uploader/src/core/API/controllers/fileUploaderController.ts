import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { myContainer } from '../../config/inversify.config';
import { FileValues, TYPES } from '../../utils/types';
import { IFileUploaderService } from '../../services/interfaces/IFileUploaderService';
import FileUploader from '../../Entities/fileUploader';
import FileUploaderModel from '../../../DB/models/fileUploader.model';
import { HttpError } from '../middlewares/errorHandler';

dotenv.config();

export default class FileUploaderController {
  static fileUploaderService = myContainer.get<IFileUploaderService>(
    TYPES.IFileUploaderService
  );

  static getFiles = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const files = await this.fileUploaderService.getFiles();
      return response.status(200).json(files);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  };

  static getFileById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const file = await this.fileUploaderService.getFileById(id);
      if (file) {
        return response.status(200).json(file);
      } else {
        next(new HttpError(404, 'file account doesnt exists'));
      }
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  };

  static createFile = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { filename, originalname, mimetype, size } = request.file;
      if (!filename || !originalname || !mimetype || !size) {
        next(new HttpError(406, 'Fields must not be empty'));
      }

      const file = new FileUploaderModel();
      file.filename = filename;
      file.originalName = originalname;
      file.size = size;
      file.mimetype = mimetype;
      file.status = 'REPLICATING';

      const serviceResponse = await this.fileUploaderService.createFile(file);

      response.status(201).json(serviceResponse);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  };

  static deleteFileUploader = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const file = await this.fileUploaderService.getFileById(id);

      if (!file)
        return response.status(404).json({ message: 'file doesnt exists' });

      await this.fileUploaderService.deleteFile(id);
      response.sendStatus(204);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  };

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const fileValues: FileUploader = {
      filename: req.body.filename || '',
      originalName: req.body.originalname || '',
      size: req.body.size || null,
      mimetype: req.body.mimetype || '',
      driveId: req.body.driveId || '',
      status: req.body.status || 'Pending',
    };
    try {
      await this.fileUploaderService.updateFile(id, fileValues);
      const succesfulUpdate = {
        message: 'File successfully updated.',
        updatedFields: fileValues,
      };
      return res.status(200).json(succesfulUpdate);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  }
}
