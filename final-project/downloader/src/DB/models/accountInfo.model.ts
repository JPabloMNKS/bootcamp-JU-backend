import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('Accounts')
export default class AccountInfoModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  accountId: string;

  @Column()
  downloadsTotal: number;

  @Column()
  downloadsToday: number;

  @Column({nullable: true})
  consecutiveDownloads: number;

  @Column()
  accumulatedSizeTotal: number;

  @Column()
  accumulatedSizeDay: number;
}
