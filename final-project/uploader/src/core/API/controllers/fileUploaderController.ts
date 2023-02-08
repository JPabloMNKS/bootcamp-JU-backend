import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { myContainer } from '../../config/inversify.config';
import { TYPES } from '../../utils/types';
import { IFileUploaderService } from '../../services/interfaces/IFileUploaderService';

dotenv.config();

export default class FileUploaderController {
  static fileUploaderService = myContainer.get<IFileUploaderService>(
    TYPES.IFileUploaderService
  );

  static getFiles = async (request: Request, response: Response) => {
    try {
      const files = await this.fileUploaderService.getFiles();
      return response.status(200).json(files);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static getFileById = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const file = await this.fileUploaderService.getFileById(id);
      if (file) {
        return response.status(200).json(file);
      } else {
        return response
          .status(404)
          .json({ message: 'file account doesnt exists' });
      }
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static createFile = async (request: Request, response: Response) => {
    try {
      const { name, size, driveID, status } = request.body;
      if (!name || !size || !driveID || !status) {
        return response
          .status(406)
          .json({ message: 'Fields must not be empty' });
      }

      const file = request.body;
      const serviceResponse = await this.fileUploaderService.createFile(file);

      response.status(201).json(serviceResponse);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static updateFile = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const file = await this.fileUploaderService.getFileById(id);
      if (!file)
        return response
          .status(404)
          .json({ message: 'file account doesnt exists' });

      await this.fileUploaderService.updateFile(id.toString(), {
        name: request.body.name,
        size: request.body.size,
        driveID: request.body.driveID,
        status: request.body.status,
      });

      response.sendStatus(200);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static deleteFileUploader = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const file = await this.fileUploaderService.getFileById(id);

      if (!file)
        return response.status(404).json({ message: 'file doesnt exists' });

      await this.fileUploaderService.deleteFile(id);
      response.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };
}
