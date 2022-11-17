import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const keycloakConfig = config.get('keycloak');
        return {
          baseURL: `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}`,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
