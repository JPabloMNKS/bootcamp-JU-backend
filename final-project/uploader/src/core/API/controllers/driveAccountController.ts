import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { myContainer } from '../../config/inversify.config';
import { TYPES } from '../../utils/types';
import { IDriveAccountService } from '../../services/interfaces/IDriveAccountService';

dotenv.config();

export default class DriveAccountController {
  static driveAccountService = myContainer.get<IDriveAccountService>(
    TYPES.IDriveAccountService
  );

  static getDriveAccounts = async (request: Request, response: Response) => {
    try {
      const driveAccounts = await this.driveAccountService.getDriveAccounts();
      return response.status(200).json(driveAccounts);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static getDriveAccountById = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const driveAccount = await this.driveAccountService.getDriveAccountById(
        id
      );
      if (!driveAccount) {
        return response
          .status(404)
          .json({ message: 'drive account doesnt exists' });
      }

      return response.status(200).json(driveAccount);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static createDriveAccount = async (request: Request, response: Response) => {
    try {
      const { email, googleDriveKey } = request.body;

      if (!email || !googleDriveKey) {
        return response
          .status(406)
          .json({ message: 'Fields must not be empty' });
      }

      const driveAccount = request.body;

      const serviceResponse = await this.driveAccountService.createDriveAccount(
        driveAccount
      );

      response.status(201).json(serviceResponse);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static updateDriveAccount = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const driveAccount = await this.driveAccountService.getDriveAccountById(
        id
      );
      if (!driveAccount)
        return response
          .status(404)
          .json({ message: 'drive account doesnt exists' });

      await this.driveAccountService.updateDriveAccount(id.toString(), {
        email: request.body.email,
        googleDriveKey: request.body.googleDriveKey,
      });

      response.sendStatus(200);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };

  static deleteDriveAccount = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const driveAccount = await this.driveAccountService.getDriveAccountById(
        id
      );

      if (!driveAccount)
        return response
          .status(404)
          .json({ message: 'drive Account doesnt exists' });

      await this.driveAccountService.deleteDriveAccount(id);
      response.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        response.status(500).json({ message: error.message });
      }
    }
  };
}
