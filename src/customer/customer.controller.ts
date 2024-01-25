import { Body, Controller, Post, Res, Get } from '@nestjs/common';
import { Response } from 'express';
import { PagespeedService } from 'src/pagespeed/pagespeed.service';
import { WebsiteService } from 'src/website/website.service';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

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
      urlDisplayName: string;
      url: string;
    },
    @Res() res: Response,
  ): Promise<any> {
    const url = body.url;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const urlDisplayName = body.urlDisplayName;

    // Create or update customer
    const customer = await this.customerService.createOrUpdateCustomer(
      firstName,
      lastName,
      email,
    );

    // Create or update website
    const website = await this.websiteService.createOrUpdateWebsite(
      urlDisplayName,
      url,
      customer.customerId, // assuming the customer object has an id property
    );

    // Get PageSpeed result
    await this.pageSpeedService.getPageSpeedResult(url, website.websiteId); // assuming the website object has an id property

    res.sendStatus(200);
  }

  @Get(':customers')
  findAll(): Promise<Customer[]> {
    return this.customerService.getAllCustomers();
  }
}
