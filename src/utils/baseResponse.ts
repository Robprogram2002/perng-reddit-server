import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
class BaseResponse {
  @Field(() => Int, {
    description:
      'Similar to HTTP status code, represents the status of the mutation',
  })
  code!: number;

  @Field(() => Boolean, {
    description: 'Indicates whether the mutation was successful',
  })
  success!: boolean;

  @Field(() => String, { description: 'Human-readable message for the UI' })
  message!: string;
}

export default BaseResponse;
