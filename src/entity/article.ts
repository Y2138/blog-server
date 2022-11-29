import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export default class Article {
  @ObjectIdColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  tags: number[];

  @Column()
  content: string
}