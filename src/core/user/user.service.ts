import { Injectable } from '@nestjs/common';
import { KeycloakService } from '../keycloak/keycloak.service';
import { RegistrationDto } from './dto/registration-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private keycloakService: KeycloakService,
  ) {}

  async createUser(params: RegistrationDto) {
    const response = await this.keycloakService.createUser(params);

    console.log(response);

    return true;
  }
}
