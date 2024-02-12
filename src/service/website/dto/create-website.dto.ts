import { CreateCustomerDto } from 'src/service/customer/dto/create-customer.dto';
import { CreatePageSpeedDto } from 'src/service/pagespeed/dto/create-pagespeed.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWebsiteDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty({ type: () => CreateCustomerDto })
  customer: CreateCustomerDto;

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({ type: () => CreatePageSpeedDto })
  pageSpeedDatas: CreatePageSpeedDto[];
}
