import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { CreateWebsiteDto } from '../../website/dto/create-website.dto';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Customer Id' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'First name' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name ' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'E-Mail adress' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: () => CreateWebsiteDto,
    description: 'Website Association',
  })
  website: CreateWebsiteDto[];

  @ApiProperty({ description: 'DSGVO confirmation' })
  @IsBoolean()
  dsgvo: boolean;
}
