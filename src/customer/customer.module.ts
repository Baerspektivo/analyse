import { Module } from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './entities/website.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Website])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
