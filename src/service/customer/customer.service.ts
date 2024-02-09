import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { Website } from '../website/entities/website.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,
  ) {}

  toEntity(dto: CreateCustomerDto): Customer {
    const entity = new Customer();
    entity.firstName = dto.firstName;
    entity.lastName = dto.lastName;
    entity.email = dto.email;
    console.log('DTO CREATED');
    return entity;
  }
  async createOrUpdateCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { firstName: dto.firstName, lastName: dto.lastName },
    });
    if (!customer) {
      const newCustomer = this.customerRepository.create();
      console.log('HERE WE ARE');
      newCustomer.firstName = dto.firstName;
      newCustomer.lastName = dto.lastName;
      newCustomer.email = dto.email;
      await this.customerRepository.save(newCustomer);
      return newCustomer;
    }
    return customer;
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
