import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LoadCustomerDto } from '../../customer/dto/load-customer.dto';
import { LoadPageSpeedDto } from '../../pagespeed/dto/load-pagespeed.dto';

export class LoadWebsiteDto {
  @ApiProperty()
  @IsString()
  websiteId: string;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty({ type: () => LoadCustomerDto })
  customer: LoadCustomerDto;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({ type: () => LoadPageSpeedDto })
  pageSpeedDatas: LoadPageSpeedDto[];
}
