import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ default: false })
  archived: boolean;

  @Column({ nullable: true })
  category: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: number;
}