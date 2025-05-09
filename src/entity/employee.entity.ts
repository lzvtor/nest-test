import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from './department.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @ManyToOne(() => Department, {
    cascade: true,
  })
  department: Department;
}
