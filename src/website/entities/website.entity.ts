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
  websiteId: string;

  @Column()
  @ApiProperty()
  urlDisplayName: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  @ApiProperty()
  customer: Customer;

  @Column({ nullable: true })
  @ApiProperty()
  url: string;

  @OneToMany(() => PageSpeedData, (pageSpeedData) => pageSpeedData.website)
  @ApiProperty()
  pageSpeedDatas: PageSpeedData[];
}
