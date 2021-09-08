import { Query, Resolver } from 'type-graphql';
import Tag from '../../../entities/Tag';

@Resolver()
class FetchTagsResolver {
  @Query(() => [Tag], { nullable: true })
  async tags(): Promise<Tag[] | null> {
    try {
      const tags = await Tag.find();

      return tags;
    } catch (error) {
      return null;
    }
  }
}

export default FetchTagsResolver;
