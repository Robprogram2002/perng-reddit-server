import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PostMediaTypes } from '../types/PostTypes';
import SharedEntity from './Entity';
import Post from './Post';

@ObjectType()
@Entity()
class PostMedia extends SharedEntity {
  constructor(postMedia: Partial<PostMedia>) {
    super();
    Object.assign(this, postMedia);
  }

  @Field(() => String!, { description: "meida's url" })
  @Column('varchar', { length: 250, nullable: false })
  url: string | undefined;

  @Field(() => String, { description: "media's caption text", nullable: true })
  @Column('text', { nullable: true })
  caption!: string | null;

  @Field(() => String, { description: "media's link", nullable: true })
  @Column('varchar', { length: 250, nullable: true })
  link!: string | null;

  @Field(() => PostMediaTypes!, { description: 'the type of the media' })
  @Column('enum', {
    enum: PostMediaTypes,
    default: PostMediaTypes.Image,
    nullable: false,
  })
  type!: PostMediaTypes;

  @Field(() => Post!, {
    description: 'the product which this meida belongs to',
  })
  @ManyToOne(() => Post, (post) => post.media)
  post: Post | undefined;
}

export default PostMedia;
