import { Model, Column, DataType, Table, ForeignKey } from 'sequelize-typescript';
import UserModel from '../user/user.model';
import RoleModel from '../role/role.model';

@Table({ tableName: 'UserRole' })
export default class UserRoleModel extends Model {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, primaryKey: true })
  userId: string;

  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.UUID, primaryKey: true })
  roleId: string;
}
