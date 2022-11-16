import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import UserRoleModel from '../UserRole/user-role.model';
import RoleModel from '../role/role.model';

@Table({ tableName: 'User' })
export default class UserModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  username: string;

  @Column({ type: DataType.STRING })
  firstname: string;

  @Column({ type: DataType.STRING })
  lastname: string;

  @Column({ type: DataType.STRING })
  patronymic: string;

  @BelongsToMany(() => RoleModel, () => UserRoleModel)
  roles: RoleModel[];
}
