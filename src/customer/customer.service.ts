import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { Website } from '../website/entities/website.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Website)
    private websiteRepository: Repository<Website>,
  ) {}

  async createOrUpdateCustomer(
    firstName: string,
    lastName: string,
    email: string,
  ): Promise<Customer> {
    let customer = await this.customerRepository.findOne({
      where: { email: email },
    });
    if (!customer) {
      customer = new Customer();
      customer.firstName = firstName;
      customer.lastName = lastName;
      customer.email = email;
      await this.customerRepository.save(customer);
    }

    return customer;
  }

  getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
}
