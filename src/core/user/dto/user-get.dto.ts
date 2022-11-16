import { ApiProperty } from '@nestjs/swagger';

export class UserGetDto {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: 'ivan3000' })
  username?: string;

  @ApiProperty({ default: 'Ivan' })
  firstName?: string;

  @ApiProperty({ default: 'Ivanov' })
  lastName?: string;

  @ApiProperty({ default: 'Ivanovich' })
  patronymic?: string;
}

export class UserGetListDto {
  rows: UserGetDto[];
  count: number;
}
