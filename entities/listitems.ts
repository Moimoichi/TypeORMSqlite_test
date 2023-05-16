
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('textEntityXREF')
export class text {

  @PrimaryGeneratedColumn()
  id: any;
  @Column({ type: 'varchar' })
  name: string = "";

}

