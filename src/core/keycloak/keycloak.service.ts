import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { LoginDto, TokensResponseDTO } from '../auth/dto/login.dto';
import { CreateKeyCloakUserDto } from './dto';

@Injectable()
export class KeycloakService {
  constructor(
    private httpService: HttpService,
    private config: ConfigService,
  ) {
    this.httpService.axiosRef.interceptors.response.use((err) => {
      console.log(err);
      return err;
    });
  }

  private keycloakConfig = this.config.get('keycloak');
  private keycloakAdmin = this.config.get('keycloakAdmin');

  private userBaseUrl = `/realms/${this.keycloakConfig.realm}`;
  private keycloakApiBaseUrl = `/admin/realms/${this.keycloakConfig.realm}`;

  public async token(params: LoginDto, grantType = 'password') {
    const response = await this.httpService.axiosRef.post(
      `${this.userBaseUrl}/protocol/openid-connect/token`,
      {
        grant_type: grantType,
        username: params.username,
        password: params.password,
        client_secret: this.keycloakConfig.secret,
        client_id: this.keycloakConfig.clientId,
      },
    );
    return response.data;
  }

  public async refresh(refreshToken) {
    const response = await this.httpService.axiosRef.post(
      `${this.userBaseUrl}/protocol/openid-connect/token`,
      {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_secret: this.keycloakConfig.secret,
        client_id: this.keycloakConfig.clientId,
      },
    );
    return response.data;
  }

  public async logout(refreshToken) {
    const response = await this.httpService.axiosRef.post(
      `${this.userBaseUrl}/protocol/openid-connect/logout`,
      {
        refresh_token: refreshToken,
        client_secret: this.keycloakConfig.secret,
        client_id: this.keycloakConfig.clientId,
      },
    );
    return response.data;
  }

  private adminTokens: TokensResponseDTO | null = null;
  private async setAdminTokens() {
  }

  createUser(params: CreateKeyCloakUserDto) {
    console.log(`${this.keycloakConfig.realm}/users`);

    return this.httpService.axiosRef.post(
      `${this.keycloakApiBaseUrl}/users`,
      params,
      {
        headers: {
        },
      },
    );
  }

  setupUserPassword(userId: string, password: string) {
    const response = this.httpService.post(`${this.keycloakApiBaseUrl}/users/${userId}/reset-password`, password);
  }
}
