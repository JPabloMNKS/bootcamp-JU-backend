import { AppDataSource } from '../data-source';
import AccountInfoModel from '../models/accountInfo.model';

export class AccountInfoRepository {
  protected repository = AppDataSource.getRepository(AccountInfoModel);

  async create(newDriveAccount: AccountInfoModel) {
    await this.repository.insert(newDriveAccount);
    return newDriveAccount;
  }

  async read(id: string) {
    const foundAccount = await this.repository.findOneBy({ id });

    if (foundAccount) {
      return foundAccount;
    }
  }

  async readAll() {
    const allAccounts = await this.repository.find();
    return allAccounts;
  }

  async update(updateDriveAccount: AccountInfoModel) {
    const response = await this.repository.save(updateDriveAccount);
    return response;
  }

  async delete(id: string) {
    const deleteAccount = await this.repository.delete({ id });

    if (deleteAccount) {
      return deleteAccount;
    }
  }

  async findAccountWithSmallestDownloadToday() {
    const response = await this.repository
      .createQueryBuilder('account')
      .where('account.consecutiveDownloads <= :consecutiveDownloads', {
        consecutiveDownloads: 4,
      })
      .orderBy('account.accumulatedSizeDay', 'ASC')
      .getOne();

    if (response) {
      return response;
    }
  }

  async dailyUpdate() {
    await this.repository.update(
      {},
      { downloadsToday: 0, accumulatedSizeDay: 0 }
    );
  }
}
