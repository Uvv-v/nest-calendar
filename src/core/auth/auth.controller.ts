import { Controller, Get, Post, Query } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginDto, TokensResponseDTO } from './dto/login.dto';
import { KeycloakService } from '../keycloak/keycloak.service';

@Controller({ path: '/auth' })
@ApiTags('Authorization')
export class AuthController {
  constructor(private keycloakService: KeycloakService) {}

  @Post('/login')
  @Public()
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: TokensResponseDTO, description: 'Success login' })
  @ApiResponse({ status: 500, description: 'Failure login' })
  async login(@Query() params: LoginDto) {
    return await this.keycloakService.token(params);
  }

  @Post('/refresh')
  @Public()
  @ApiOperation({ summary: 'Token refresh' })
  @ApiQuery({ name: 'refresh_token' })
  @ApiResponse({ status: 200, type: TokensResponseDTO, description: 'Success refresh' })
  @ApiResponse({ status: 500, description: 'Failure refresh' })
  refresh(@Query('refresh-token') refresh) {
    return this.keycloakService.refresh(refresh);
  }

  @Post('/logout')
  @ApiBearerAuth('access_token')
  @ApiOperation({ summary: 'User logout' })
  @ApiQuery({ name: 'refresh_token' })
  @ApiResponse({ status: 201, description: 'Success logout' })
  @ApiResponse({ status: 500, description: 'Failure logout' })
  logout(@Query('refresh_token') refresh) {
    return this.keycloakService.logout(refresh);
  }

  @Get('/test')
  @ApiBearerAuth('access_token')
  test() {
    return 'Hello';
  }
}
