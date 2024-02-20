import {
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PageSpeedData } from '../../pagespeed/entities/pagespeeddata.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity()
export class Website {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column()
  @ApiProperty()
  displayName: string;

  @ManyToOne(() => Customer, (customer) => customer.websites)
  @JoinColumn({ name: 'customerId' })
  @ApiProperty()
  customers: Customer;

  @Column({ nullable: true })
  @ApiProperty()
  url: string;

  @OneToMany(() => PageSpeedData, (pageSpeedData) => pageSpeedData.website)
  @ApiProperty()
  pageSpeedDatas: PageSpeedData[];
}
