import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CustomerService } from 'src/service/customer/customer.service';
import { PageSpeedData } from 'src/service/pagespeed/entities/pagespeeddata.entity';
import { PagespeedService } from 'src/service/pagespeed/pagespeed.service';
import { WebsiteService } from 'src/service/website/website.service';

@ApiTags('pagespeed')
@Controller('controllers')
export class ControllersController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly websiteService: WebsiteService,
    private readonly pageSpeedService: PagespeedService,
  ) {}
  @Post('newpage')
  async getPageSpeedResult(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      url: string;
      displayName: string;
      email: string;
      dsgvo: boolean;
    },
    @Res() res: Response,
  ): Promise<any> {
    try {
      const url = body.url;
      const firstName = body.firstName;
      const lastName = body.lastName;
      const email = body.email;
      const displayName = body.displayName;
      const dsgvo = body.dsgvo;
      const customer = await this.customerService.createOrUpdateCustomer({
        firstName,
        lastName,
        email,
        dsgvo,
      });
      const website = await this.websiteService.createOrUpdateWebsite({
        url,
        displayName,
        customer,
      });

      const result = await this.pageSpeedService.getPageSpeedResult(
        url,
        website.id,
      );

      const pageSpeedId = result.id; // Extract the pageSpeedId from the backend response to utilize it within the frontend.
      // This allows us to reference the specific page speed data on the client side,
      // enabling dynamic content updates and user-specific interactions based on the
      // performance metrics of the requested web page.

      return res.status(200).json({
        message: 'PageSpeed data retrieved and saved successfully.',
        pageSpeedId,
      });
    } catch (error) {
      console.error('Error in getPageSpeedResult:', error);
      return res.status(500).json({
        message: 'An error occurred while retrieving PageSpeed data.',
        error: error.message,
      });
    }
  }
  @Get('currentresult/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findTheHole(@Param('id') id: string): Promise<PageSpeedData[]> {
    return this.pageSpeedService.getAllPageSpeeds(id);
  }
  @Get('gettall/:id')
  async findAll(@Param('id') id: string): Promise<PageSpeedData[]> {
    return this.pageSpeedService.getAllPageSpeeds(id);
  }
}
