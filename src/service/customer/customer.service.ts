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

  async createOrUpdateCustomer(
    data: Partial<CreateCustomerDto>,
  ): Promise<Customer> {
    let customer = await this.customerRepository.findOne({
      where: { email: data.email },
    });
    if (!customer) {
      customer = new Customer();
      customer.firstName = data.firstName;
      customer.lastName = data.lastName;
      customer.email = data.email;
      await this.customerRepository.save(customer);
    }
    return customer;
  }
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
