import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ default: 0 })
  offset?: number;

  @ApiProperty({ default: 10 })
  limit?: number;
}
