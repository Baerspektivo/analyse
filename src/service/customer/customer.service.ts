import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from '../website/entities/website.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,
  ) {}

  async createOrUpdateCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const entity = this.toEntity(dto);
    await this.customerRepository.save(entity);
    return entity;
  }
  toEntity(dto: CreateCustomerDto): Customer {
    const entity = new Customer();
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.email = dto.email;
    return entity;
  }
  // async createOrUpdateCustomer(
  //     firstName: string,
  //     lastName: string,
  //     email: string,
  //   ): Promise<Customer> {
  //     let customer = await this.customerRepository.findOne({
  //       where: { email: email },
  //     });
  //     if (!customer) {
  //       customer = new Customer();
  //       customer.firstName = firstName;
  //       customer.lastName = lastName;
  //       customer.email = email;
  //       await this.customerRepository.save(customer);
  //     }
  //
  //     return customer;
  //   }
  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
  async getCustomerById(id: string): Promise<Customer> {
    return this.customerRepository.findOne({ where: { id: id } });
  }
  async getCustomerByName(name: string): Promise<Customer> {
    return this.customerRepository.findOne({ where: { firstName: name } });
  }
}
