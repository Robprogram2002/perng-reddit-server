import { Field, ObjectType } from 'type-graphql';
import Sub from '../../../entities/Sub';
import BaseResponse from '../../../utils/baseResponse';

@ObjectType()
class CreateSubResponse extends BaseResponse {
  @Field(() => Sub, {
    description: 'if success recently created sub or in other case null',
    nullable: true,
  })
  sub!: Sub | null;
}

export default CreateSubResponse;
