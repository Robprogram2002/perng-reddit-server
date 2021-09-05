import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import SubType from '../types/SubTypes';
import SharedEntity from './Entity';
import SubSettings from './SubSettings';
import User from './User';

@ObjectType()
@Entity()
class Sub extends SharedEntity {
  constructor(sub: Partial<Sub>) {
    super();
    Object.assign(this, sub);
  }

  @Field(() => String, { description: "sub's name" })
  @Column('varchar', { unique: true, length: 250 })
  name: string | undefined;

  @Field(() => SubType, {
    description: 'authorization type of the sub',
  })
  @Column('enum', { enum: SubType })
  type: SubType | undefined;

  @Field(() => Boolean, {
    description:
      'boolean value meaning wheter or not the content of the sub is for 18+ year old people',
  })
  @Column('boolean', { default: false })
  adultContent!: boolean;

  @Field(() => String, { description: "sub's description", nullable: true })
  @Column('text', { nullable: true, default: null })
  description!: string | null;

  @Field(() => String, {
    description: 'username of the user that created this sub',
  })
  @Column('varchar', { length: 250 })
  username: string | undefined;

  @Field(() => SubSettings, {
    description: 'settiings entity for this sub',
  })
  @OneToOne(() => SubSettings)
  @JoinColumn()
  settings: SubSettings | undefined;

  @ManyToOne(() => User, (user) => user.subs)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User | undefined;
}

export default Sub;
