import { Router } from 'express';
import { upload } from '../services/base/gridFsService';
import DriveAccountController from './controllers/driveAccountController';
import FileUploaderController from './controllers/fileUploaderController';

const router = Router();

router.get('/driveAccounts', DriveAccountController.getDriveAccounts);
router.post('/driveAccount', DriveAccountController.createDriveAccount);
router.get('/driveAccount/:id', DriveAccountController.getDriveAccountById);
router.delete('/driveAccount/:id', DriveAccountController.deleteDriveAccount);
router.put('/driveAccount/:id', DriveAccountController.updateDriveAccount);

router.get('/files', FileUploaderController.getFiles);
router.post("/files", upload.single("file"), FileUploaderController.createFile);
router.get('/file/:id', FileUploaderController.getFileById);
router.delete('/file/:id', FileUploaderController.deleteFileUploader);

export default router;


