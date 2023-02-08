import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { KeycloakModule } from '../keycloak/keycloak.module';

@Module({
  imports: [KeycloakModule],
  controllers: [AuthController],
})
export class AuthModule {}
