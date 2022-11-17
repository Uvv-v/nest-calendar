import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  async login(params: LoginDto) {
    const keycloakConfig = this.config.get('keycloak');

    const response = await this.httpService.axiosRef.post(
      '/protocol/openid-connect/token',
      {
        grant_type: 'password',
        username: params.username,
        password: params.password,
        client_secret: keycloakConfig.secret,
        client_id: keycloakConfig.clientId,
      },
    );
    return response.data;
  }

  async refresh(refreshToken) {
    const keycloakConfig = this.config.get('keycloak');

    const response = await this.httpService.axiosRef.post(
      '/protocol/openid-connect/token',
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_secret: keycloakConfig.secret,
        client_id: keycloakConfig.clientId,
      },
    );
    return response.data;
  }

  async logout(refreshToken) {
    const keycloakConfig = this.config.get('keycloak');

    const response = await this.httpService.axiosRef.post(
      '/protocol/openid-connect/logout',
      {
        refresh_token: refreshToken,
        client_secret: keycloakConfig.secret,
        client_id: keycloakConfig.clientId,
      },
    );
    return response.data;
  }
}
