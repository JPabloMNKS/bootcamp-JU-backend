import { Request, Response, NextFunction } from 'express';
import AccountInfoService from '../../services/base/accountInfoService';
import { HttpError } from '../middlewares/errorHandler';

const driveAccountService = new AccountInfoService();

export class AccountInfoController {
  static async readAll(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const accounts = await driveAccountService.getAllAccounts();
      response.status(200).json(accounts);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  }

  static async readByAccountId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { accountId } = request.params;
    try {
      const account = await driveAccountService.getAccountById(accountId);
      return response.status(200).json(account);
    } catch (error) {
      next(
        error instanceof HttpError ? error : new HttpError(400, error.message)
      );
    }
  }
}
