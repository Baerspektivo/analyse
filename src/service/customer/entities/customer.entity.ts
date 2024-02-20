import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Website } from '../../website/entities/website.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column({ nullable: false })
  @ApiProperty()
  firstName: string;

  @Column({ nullable: false })
  @ApiProperty()
  lastName: string;

  @Column({ nullable: false })
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @OneToMany(() => Website, (website) => website.customers)
  websites: Website[];
}
