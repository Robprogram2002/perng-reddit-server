import { Field, ObjectType } from 'type-graphql';
import Post from '../../../entities/Post';
import BaseResponse from '../../shared/baseResponse';

@ObjectType()
class PostResponse extends BaseResponse {
  @Field(() => Post, {
    description:
      'if success recently created/updated post or in other case null',
    nullable: true,
  })
  post!: Post | null;
}

export default PostResponse;
