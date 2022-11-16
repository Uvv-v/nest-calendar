import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AuthService {
  constructor(
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  async login() {
    const keycloakConfig = this.config.get('keycloak');

    const response = await this.httpService.axiosRef.post(
      `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
      {
        grant_type: 'password',
        username: 'admin',
        password: '1',
        client_secret: keycloakConfig.secret,
        client_id: keycloakConfig.clientId,
      },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    return response.data;
  }

  async refresh(refreshToken) {
    const keycloakConfig = this.config.get('keycloak');

    const response = await this.httpService.axiosRef.post(
      `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_secret: keycloakConfig.secret,
        client_id: keycloakConfig.clientId,
      },
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    return response.data;
  }

  logout() {

  }
}
