import { Field, Int, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import SubType from '../types/SubTypes';
import Topic from './Topic';
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

  @Field(() => User, { description: 'owner of the sub' })
  @ManyToOne(() => User, (user) => user.subs)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User | undefined;

  @Field(() => Topic, {
    description: "sub's main topic",
    nullable: true,
  })
  @OneToOne(() => Topic, { nullable: true })
  @JoinColumn()
  mainTopic: Topic | undefined;

  @Field(() => [Topic], {
    description: "sub's secondary topics",
    nullable: true,
  })
  @ManyToMany(() => Topic, { nullable: true })
  @JoinTable()
  subTopics: Topic[] | undefined;

  @ManyToMany(() => User, (user) => user.joinedSubs, { nullable: true })
  joinedUsers: User[] | undefined;

  @Field(() => Boolean, {
    defaultValue: false,
    description: 'whether or not the current user has been joined to this sub',
  })
  isJoin!: Boolean;

  @Field(() => Int, {
    nullable: false,
    description: "count of sub's joined users ",
  })
  usersCount: Number | undefined;
}

export default Sub;
