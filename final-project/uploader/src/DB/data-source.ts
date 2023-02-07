import "reflect-metadata"
import { DataSource } from "typeorm"
import { DriveAccount } from "./entity/driveAccount"
import { FileUploader } from "./entity/fileUploader"

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [DriveAccount, FileUploader],
    migrations: [],
    subscribers: [],
    useUnifiedTopology: true
})
