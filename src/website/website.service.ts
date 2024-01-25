import { Injectable } from '@nestjs/common';
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
    urlDisplayName: string,
    url: string,
    customerId: string,
  ): Promise<Website> {
    let website = await this.websiteRepository.findOne({
      where: { url: url },
    });
    if (!website) {
      website = new Website();
      website.urlDisplayName = urlDisplayName;
      website.url = url;
      const customer = await this.customerRepository.findOne({
        where: { customerId: customerId },
      });
      if (!customer) {
        throw new Error(`Customer with CustomerID ${customerId} not found`);
      }
      website.customer = customer;
      await this.websiteRepository.save(website);
    }
    return website;
  }
  async getWebsiteById(id: Website['websiteId']): Promise<Website> {
    return this.websiteRepository.findOne({ where: { websiteId: id } });
  }

  getAllWebsitesByCustomerId(customerId: string): Promise<Website[]> {
    return this.websiteRepository.find({
      where: { customer: { customerId: customerId } },
    });
  }
}
