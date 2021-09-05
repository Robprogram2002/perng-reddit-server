import { Arg, Query, Resolver } from 'type-graphql';
import dotenv from 'dotenv';
import Sub from '../../../entities/Sub';
import CreateSubResponse from '../createSub/response';

dotenv.config();

@Resolver()
class FetchSubResolver {
  @Query(() => CreateSubResponse)
  async Sub(
    @Arg('subName', () => String) subName: string
  ): Promise<CreateSubResponse> {
    try {
      const sub = await Sub.findOne({ name: subName });

      if (!sub) {
        throw new Error('Not sub was found with this name');
      }

      return {
        code: 200,
        success: true,
        message: 'sub created successfully',
        sub,
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
        sub: null,
      };
    }
  }
}

export default FetchSubResolver;
