import {
  Entity,
  OneToMany,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PageSpeedData } from '../../pagespeed/entities/pagespeeddata.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity()
export class Website {
  @PrimaryColumn('uuid')
  @ApiProperty()
  urlId: string;

  @Column()
  @ApiProperty()
  urlDisplayName: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  @ApiProperty()
  customer: Customer;

  @OneToMany(() => PageSpeedData, (pageSpeedData) => pageSpeedData.website)
  @ApiProperty()
  pageSpeedDatas: PageSpeedData[];

  @Column()
  @ApiProperty()
  url: string;
}
