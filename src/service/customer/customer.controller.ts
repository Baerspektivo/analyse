import { Controller } from '@nestjs/common';
import { PagespeedService } from '../pagespeed/pagespeed.service';
import { WebsiteService } from '../website/website.service';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  // constructor(
  //   private readonly customerService: CustomerService,
  //   private readonly websiteService: WebsiteService,
  //   private readonly pageSpeedService: PagespeedService,
  // ) {}
  // @Post()
  // async createCustomer(
  //   @Body() createCustomerDto: CreateCustomerDto,
  // ): Promise<Customer> {
  //   return this.customerService.createOrUpdateCustomer(createCustomerDto);
  // }
  // @Post()
  // async createCustomer(
  //   @Body() createCustomerDto: CreateCustomerDto,
  // ): Promise<Customer> {
  //   return this.customerService.createOrUpdateCustomer(createCustomerDto);
  // }
  //
  // @Get('all')
  // findAll(): Promise<Customer[]> {
  //   return this.customerService.getAllCustomers();
  // }
  // @Get('id/:id')
  // async findOneCustomerById(@Param('id') id: string): Promise<Customer> {
  //   return this.customerService.getCustomerById(id);
  // }
  // @Get('name/:name')
  // async findOneCustomerByName(@Param('name') name: string): Promise<Customer> {
  //   return this.customerService.getCustomerByName(name);
  // }
  // @Get('website/:id')
  // async findOneWebsiteById(@Param('id') id: string): Promise<Website> {
  //   return this.websiteService.getWebsiteById(id);
  // }
  // @Get('website/:id/pagespeed')
  // async getPageSpeedByWebsiteId(
  //   @Param('id') id: string,
  // ): Promise<PageSpeedData[]> {
  //   return this.pageSpeedService.getPageSpeedsByWebsiteId(id);
  // }
  // @Get('display/:displayName')
  // async findOneWebsiteByDisplayName(
  //   @Param('displayName') displayName: string,
  // ): Promise<Website> {
  //   return this.websiteService.getWebsiteByDisplayName(displayName);
  // }
}
