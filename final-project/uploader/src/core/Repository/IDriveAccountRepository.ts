import DriveAccount from '../Entities/driveAccount';

export interface IDriveAccountRepository {
  createDriveAccount(driveAccount: DriveAccount): Promise<DriveAccount>;
  deleteDriveAccount(driveAccountID: string): Promise<void>;
  getDriveAccounts(): Promise<DriveAccount[]>;
  getDriveAccountByID(driveAccountID: string): Promise<DriveAccount>;
  updateDriveAccount(
    driveAccountID: string,
    driveAccount: DriveAccount
  ): Promise<void>;
}
