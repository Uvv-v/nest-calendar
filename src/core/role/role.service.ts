import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import RoleModel from './role.model';

@Injectable()
export default class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private roleRepository: typeof RoleModel,
  ) {}

  async getById(id: string) {
    return await this.roleRepository.findByPk(id);
  }

  async getList() {
    return await this.roleRepository.findAll();
  }

  async createRole(name: string) {
    const roles = await this.roleRepository.findAll({ where: { name } });

    if (roles.length) throw new HttpException('Role with this name already exists', HttpStatus.CONFLICT);

    return (await this.roleRepository.create({ name })).toGetDto();
  }
}
