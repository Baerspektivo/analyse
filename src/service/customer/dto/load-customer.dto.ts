import { ApiProperty } from '@nestjs/swagger';
import { LoadWebsiteDto } from 'src/service/website/dto/load-website.dto';

export class LoadCustomerDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ type: () => LoadWebsiteDto })
  website: LoadCustomerDto;
}
