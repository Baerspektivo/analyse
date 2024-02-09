import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customer/entities/customer.entity';
import { Website } from './entities/website.entity';
import { CreateWebsiteDto } from './dto/create-website.dto';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,
  ) {}
  toEntity(dto: CreateWebsiteDto): Website {
    const entity = new Website();
    entity.url = dto.url;
    entity.displayName = dto.displayName;
    return entity;
  }
  async createOrUpdateWebsite(dto: CreateWebsiteDto): Promise<Website> {
    const website = await this.websiteRepository.findOne({
      where: { url: dto.url },
    });
    if (!website) {
      const newWebsite = this.websiteRepository.create();
      newWebsite.url = dto.url;
      newWebsite.displayName = dto.displayName;
      const customer = await this.customerRepository.findOne({
        where: { id: dto.customer.email },
      });
      if (!customer) {
        throw new Error(
          `Customer with CustomerID ${dto.customer.email} not found`,
        );
      }
      newWebsite.customer = customer;
      await this.websiteRepository.save(newWebsite);
      return newWebsite;
    }
    return website;
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
