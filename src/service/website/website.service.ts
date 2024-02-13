import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Website } from './entities/website.entity';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,
  ) {}

  async createOrUpdateWebsite(
    data: Partial<Website>,
    websiteId?: Website['id'],
  ): Promise<Website> {
    if (!data.customer.email) {
      throw new InternalServerErrorException();
    }

    const customer = await this.customerRepository.findOne({
      where: { email: data.customer.email },
    });

    if (!customer) {
      throw new BadRequestException(
        `Customer with id ${data.customer.email} not found`,
      );
    }
    await this.websiteRepository.upsert(
      {
        id: websiteId,
        url: data.url,
        displayName: data.displayName,
        customer,
        pageSpeedDatas: data.pageSpeedDatas,
      },
      ['id'],
    );

    return this.websiteRepository.findOne({ where: { id: websiteId } });
  }

  //   async createOrUpdateWebsite(
  //   urlDisplayName: string,
  //   url: string,
  //   customerId: string,
  // ): Promise<Website> {
  //   let website = await this.websiteRepository.findOne({
  //     where: { url: url },
  //   });
  //   if (!website) {
  //     website = new Website();
  //     website.displayName = urlDisplayName;
  //     website.url = url;
  //     const customer = await this.customerRepository.findOne({
  //       where: { customerId: customerId },
  //     });
  //     if (!customer) {
  //       throw new Error(`Customer with CustomerID ${customerId} not found`);
  //     }
  //     website.customer = customer;
  //     await this.websiteRepository.save(website);
  //   }
  //   return website;
  // }

  async getAllWebsites(): Promise<Website[]> {
    return this.websiteRepository.find();
  }
  async getWebsiteById(id: Website['id']): Promise<Website> {
    return this.websiteRepository.findOne({ where: { id: id } });
  }
  async getAllWebsitesByCustomerId(id: string): Promise<Website[]> {
    return this.websiteRepository.find({
      where: { customer: { id: id } },
    });
  }
  async getWebsiteByDisplayName(displayName: string): Promise<Website> {
    return this.websiteRepository.findOne({
      where: { displayName: displayName },
    });
  }
}
