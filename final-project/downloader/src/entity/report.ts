export default class Report {
  id: string;
  uploaderId: string;
  downloadsTotal?: number;
  downloadsToday?: number;
  accumulatedSizeTotal: number;
  accumulatedSizeDay: number;

  constructor(
    id: string,
    uploaderId: string,
    accumulatedSizeTotal: number,
    accumulatedSizeDay: number,
    downloadsTotal?: number,
    downloadsToday?: number
  ) {
    this.id = id;
    this.uploaderId = uploaderId;
    this.accumulatedSizeTotal = accumulatedSizeTotal;
    this.accumulatedSizeDay = accumulatedSizeDay;
    this.downloadsTotal = downloadsTotal;
    this.downloadsToday = downloadsToday;
  }
}
