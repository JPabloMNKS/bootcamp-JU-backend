import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity()
export class FileUploader {

    @ObjectIdColumn()
    id!: ObjectID

    @Column()
    name!: string

    @Column()
    size!: string

    @Column()
    driveID!: string

    @Column()
    status!: string

}
