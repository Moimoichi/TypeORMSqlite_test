
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: any;
  @Column({ type: 'varchar' })
  name: any;

}

