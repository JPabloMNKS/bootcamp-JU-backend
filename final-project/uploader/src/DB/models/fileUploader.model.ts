import { FileUploader as FileUploaderEntity } from "../entity/fileUploader"

export class FileUploader {
    constructor(private fileUploaderEntity: FileUploaderEntity) {}

    getName() {
        return this.fileUploaderEntity.name;
    }

    getSize() {
        return this.fileUploaderEntity.size;
    }

    getDriveID() {
        return this.fileUploaderEntity.driveID;
    }

    getStatus() {
        return this.fileUploaderEntity.status;
    }
}
