import { ApiProperty } from '@nestjs/swagger';
import { LoadCustomerDto } from 'src/service/customer/dto/load-customer.dto';
import { LoadPageSpeedDto } from 'src/service/pagespeed/dto/load-pagespeed.dto';

export class LoadWebsiteDto {
  @ApiProperty()
  websiteId: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty({ type: () => LoadCustomerDto })
  customer: LoadCustomerDto;

  @ApiProperty()
  url: string;

  @ApiProperty({ type: () => LoadPageSpeedDto })
  pageSpeedDatas: LoadPageSpeedDto[];
}
