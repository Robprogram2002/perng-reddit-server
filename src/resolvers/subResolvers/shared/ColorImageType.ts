import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class ColorImage {
  @Field(() => String, {
    nullable: false,
    description: 'type of the entry, either color or image',
  })
  type!: 'color' | 'image';

  @Field(() => String, { nullable: false })
  value!: string;
}
