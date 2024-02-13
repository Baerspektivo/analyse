import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { UpdateWebsiteDto } from '../../website/dto/update-website.dto';

export class UpdateCustomerDto {
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
  @IsEmail()
  email: string;

  @ApiProperty({ type: () => UpdateWebsiteDto })
  website: UpdateWebsiteDto[];
}
