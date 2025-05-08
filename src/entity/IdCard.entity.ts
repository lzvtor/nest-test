import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'id_card',
})
export class IdCardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '身份证号',
  })
  cardName: string;
}
