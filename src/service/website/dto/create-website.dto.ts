import { CreateCustomerDto } from 'src/service/customer/dto/create-customer.dto';
import { CreatePageSpeedDto } from 'src/service/pagespeed/dto/create-pagespeed.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWebsiteDto {
  @ApiProperty()
  displayName: string;

  @ApiProperty({ type: () => CreateCustomerDto })
  customer: CreateCustomerDto;

  @ApiProperty()
  url: string;

  @ApiProperty({ type: () => CreatePageSpeedDto })
  pageSpeedDatas: CreatePageSpeedDto[];
}
