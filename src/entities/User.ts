/* eslint-disable no-unused-vars */
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import Provider from '../types/AuthProvider';
import SharedEntity from './Entity';
import Sub from './Sub';

@ObjectType()
@Entity()
class User extends SharedEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Field(() => String, { description: 'name of the user instance' })
  @Column('varchar', { unique: true })
  username: string | undefined;

  @Field(() => String, { description: 'url of the user avatar image' })
  @Column('varchar', {
    default:
      'https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
  })
  avatarUrl!: string;

  @Field(() => String, {
    description: 'url of the user banner/background image',
    nullable: true,
  })
  @Column('varchar', { nullable: true, default: null })
  bannerUrl: string | undefined;

  // @Field(() => Boolean, {})
  @Column('boolean', { default: false })
  emailConfirmation!: boolean;

  @Field(() => String, { description: 'user email' })
  @Column('text', { unique: true, nullable: false })
  email: string | undefined;

  @Column('enum', { enum: Provider })
  authProvider: Provider | undefined;

  @Column('text', { nullable: true })
  password: string | undefined;

  @Field(() => [Sub], {
    description: 'list of subs for wich this user is the owner/creator',
  })
  @OneToMany(() => Sub, (sub) => sub.user)
  subs: Sub[] | undefined;

  @Field(() => [Sub], {
    description: 'list of subs for which this user has joined',
    nullable: true,
  })
  @ManyToMany(() => Sub, (sub) => sub.joinedUsers, { nullable: true })
  @JoinTable()
  joinedSubs: Sub[] | undefined;
}

export default User;
