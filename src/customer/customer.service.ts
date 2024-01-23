import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  create(firstName: string, lastName: string, emial: string) {
    const customer = new Customer();
    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.email = emial;
    return this.customerRepository.save(customer);
  }
}
