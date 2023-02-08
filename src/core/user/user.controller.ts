import { Controller, Post, Query } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegistrationDto } from './dto/registration-dto';

@Controller({ path: '/user' })
@ApiTags('User')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post('/registration')
  @Public()
  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, description: 'Success registration' })
  @ApiResponse({ status: 500, description: 'Failure registration' })
  registration(@Query() params: RegistrationDto) {
    return this.userService.createUser(params);
  }
}
