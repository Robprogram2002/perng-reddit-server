import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PostStatus, PostTypes } from '../types/PostTypes';
import SharedEntity from './Entity';
import PostMedia from './PostMedia';
import Sub from './Sub';
import Tag from './Tag';
import User from './User';

@ObjectType()
@Entity()
class Post extends SharedEntity {
  constructor(post: Partial<Post>) {
    super();
    Object.assign(this, post);
  }

  @Field(() => String!, { description: "post's title" })
  @Column('varchar', { length: 250, nullable: false })
  title: string | undefined;

  @Field(() => String, { description: "post's text body", nullable: true })
  @Column('text', { nullable: true })
  body!: string | null;

  @Field(() => String, { description: "post's link body", nullable: true })
  @Column('varchar', { length: 250, nullable: true })
  link!: string | null;

  @Field(() => Boolean, {
    description:
      'wheter or not the user creator will be notified when someone reply to  this post',
  })
  @Column('boolean', { default: true })
  notifyUser!: boolean;

  @Field(() => PostStatus!, { description: 'the status of the post' })
  @Column('enum', {
    enum: PostStatus,
    default: PostStatus.Waiting,
    nullable: false,
  })
  status!: PostStatus;

  @Field(() => PostTypes!, { description: 'the type of the post' })
  @Column('enum', {
    enum: PostTypes,
    default: PostTypes.Text,
    nullable: false,
  })
  type!: PostTypes;

  @Field(() => Sub!, { description: 'the sub which this product belongs to' })
  @ManyToOne(() => Sub, (sub) => sub.posts)
  sub: Sub | undefined;

  @Field(() => User!, { description: 'the user who create this post' })
  @ManyToOne(() => User, (user) => user.posts)
  author: User | undefined;

  @Field(() => [PostMedia], {
    description: 'list of media objects that belongs to this post',
  })
  @OneToMany(() => PostMedia, (media) => media.post)
  media: PostMedia[] | undefined;

  @Field(() => [Tag], {
    description: 'list of tags for this post',
  })
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[] | undefined;
}

export default Post;
