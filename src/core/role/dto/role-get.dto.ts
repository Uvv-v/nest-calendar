import { ApiProperty } from '@nestjs/swagger';

export default class RoleGetDto {
  constructor({ id, name }: { id: string; name: string }) {
    this.id = id;
    this.name = name;
  }

  @ApiProperty({ default: '' })
  id: string;

  @ApiProperty({ default: 'User' })
  name: string;
}
