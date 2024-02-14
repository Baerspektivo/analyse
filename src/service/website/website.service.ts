import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async createOrUpdateWebsite(
    data: Partial<CreateWebsiteDto>,
    websiteId?: Website['id'],
  ): Promise<Website> {
    if (!data.customer.id) {
      throw new InternalServerErrorException();
    }

    const customer = await this.customerRepository.findOne({
      where: { id: data.customer.id },
    });

    if (!customer) {
      throw new BadRequestException(
        `Customer with id ${data.customer.id} not found`,
      );
    }
    await this.websiteRepository.upsert(
      {
        id: websiteId,
        url: data.url,
        displayName: data.displayName,
        customer: customer,
        pageSpeedDatas: data.pageSpeedDatas,
      },
      ['id'],
    );

    return this.websiteRepository.findOne({ where: { id: websiteId } });
  }
  async getAllWebsites(): Promise<Website[]> {
    return this.websiteRepository.find();
  }
  async getWebsiteById(id: Website['id']): Promise<Website> {
    return this.websiteRepository.findOne({ where: { id: id } });
  }
  async getAllWebsitesByCustomerId(id: string): Promise<Website[]> {
    return this.websiteRepository
      .createQueryBuilder('website')
      .leftJoinAndSelect('website.customer', 'customer')
      .where('customer.id = :id', { id })
      .getMany();
  }
  async getWebsiteByDisplayName(displayName: string): Promise<Website> {
    return this.websiteRepository.findOne({
      where: { displayName: displayName },
    });
  }
}
