import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { KeycloakConnectModule, AuthGuard, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';

import { AuthModule } from './core/auth/auth.module';

import * as configs from './config';
import { UserModule } from './core/user/user.module';
// import { FileDescriptorModule } from './file-descriptor/file-descriptor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Object.values(configs),
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database'),
    }),
    KeycloakConnectModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('keycloak'),
    }),
    AuthModule,
    UserModule,
    // FileDescriptorModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class AppModule {}
