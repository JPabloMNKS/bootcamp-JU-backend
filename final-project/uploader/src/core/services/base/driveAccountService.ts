import { inject, injectable } from 'inversify';
import DriveAccount from '../../Entities/driveAccount';
import { IDriveAccountRepository } from '../../Repository/IDriveAccountRepository';
import { TYPES } from '../../utils/types';
import { IDriveAccountService } from '../interfaces/IDriveAccountService';
import { sendMessageToRabbit } from '../rabbitmq/sender';

@injectable()
export class DriveAccountService implements IDriveAccountService {
  constructor(
    @inject(TYPES.IDriveAccountRepository)
    private driveAccountRepository: IDriveAccountRepository
  ) {}

  async createDriveAccount(driveAccount: DriveAccount): Promise<DriveAccount> {
    const newAccount = this.driveAccountRepository.createDriveAccount(driveAccount);
    return newAccount;
  }
  async deleteDriveAccount(driveAccountID: string): Promise<void> {
    const accountToDelete = await this.getDriveAccountById(driveAccountID);
    const deleteAccount = JSON.stringify(accountToDelete);
    await sendMessageToRabbit('Uploader-Downloader-delete-account', deleteAccount);

    return await this.driveAccountRepository.deleteDriveAccount(driveAccountID);
  }
  getDriveAccounts(): Promise<DriveAccount[]> {
    return this.driveAccountRepository.getDriveAccounts();
  }
  getDriveAccountById(driveAccountID: string): Promise<DriveAccount> {
    return this.driveAccountRepository.getDriveAccountByID(driveAccountID);
  }
  updateDriveAccount(
    driveAccountID: string,
    driveAccount: DriveAccount
  ): Promise<void> {
    return this.driveAccountRepository.updateDriveAccount(
      driveAccountID,
      driveAccount
    );
  }
}
