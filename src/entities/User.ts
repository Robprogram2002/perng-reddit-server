import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import SharedEntity from './Entity';

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
  })
  @Column('varchar', { nullable: true })
  bannerUrl: string | undefined;

  // @Field(() => Boolean, {})
  @Column('boolean', { default: false })
  emailConfirmation!: boolean;

  @Field(() => String, { description: 'user email' })
  @Column('text', { unique: true, nullable: false })
  email: string | undefined;

  @Column('varchar')
  authProvider: string | undefined;

  @Column('text', { nullable: false })
  password: string | undefined;
}

export default User;
