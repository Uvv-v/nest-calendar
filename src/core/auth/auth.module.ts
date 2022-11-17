import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import { ConfigService } from '@nestjs/config';

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
export default class AuthModule {}
