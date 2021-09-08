/* eslint-disable max-classes-per-file */
import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import { PostMediaTypes, PostTypes } from '../../../types/PostTypes';

@InputType()
class CreatePostInput {
  @Field()
  @Length(3, 200, { always: true })
  title!: string;

  @Field(() => String, { nullable: true })
  body!: string | null;

  @Field(() => String, { nullable: true })
  link!: string | null;

  @Field(() => Boolean)
  notifyUser!: boolean;

  @Field(() => PostTypes)
  type!: PostTypes;

  @Field(() => String)
  subId!: string;

  @Field(() => [String!], { nullable: true })
  tagIds!: string[] | null;
}

@InputType()
export class MediaInput {
  @Field()
  baseImage!: string;

  @Field(() => String, { nullable: true })
  caption!: string | null;

  @Field(() => String, { nullable: true })
  link!: string | null;

  @Field(() => PostMediaTypes)
  type!: PostMediaTypes;
}

export default CreatePostInput;
