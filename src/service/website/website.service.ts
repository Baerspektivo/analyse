import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
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

  async createOrUpdateWebsite(dto: CreateWebsiteDto): Promise<Website> {
    const entity = this.toEntity(dto);
    await this.websiteRepository.save(entity);
    return entity;
  }

 async toEntity(dto: CreateWebsiteDto): Promise<Website> {
    const entity = new Website();
    entity.url = dto.url;
    entity.displayName = dto.url;
    const customer = await this.customerRepository.findOne(dto.customer.id);
    if(!customer){
      throw new Error(`Custinmer with ID ${dto.customer.id} not found`);
    }
    entity.customer = customer;
    entity.pageSpeedDatas = dto.pageSpeedDatas;
    return entity;
  }
  async saveEntity(entity: Website): Promise<Website> {
    return await this.websiteRepository.save(entity);
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
