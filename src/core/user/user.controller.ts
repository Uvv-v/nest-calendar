import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import UserService from './user.service';
import PaginationDto from '../../common/dto/pagination.dto';

@Controller({ path: '/api/v1/user' })
@ApiTags('Пользователь')
export default class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @ApiOperation({ summary: 'Получение списка пользователей' })
  getList(@Query() params: PaginationDto) {
    return this.userService.getAll(params);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Получение пользователя по ID' })
  @ApiParam({ name: 'id' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(Number(id));
  }
}
