import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import UserRoleModel from './user-role.model';

@Module({
  imports: [SequelizeModule.forFeature([UserRoleModel])],
})
export default class UserRoleModule {}
