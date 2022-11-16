import { ApiProperty } from '@nestjs/swagger';

export default class RoleCreateDto {
  @ApiProperty({ default: 'User' })
  name: string;
}
