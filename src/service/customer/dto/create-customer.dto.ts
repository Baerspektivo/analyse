import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { CreateWebsiteDto } from 'src/service/website/dto/create-website.dto';

export class CreateCustomerDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: () => CreateWebsiteDto })
  website: CreateCustomerDto[];
}
