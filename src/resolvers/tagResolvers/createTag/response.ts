import { Field, ObjectType } from 'type-graphql';
import Tag from '../../../entities/Tag';
import BaseResponse from '../../shared/baseResponse';

@ObjectType()
class TagResponse extends BaseResponse {
  @Field(() => Tag, {
    description:
      'if success recently created/updated tag or in other case null',
    nullable: true,
  })
  tag!: Tag | null;
}

export default TagResponse;
