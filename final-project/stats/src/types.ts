export type FileReportValues = {
    id?:number;
    uploaderId: string;
    downloadsTotal: number;
    downloadsToday: number;
    accumulatedSizeTotal: number;
    accumulatedSizeDay: number;
}

export type DriveAccountValues = {
    id: number;
    accountId: string;
    downloadsTotal: number;
    downloadsToday: number;
    accumulatedSizeTotal: number;
    accumulatedSizeDay: number;
}