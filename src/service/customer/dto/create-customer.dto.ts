import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CreateWebsiteDto } from 'src/service/website/dto/create-website.dto';

export class CreateCustomerDto {
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

  @ApiProperty({ type: () => CreateWebsiteDto })
  website: CreateCustomerDto[];
}
