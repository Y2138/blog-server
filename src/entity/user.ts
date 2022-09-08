import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export default class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  code: string
}

export interface UserInf {
  name: string,
  code: string
}