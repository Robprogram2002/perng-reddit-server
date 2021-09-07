import { Arg, Mutation, Resolver } from 'type-graphql';
import Topic from '../../../entities/Topic';
import TopicResponse from './response';

@Resolver()
class CreateTopicResolver {
  @Mutation(() => TopicResponse)
  async createTopic(@Arg('name') name: string): Promise<TopicResponse> {
    try {
      const topic = await new Topic({ name }).save();
      return {
        code: 200,
        success: true,
        message: 'topic created successfully',
        topic,
      };
    } catch (error) {
      let message = 'something went wrong, please try again';
      if (error instanceof Error) {
        message = error.message;
      }

      return {
        code: 500,
        success: false,
        message,
        topic: null,
      };
    }
  }
}

export default CreateTopicResolver;
