import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  tag: string[];

  @Column()
  content: string
}