import DriveAccount from '../../Entities/driveAccount';

export interface IDriveAccountService {
  createDriveAccount(driveAccount: DriveAccount): Promise<DriveAccount>;
  deleteDriveAccount(driveAccountID: string): Promise<void>;
  getDriveAccounts(): Promise<DriveAccount[]>;
  getDriveAccountById(driveAccountID: string): Promise<DriveAccount>;
  updateDriveAccount(
    driveAccountID: string,
    driveAccount: DriveAccount
  ): Promise<void>;
}
