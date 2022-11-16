import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import UserModel from './user.model';
import UserService from './user.service';
import UserController from './user.controller';
import RoleModel from '../role/role.model';
import UserRoleModule from '../UserRole/user-role.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, RoleModel]), //
    UserRoleModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export default class UserModule {}
