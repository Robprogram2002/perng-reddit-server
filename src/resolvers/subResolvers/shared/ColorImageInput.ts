import { Field, InputType } from 'type-graphql';

@InputType()
export default class ColorImageInput {
  @Field(() => String)
  type!: string;

  @Field(() => String)
  value!: string;
}
