import { injectable } from 'inversify';
import { Repository } from 'typeorm/repository/Repository';
import dotenv from 'dotenv';
import { IDriveAccountRepository } from '../../core/Repository/IDriveAccountRepository';
import DriveAccount from '../../core/Entities/driveAccount';
import { AppDataSource } from '../data-source';
import DriveAccountModel from '../models/driveAccount.model';
dotenv.config();

@injectable()
export default class DriveAccountRepository implements IDriveAccountRepository {
  private driveAccountRepository: Repository<DriveAccount>;

  constructor() {
    this.driveAccountRepository =
      AppDataSource.getMongoRepository(DriveAccountModel);
  }
  async createDriveAccount(driveAccount: DriveAccount): Promise<DriveAccount> {
    return await this.driveAccountRepository.save(driveAccount);
  }
  async deleteDriveAccount(driveAccountID: string): Promise<void> {
    await this.driveAccountRepository.delete(driveAccountID);
  }
  async getDriveAccounts(): Promise<DriveAccount[]> {
    return await this.driveAccountRepository.find();
  }
  async getDriveAccountByID(driveAccountID: string): Promise<DriveAccount> {
    const driveAccount = await this.driveAccountRepository.findOneBy({
      id: driveAccountID,
    });
    if (!driveAccount) throw new Error('drive Account doesnt exists');
    return driveAccount;
  }
  async updateDriveAccount(
    driveAccountID: string,
    driveAccount: DriveAccount
  ): Promise<void> {
    const driveAccountToUpdate = await this.driveAccountRepository.findOneBy({
      id: driveAccountID,
    });
    if (!driveAccountToUpdate) throw new Error('drive Account doesnt exists');
    await this.driveAccountRepository.update(driveAccountID, driveAccount);
  }
}
