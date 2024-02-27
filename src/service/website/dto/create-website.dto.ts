import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';
import { CreatePageSpeedDto } from '../../pagespeed/dto/create-pagespeed.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWebsiteDto {
  @ApiProperty({ description: 'Website Id' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Company Name' })
  @IsString()
  displayName: string;

  @ApiProperty({ type: () => CreateCustomerDto, description: 'Forign Key' })
  @IsNotEmpty()
  customer: { id: string };

  @ApiProperty({ description: 'Website Neme' })
  @IsString()
  url: string;

  @ApiProperty({
    type: () => CreatePageSpeedDto,
    description: 'PageSpeed Association',
  })
  @IsNotEmpty()
  pageSpeedDatas: CreatePageSpeedDto[];
}
