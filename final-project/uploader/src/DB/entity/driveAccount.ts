import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm"

@Entity()
export class DriveAccount {

    @ObjectIdColumn()
    id!: ObjectID

    @Column()
    email!: string

    @Column()
    googleDriveKey!: string

}
