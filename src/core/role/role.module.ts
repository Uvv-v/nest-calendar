import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import RoleModel from './role.model';
import RoleService from './role.service';
import UserModel from '../user/user.model';
import UserRoleModule from '../UserRole/user-role.module';
import RoleController from './role.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([RoleModel]), //
    SequelizeModule.forFeature([UserModel]),
    UserRoleModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export default class RoleModule {}
