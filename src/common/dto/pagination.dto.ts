import { ApiProperty } from '@nestjs/swagger';

export default class PaginationDto {
  @ApiProperty({ default: 0 })
  offset?: number;

  @ApiProperty({ default: 10 })
  limit?: number;
}
