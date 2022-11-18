import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'event', updatedAt: false, createdAt: false })
export class EventModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;
}


