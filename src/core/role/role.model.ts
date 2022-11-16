import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import UserRoleModel from '../UserRole/user-role.model';
import RoleGetDto from './dto/role-get.dto';
import UserModel from '../user/user.model';

@Table({ tableName: 'Role' })
export default class RoleModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;

  @BelongsToMany(() => UserModel, () => UserRoleModel)
  users: UserModel[];

  toGetDto() {
    return new RoleGetDto({ id: this.id, name: this.name });
  }
}
