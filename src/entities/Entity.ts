import { Field, ID } from 'type-graphql';
import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class SharedEntity extends BaseEntity {
  @Field(() => ID, { description: 'Instance unique uuid identifier' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Date, { description: 'Instance creation datetime' })
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date, { description: 'Instance last updation datetime' })
  @UpdateDateColumn()
  updatedAt!: Date;
}
