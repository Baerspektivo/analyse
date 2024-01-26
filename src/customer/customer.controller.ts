import { Body, Controller, Post, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { PagespeedService } from 'src/pagespeed/pagespeed.service';
import { WebsiteService } from 'src/website/website.service';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { Website } from 'src/website/entities/website.entity';
import { PageSpeedData } from 'src/pagespeed/entities/pagespeeddata.entity';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly websiteService: WebsiteService,
    private readonly pageSpeedService: PagespeedService,
  ) {}

  @Post()
  async getPageSpeedResult(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      email: string;
      displayName: string;
      url: string;
    },
    @Res() res: Response,
  ): Promise<any> {
    const url = body.url;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const displayName = body.displayName;

    // Create or update customer
    const customer = await this.customerService.createOrUpdateCustomer(
      firstName,
      lastName,
      email,
    );

    // Create or update website
    const website = await this.websiteService.createOrUpdateWebsite(
      displayName,
      url,
      customer.customerId, // assuming the customer object has an id property
    );

    // Get PageSpeed result
    await this.pageSpeedService.getPageSpeedResult(url, website.websiteId); // assuming the website object has an id property

    res.sendStatus(200);
  }

  @Get('all')
  findAll(): Promise<Customer[]> {
    return this.customerService.getAllCustomers();
  }

  @Get('id/:id')
  async findOneCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCustomerById(id);
  }
  @Get('name/:name')
  async findOneCustomerByName(@Param('name') name: string): Promise<Customer> {
    return this.customerService.getCustomerByName(name);
  }
  @Get('website/:id')
  async findOneWebsiteById(@Param('id') id: string): Promise<Website> {
    return this.websiteService.getWebsiteById(id);
  }
  @Get('website/:id/pagespeed')
  async getPageSpeedByWebsiteId(
    @Param('id') id: string,
  ): Promise<PageSpeedData[]> {
    return this.pageSpeedService.getPageSpeedsByWebsiteId(id);
  }
  @Get('website/:displayName')
  async findOneWebsiteByDisplayName(
    @Param('displayName') displayName: string,
  ): Promise<Website> {
    return this.websiteService.getWebsiteByDisplayName(displayName);
  }
}
