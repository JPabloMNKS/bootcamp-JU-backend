import AccountInfoModel from '../../DB/models/accountInfo.model';
import { AccountInfoRepository } from '../../DB/repository/accountInfoRepository';

export default class AccountInfoService {
  private driveAccountRepository: AccountInfoRepository;
  constructor() {
    this.driveAccountRepository = new AccountInfoRepository();
  }

  async getAllAccounts() {
    return await this.driveAccountRepository.readAll();
  }

  async getAccountById(id: string) {
    return await this.driveAccountRepository.read(id);
  }

  async getOptimizedAccount() {
    return await this.driveAccountRepository.findAccountWithSmallestDownloadToday();
  }

  async getAllAccountsExceptOne(accountId: string) {
    const allAccounts = await this.getAllAccounts();
    const filterAccounts = allAccounts.filter((account: any) => {
      return account.accountId !== accountId;
    });
    return filterAccounts;
  }

  async updateOrCreateAccountByAccountId(message: any) {
    const accountFromDb: AccountInfoModel | undefined =
      await this.getAccountById(message.id);
    const accounttoUpdate: AccountInfoModel =
      accountFromDb || new AccountInfoModel();

    accounttoUpdate.accountId = message.accountId;
    accounttoUpdate.downloadsToday = message.downloadsToday;
    accounttoUpdate.downloadsTotal = message.downloadsTotal;
    accounttoUpdate.accumulatedSizeTotal = message.accumulatedSizeTotal;
    accounttoUpdate.accumulatedSizeDay = message.accumulatedSizeDay;
    accounttoUpdate.consecutiveDownloads = message.consecutiveDownloads;

    return await this.driveAccountRepository.update(accounttoUpdate);
  }

  async dailyUpdateDownloads() {
    this.driveAccountRepository.dailyUpdate();
  }

  async create(driveAccount: AccountInfoModel) {
    const newDriveAccount = new AccountInfoModel();
    newDriveAccount.accountId = driveAccount.accountId;
    newDriveAccount.downloadsTotal = driveAccount.downloadsTotal;
    newDriveAccount.downloadsToday = driveAccount.downloadsToday;
    newDriveAccount.accumulatedSizeTotal = driveAccount.accumulatedSizeTotal;
    newDriveAccount.accumulatedSizeDay = driveAccount.accumulatedSizeDay;

    const createdFileReport = await this.driveAccountRepository.create(
      newDriveAccount
    );
    return createdFileReport;
  }

  async updateInactiveAccountByAccountId(
    accountId: string,
    inactiveAccount: any
  ) {
    const updateInactiveAccount = await this.driveAccountRepository.read(
      accountId
    );
    if (updateInactiveAccount) {
      updateInactiveAccount.consecutiveDownloads =
        inactiveAccount.consecutiveDownloads;
      await this.driveAccountRepository.update(updateInactiveAccount);
    }
  }
}
