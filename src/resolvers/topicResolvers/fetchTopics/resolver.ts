import { Query, Resolver } from 'type-graphql';
import Topic from '../../../entities/Topic';

@Resolver()
class FetchTopicsResolver {
  @Query(() => [Topic], { nullable: true })
  async topics(): Promise<Topic[] | null> {
    try {
      const topics = await Topic.find();

      return topics;
    } catch (error) {
      return null;
    }
  }
}

export default FetchTopicsResolver;
