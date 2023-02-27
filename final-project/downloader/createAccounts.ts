import "reflect-metadata";
import { AppDataSource } from "./src/DB/data-source";
import AccountInfoModel from "./src/DB/models/accountInfo.model";
import { AccountInfoRepository } from "./src/DB/repository/accountInfoRepository";

class Test {
    async initializeDB(){

      await AppDataSource.initialize();
        const account1 = new AccountInfoModel();
        account1.accountId = "63ea6379e6f172103541c1a0";
        account1.downloadsTotal = 0;
        account1.downloadsToday = 0;
        account1.consecutiveDownloads = 0;
        account1.accumulatedSizeTotal = 0;
        account1.accumulatedSizeDay = 0;
    
        const account2 = new AccountInfoModel();
        account2.accountId = "63f3e7e7655a170684a55725";
        account2.downloadsTotal = 0;
        account2.downloadsToday = 0;
        account2.consecutiveDownloads = 0;
        account2.accumulatedSizeTotal = 0;
        account2.accumulatedSizeDay = 0;
    
        const account3 = new AccountInfoModel();
        account3.accountId = "63f3f154655a170684a55729";
        account3.downloadsTotal = 0;
        account3.downloadsToday = 0;
        account3.consecutiveDownloads = 0;
        account3.accumulatedSizeTotal = 0;
        account3.accumulatedSizeDay = 0;

        const dataAccess = new AccountInfoRepository 
    
        await dataAccess.create(account1)
        await dataAccess.create(account2)
        await dataAccess.create(account3)
    
        return [account1, account2, account3];
    }
}

new Test().initializeDB();
