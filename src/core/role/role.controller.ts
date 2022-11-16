import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import RoleService from './role.service';

@Controller({ path: '/api/v1/role' })
@ApiTags('Роль')
export default class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Получение роли по ID' })
  getRoleById(@Param() id: string) {
    return this.roleService.getById(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Получение списка ролей' })
  getRoles() {
    return this.roleService.getList();
  }

  @Post('/')
  @ApiOperation({ summary: 'Создание роли' })
  async createRole(@Query('name') name: string) {
    return await this.roleService.createRole(name);
  }
}
