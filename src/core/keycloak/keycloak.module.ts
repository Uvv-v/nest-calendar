import { Module } from '@nestjs/common';
import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { KeycloakService } from './keycloak.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const keycloakConfig = config.get('keycloak');
        return {
          baseURL: keycloakConfig.authServerUrl,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        } as HttpModuleOptions;
      },
    }),
  ],
  providers: [KeycloakService],
  exports: [KeycloakService],
})
export class KeycloakModule {}
