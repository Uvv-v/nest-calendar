import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { KeycloakModule } from '../keycloak/keycloak.module';


@Module({
  imports: [KeycloakModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
