
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class text {

  @PrimaryGeneratedColumn()
  id: any;
  @Column({ type: 'varchar' })
  name: string = "";

}

