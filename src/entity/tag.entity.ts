import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @ManyToMany(() => Article, (article: Article) => article.tags)
  articles: Article[];
}
