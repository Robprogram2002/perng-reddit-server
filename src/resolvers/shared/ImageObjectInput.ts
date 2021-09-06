import { Field, InputType } from 'type-graphql';

@InputType()
export default class ImageObjectInput {
  @Field()
  publicId!: string;

  @Field(() => String)
  url!: string;
}
