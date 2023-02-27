export type FileDownloadInfo = {
  viewLink: string;
  downloadLink: string;
  driveFileId: string;
  uploaderDbId: string;
};

export type DownloadFileValues = {
  uploaderId: string;
  driveId: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
  size: number;
  accountId: string;
};

export type AccountStatsValues = {
  id: string;
  accountId: string;
  downloadsTotal: number;
  downloadsToday: number;
  accumulatedSizeTotal: number;
  accumulatedSizeDay: number;
  filesize: number;
}

export type FileReportValues = {
  id: string;
  uploaderId: string;
  downloadsTotal: number;
  downloadsToday: number;
  accumulatedSizeTotal: number;
  accumulatedSizeDay: number;
  size: number;
}

export type NewFileReportValues = {
  uploaderId: string;
  downloadsTotal: number;
  downloadsToday: number;
  accumulatedSizeTotal: number;
  accumulatedSizeDay: number;
  size: number;
}

