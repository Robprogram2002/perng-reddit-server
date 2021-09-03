import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import dotenv from 'dotenv';
import CreateSubResponse from './response';
import CreateSubInput from './input';
import Sub from '../../../entities/Sub';
import SubType from '../../../types/SubTypes';
import isAuthValidaton from '../../../middlewares/isAuthValidaton';
import isAuth from '../../../middlewares/isAuth';
import { RequestContext } from '../../../types/RequestContext';
import SubSettings from '../../../entities/SubSettings';

dotenv.config();

@Resolver()
class CreateSubResolver {
  @UseMiddleware([isAuth, isAuthValidaton])
  @Mutation(() => CreateSubResponse)
  async createSub(
    @Ctx() { res }: RequestContext,
    @Arg('input') { adultContent, name, type }: CreateSubInput
  ): Promise<CreateSubResponse> {
    try {
      let subType: SubType;
      if (type === String(SubType.PRIVATE)) {
        subType = SubType.PRIVATE;
      } else if (type === String(SubType.PUBLIC)) {
        subType = SubType.PUBLIC;
      } else if (type === String(SubType.RESTRICTED)) {
        subType = SubType.RESTRICTED;
      } else {
        throw new Error('invalid value for type field');
      }
      const settings = await new SubSettings({}).save();

      const sub = await new Sub({
        adultContent,
        name,
        type: subType,
        username: res.locals.user.username,
        settings,
      }).save();

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

export default CreateSubResolver;
