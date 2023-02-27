import { Router } from 'express';
import { AccountInfoController } from '../controllers/accountInfoController';
import FileDownloaderController from '../controllers/fileDownloaderController';
import { ReportController } from '../controllers/reportController';

const router = Router();

router.get('/files', FileDownloaderController.readAll);
router.get('/file/:fileDownloadId', FileDownloaderController.readOne);

router.get(
  '/files/uploader/:uploaderId',
  FileDownloaderController.readByUploaderId
);
router.get(
  '/files/downloader/:uploaderId',
  FileDownloaderController.getWebLinksByUploaderId
);

router.get('/accounts', AccountInfoController.readAll);
router.get('/account/:accountId', AccountInfoController.readByAccountId);

router.get('/reports', ReportController.readAll);
router.get('/report/:uploaderId', ReportController.readByUploaderId);

export default router;
