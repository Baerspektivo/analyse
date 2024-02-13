import { ApiProperty } from '@nestjs/swagger';
import { LoadWebsiteDto } from '../../website/dto/load-website.dto';
import { IsString } from 'class-validator';

export class LoadCustomerDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty({ type: () => LoadWebsiteDto })
  website: LoadCustomerDto;
}
