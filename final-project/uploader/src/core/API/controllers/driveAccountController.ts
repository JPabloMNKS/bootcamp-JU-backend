import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { myContainer } from '../../config/inversify.config';
import { TYPES } from '../../utils/types';
import { IDriveAccountService } from '../../services/interfaces/IDriveAccountService';
import { HttpError } from '../middlewares/errorHandler';

dotenv.config();

export default class DriveAccountController {
  static driveAccountService = myContainer.get<IDriveAccountService>(
    TYPES.IDriveAccountService
  );

  static getDriveAccounts = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const driveAccounts = await this.driveAccountService.getDriveAccounts();
      return response.status(200).json(driveAccounts);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(404, error.message)
      );
    }
  };

  static getDriveAccountById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const driveAccount = await this.driveAccountService.getDriveAccountById(
        id
      );
      if (!driveAccount) {
        next(new HttpError(404, 'drive account doesnt exists'));
      }

      return response.status(200).json(driveAccount);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  };

  static createDriveAccount = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { email, client_id, client_secret, redirect_uri, refresh_token } =
        request.body;
      if (
        !email ||
        !client_id ||
        !client_secret ||
        !redirect_uri ||
        !refresh_token
      ) {
        next(new HttpError(406, 'Fields must not be empty'));
      }

      const driveAccount = request.body;
      const serviceResponse = await this.driveAccountService.createDriveAccount(
        driveAccount
      );

      response.status(201).json(serviceResponse);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  };

  static updateDriveAccount = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const driveAccount = await this.driveAccountService.getDriveAccountById(
        id
      );
      if (!driveAccount) {
        next(new HttpError(404, 'drive account doesnt exists'));
      }

      await this.driveAccountService.updateDriveAccount(id, {
        email: request.body.email,
        client_id: request.body.client_id,
        client_secret: request.body.client_secret,
        redirect_uri: request.body.redirect_uri,
        refresh_token: request.body.refresh_token,
      });
      response.sendStatus(200);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  };

  static deleteDriveAccount = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = request.params;
      const driveAccount = await this.driveAccountService.getDriveAccountById(
        id
      );

      if (!driveAccount) {
        next(new HttpError(404, 'drive account doesnt exists'));
      }

      await this.driveAccountService.deleteDriveAccount(id);
      response.sendStatus(204);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  };
}
