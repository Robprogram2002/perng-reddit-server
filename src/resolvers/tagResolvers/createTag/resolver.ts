import { Arg, Mutation, Resolver } from 'type-graphql';
import Tag from '../../../entities/Tag';
import TagResponse from './response';

@Resolver()
class CreateTagResolver {
  @Mutation(() => TagResponse)
  async createTag(@Arg('name') name: string): Promise<TagResponse> {
    try {
      const tag = await new Tag({ name }).save();
      return {
        code: 200,
        success: true,
        message: 'tag created successfully',
        tag,
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
        tag: null,
      };
    }
  }
}

export default CreateTagResolver;
