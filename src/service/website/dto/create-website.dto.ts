import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';
import { CreatePageSpeedDto } from '../../pagespeed/dto/create-pagespeed.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWebsiteDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty({ type: () => CreateCustomerDto })
  @IsNotEmpty()
  customer: { id: string };

  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({ type: () => CreatePageSpeedDto })
  @IsNotEmpty()
  pageSpeedDatas: CreatePageSpeedDto[];
}
