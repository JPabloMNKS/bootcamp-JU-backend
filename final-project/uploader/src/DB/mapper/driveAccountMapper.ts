// import { ObjectID } from 'typeorm';
// import DriveAccount from '../../core/Entities/driveAccount';
// import DriveAccountModel from '../models/driveAccount.model';

// export function mapDriveAccountModelToDriveAccount(
//   driveAccountModel: DriveAccountModel
// ): DriveAccount {
//   return {
//     _id: driveAccountModel._id.toString(),
//     email: driveAccountModel.email,
//     googleDriveKey: driveAccountModel.googleDriveKey,
//   };
// }

// export function mapDriveAccountToDriveAccountModel(
//   driveAccount: DriveAccount
// ): DriveAccountModel {
//   const driveAccountModel = new DriveAccountModel();
//   if (driveAccount._id) {
//     driveAccountModel._id = new ObjectID(driveAccount._id);
//   }
//   driveAccountModel.email = driveAccount.email;
//   driveAccountModel.googleDriveKey = driveAccount.googleDriveKey;
//   return driveAccountModel;
// }
