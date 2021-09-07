import { Field, ObjectType } from 'type-graphql';
import Topic from '../../../entities/Topic';
import BaseResponse from '../../shared/baseResponse';

@ObjectType()
class TopicResponse extends BaseResponse {
  @Field(() => Topic, {
    description:
      'if success recently created/updated topic or in other case null',
    nullable: true,
  })
  topic!: Topic | null;
}

export default TopicResponse;
