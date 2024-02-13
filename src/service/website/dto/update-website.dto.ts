import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UpdateCustomerDto } from '../../customer/dto/update-customer.dto';
import { UpdatePageSpeedDto } from '../../pagespeed/dto/update-pagespeed.dto';

export class UpdateWebsiteDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty({ type: () => UpdateCustomerDto })
  customer: UpdateCustomerDto;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({ type: () => UpdatePageSpeedDto })
  pageSpeedDatas: UpdatePageSpeedDto[];
}
