import { Field, ObjectType } from 'type-graphql';
import User from '../../../entities/User';
import BaseResponse from '../../../utils/baseResponse';

@ObjectType()
class RegisterResponse extends BaseResponse {
  @Field(() => User, {
    description:
      'new user instance after success register or in other case null',
    nullable: true,
  })
  user!: User | null;
}

export default RegisterResponse;
