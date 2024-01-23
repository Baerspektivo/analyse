import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Website } from './website.entity';

@Entity()
export class Customer {
  @PrimaryColumn('uuid')
  @ApiProperty()
  customerId: string;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @OneToMany(() => Website, (website) => website.customer)
  website: Website[];
}
