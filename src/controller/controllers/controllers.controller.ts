import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  // InternalServerErrorException,
  // NotFoundException,
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
// import { Customer } from 'src/service/customer/entities/customer.entity';
import { PageSpeedData } from 'src/service/pagespeed/entities/pagespeeddata.entity';
import { PagespeedService } from 'src/service/pagespeed/pagespeed.service';
// import { Website } from 'src/service/website/entities/website.entity';
import { WebsiteService } from 'src/service/website/website.service';
import { ControllersService } from './controllers.service';

@ApiTags('pagespeed')
@Controller('controllers')
export class ControllersController {
  constructor(
    private readonly controllersService: ControllersService,
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
    },
    @Res() res: Response,
  ): Promise<any> {
    try {
      const url = body.url;
      const firstName = body.firstName;
      const lastName = body.lastName;
      const email = body.email;
      const displayName = body.displayName;
      const customer = await this.customerService.createOrUpdateCustomer({
        firstName,
        lastName,
        email,
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
  //#region functions to test the backend and expansion
  // @Get('customers')
  // findAll(): Promise<Customer[]> {
  //   return this.customerService.getAllCustomers();
  // }
  // @Get('currentresult/:id')
  // async getCurrentPageSpeedResult(
  //   @Param('id') id: string,
  // ): Promise<PageSpeedData[]> {
  //   return this.pageSpeedService.getPageSpeedsByWebsiteId(id);
  // }
  // @Get('nutzer/:id')
  // async getCustomerById(@Param('id') id: string): Promise<Customer> {
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
  // @Get('display/:displayName')
  // async findOneWebsiteByDisplayName(
  //   @Param('displayName') displayName: string,
  // ): Promise<Website> {
  //   return this.websiteService.getWebsiteByDisplayName(displayName);
  // }
  // @Get('lol/:id')
  // async findAllWebsitsByCustomerId(
  //   @Param('id') id: string,
  // ): Promise<Website[]> {
  //   return this.websiteService.getAllWebsitesByCustomerId(id);
  // }
  //
  // @Get('last/:customerId')
  // @UseInterceptors(ClassSerializerInterceptor)
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async getCustomerDetailsWithPageSpeeds(
  //   @Param('customerId') customerId: string,
  // ): Promise<any> {
  //   try {
  //     const customer = await this.customerService.getCustomerById(customerId);
  //     if (!customer) {
  //       throw new NotFoundException(`Customer with id ${customerId} not found`);
  //     }
  //
  //     const websites =
  //       await this.websiteService.getAllWebsitesByCustomerId(customerId);
  //
  //     if (!websites || websites.length === 0) {
  //       throw new NotFoundException(
  //         `No websites found for customer with ID ${customerId}`,
  //       );
  //     }
  //
  //     const websiteDetails = await Promise.all(
  //       websites.map(async (website) => {
  //         const pageSpeedResults =
  //           await this.pageSpeedService.getPageSpeedsByWebsiteId(website.id);
  //         return {
  //           customerId: customer.id,
  //           firstName: customer.firstName,
  //           lastName: customer.lastName,
  //           displayName: website.displayName,
  //           createdAt: customer.createdAt,
  //           url: website.url,
  //           pageSpeedResults,
  //         };
  //       }),
  //     );
  //
  //     return websiteDetails;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'An error occurred while retrieving customer.',
  //     );
  //   }
  // }
  // @Get('pagespeed/:websiteId')
  // async getPageSpeedData(
  //   @Param('websiteId') websiteId: string,
  //   @Res() res: Response,
  // ): Promise<Response> {
  //   try {
  //     const pageSpeedData =
  //       await this.pageSpeedService.getPageSpeedsByWebsiteId(websiteId);
  //
  //     return res.status(200).json(pageSpeedData);
  //   } catch (error) {
  //     return res.status(500).json({
  //       message: 'An error occurred while retrieving page speed data.',
  //       error: error.message,
  //     });
  //   }
  // }
  //#endregion
}
