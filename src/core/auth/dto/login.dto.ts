import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ example: 'admin' })
  username: string;

  @IsString()
  @ApiProperty({ example: 'admin' })
  password:  string;
}

export class TokensResponseDTO {
  @ApiProperty({ description: 'Access token' })
  access_token: string;

  @ApiProperty({ description: 'Access token expire time' })
  expires_in: number;

  @ApiProperty({ description: 'Refresh token' })
  refresh_token: string;

  @ApiProperty({ description: 'Refresh token expire time' })
  refresh_expires_in: number;

  @ApiProperty({ description: 'Token type' })
  token_type: string;

  @ApiProperty()
  'not-before-policy': number;

  @ApiProperty()
  session_state: string;

  @ApiProperty()
  scope: string;
}
