import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
class CreateSubInput {
  @Field()
  @Length(3, 30, { always: true })
  name!: string;

  @Field(() => String)
  type!: string;

  @Field(() => Boolean)
  adultContent!: boolean;
}

export default CreateSubInput;
