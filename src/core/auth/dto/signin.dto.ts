import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDTO {
  @IsEmail()
  @ApiProperty({ default: 'ivan@gmail1.com', required: false,  })
  email: string;

  @IsString()
  @ApiProperty({ default: 'ivan123', required: false })
  username: string;

  @IsString()
  @ApiProperty({ default: 'qwertyiop' })
  password:  string;
}

export class TokensResponseDTO {
  @ApiProperty({ description: 'Access token' })
  access_token: string;

  @ApiProperty({ description: 'Refresh token' })
  refresh_token: string;
}
