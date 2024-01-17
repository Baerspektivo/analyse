import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PageSpeedData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  firstContentfulPaintDisplayValue: string;

  @Column()
  firstContentfulPaintScore: number;

  @Column()
  firstContentfulPaintNumericValue: number;

  @Column()
  firstMeaningfulPaintNumericUnit: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
