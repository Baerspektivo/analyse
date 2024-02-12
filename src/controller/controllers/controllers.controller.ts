import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CustomerService } from 'src/service/customer/customer.service';
import { CreateCustomerDto } from 'src/service/customer/dto/create-customer.dto';
import { Customer } from 'src/service/customer/entities/customer.entity';
import { PageSpeedData } from 'src/service/pagespeed/entities/pagespeeddata.entity';
import { PagespeedService } from 'src/service/pagespeed/pagespeed.service';
import { CreateWebsiteDto } from 'src/service/website/dto/create-website.dto';
import { Website } from 'src/service/website/entities/website.entity';
import { WebsiteService } from 'src/service/website/website.service';
import { ControllersService } from './controllers.service';

@Controller('controllers')
export class ControllersController {
  constructor(
    private readonly controllersService: ControllersService,
    private readonly customerService: CustomerService,
    private readonly websiteService: WebsiteService,
    private readonly pageSpeedService: PagespeedService,
  ) {}
  @Post()
  async getPageSpeedResult(
    @Body() createCustomerDto: CreateCustomerDto,
    @Body() createWebsiteDto: CreateWebsiteDto,
    @Res() res: Response,
  ): Promise<any> {
    // Create or update customer
    const customer =
      await this.customerService.createOrUpdateCustomer(createCustomerDto);

    // Create or update website
    const website =
      await this.websiteService.createOrUpdateWebsite(createWebsiteDto);

    // Get PageSpeed result
    await this.pageSpeedService.getPageSpeedResult(website.url, website.id);

    res.sendStatus(200);
  }

  // @UseInterceptors(CurrentResultInterceptor)
  // @Post()
  // async getPageSpeedResult(
  //   @Body()
  //   body: {
  //     firstName: string;
  //     lastName: string;
  //     email: string;
  //     displayName: string;
  //     url: string;
  //   },
  //   @Res() res: Response,
  // ): Promise<any> {
  //   const url = body.url;
  //   const firstName = body.firstName;
  //   const lastName = body.lastName;
  //   const email = body.email;
  //   const displayName = body.displayName;
  //
  //   // Create or update customer
  //   const customer = await this.customerService.createOrUpdateCustomer(
  //     firstName,
  //     lastName,
  //     email,
  //   );
  //
  //   // Create or update website
  //   const website = await this.websiteService.createOrUpdateWebsite(
  //     displayName,
  //     url,
  //     customer.id, // assuming the customer object has an id property
  //   );
  //
  //   // Get PageSpeed result
  //   await this.pageSpeedService.getPageSpeedResult(url, website.id); // assuming the website object has an id property
  //
  //   res.sendStatus(200);
  // }
  @Get('all')
  findAll(): Promise<Customer[]> {
    return this.customerService.getAllCustomers();
  }
  @Get('currentresult')
  async getCurrentPageSpeedResult(
    @Param('id') id: string,
  ): Promise<PageSpeedData[]> {
    return this.pageSpeedService.getPageSpeedsByWebsiteId(id);
  }
  @Get('cusotmer')
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
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
  @Get('display/:displayName')
  async findOneWebsiteByDisplayName(
    @Param('displayName') displayName: string,
  ): Promise<Website> {
    return this.websiteService.getWebsiteByDisplayName(displayName);
  }
}
