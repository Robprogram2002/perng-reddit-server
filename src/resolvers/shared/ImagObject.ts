import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class ImageObject {
  @Field(() => String, {
    nullable: false,
    description: "image's id",
  })
  publicId!: string;

  @Field(() => String, { nullable: false, description: "image's secure url" })
  url!: string;
}
