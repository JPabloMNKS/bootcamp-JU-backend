import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Reports')
export default class ReportModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  uploaderId: string;

  @Column()
  downloadsTotal: number;

  @Column()
  downloadsToday: number;

  @Column()
  accumulatedSizeTotal: number;

  @Column()
  accumulatedSizeDay: number;
}
