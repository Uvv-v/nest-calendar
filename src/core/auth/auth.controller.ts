import { Controller, Get, Post, Query } from '@nestjs/common';
import { Public, Resource } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import AuthService from './auth.service';
import { SignInDTO, TokensResponseDTO } from './dto/signin.dto';

@Controller({ path: '/auth' })
@ApiTags('Авторизация')
@ApiBearerAuth('access-token')
@Resource('Auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Public()
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: TokensResponseDTO })
  async login(@Query() params: SignInDTO) {
    return await this.authService.login();
  }

  @Post('/refresh')
  @Public()
  @ApiQuery({ name: 'refresh-token' })
  refresh(@Query('refresh-token') refresh) {
    return this.authService.refresh(refresh);
  }

  @Post('/logout')
  @Public()
  logout() {
    return this.authService.logout();
  }

  @Get('/test')
  test() {
    return 'Hello';
  }
}
