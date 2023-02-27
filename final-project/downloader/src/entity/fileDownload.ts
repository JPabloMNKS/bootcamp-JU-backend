export default class FileDownload {
  id: string;
  uploaderId: string;
  driveId: string;
  webViewLink: string;
  webContentLink: string;
  name: string;
  size: number;
  accountId: string;

  constructor(
    id: string,
    uploaderId: string,
    driveId: string,
    webViewLink: string,
    webContentLink: string,
    name: string,
    size: number,
    accountId: string
  ) {
    this.id = id;
    this.uploaderId = uploaderId;
    this.driveId = driveId;
    this.webViewLink = webViewLink;
    this.webContentLink = webContentLink;
    this.name = name;
    this.size = size;
    this.accountId = accountId;
  }
}
