import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    unique: true,
    nullable: false,
    length: 10,
    type: 'varchar',
    default: 'password',
  })
  password: string;

  @Column({
    type: 'double',
  })
  age: number;
}
