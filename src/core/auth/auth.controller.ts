import { Controller, Get, Post, Query } from '@nestjs/common';
import { Public, Resource } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import AuthService from './auth.service';
import { LoginDto, TokensResponseDTO } from './dto/login.dto';

@Controller({ path: '/auth' })
@ApiTags('Authorization')
@ApiBearerAuth('access_token')
@Resource('Auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Public()
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: TokensResponseDTO, description: 'Success login' })
  @ApiResponse({ status: 500, description: 'Failure login' })
  async login(@Query() params: LoginDto) {
    return await this.authService.login(params);
  }

  @Post('/refresh')
  @Public()
  @ApiOperation({ summary: 'Token refresh' })
  @ApiQuery({ name: 'refresh_token' })
  @ApiResponse({ status: 200, type: TokensResponseDTO, description: 'Success refresh' })
  @ApiResponse({ status: 500, description: 'Failure refresh' })
  refresh(@Query('refresh-token') refresh) {
    return this.authService.refresh(refresh);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiQuery({ name: 'refresh_token' })
  @ApiResponse({ status: 201, description: 'Success logout' })
  @ApiResponse({ status: 500, description: 'Failure logout' })
  logout(@Query('refresh_token') refresh) {
    return this.authService.logout(refresh);
  }

  @Get('/test')
  test() {
    return 'Hello';
  }
}
