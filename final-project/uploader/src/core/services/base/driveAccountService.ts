import { inject, injectable } from 'inversify';
import DriveAccount from '../../Entities/driveAccount';
import { IDriveAccountRepository } from '../../Repository/IDriveAccountRepository';
import { TYPES } from '../../utils/types';
import { IDriveAccountService } from '../interfaces/IDriveAccountService';

@injectable()
export class DriveAccountService implements IDriveAccountService {
  constructor(
    @inject(TYPES.IDriveAccountRepository)
    private driveAccountRepository: IDriveAccountRepository
  ) {}

  createDriveAccount(driveAccount: DriveAccount): Promise<DriveAccount> {
    return this.driveAccountRepository.createDriveAccount(driveAccount);
  }
  async deleteDriveAccount(driveAccountID: string): Promise<void> {
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
