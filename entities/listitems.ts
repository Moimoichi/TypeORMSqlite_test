import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  renderCategory!: string;

  @Column({ type: 'varchar' })
  name!: string;
}