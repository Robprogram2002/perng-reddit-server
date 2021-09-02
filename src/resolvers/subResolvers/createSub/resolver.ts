import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import dotenv from 'dotenv';
import CreateSubResponse from './response';
import CreateSubInput from './input';
import Sub from '../../../entities/Sub';
import SubType from '../../../types/SubTypes';
import isAuthValidaton from '../../../middlewares/isAuthValidaton';
import isAuth from '../../../middlewares/isAuth';
import { RequestContext } from '../../../types/RequestContext';

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
      // console.log(ctx.res.locals.user);
      const sub = await new Sub({
        adultContent,
        name,
        type: subType,
        username: res.locals.user.username,
      }).save();

      return {
        code: 200,
        success: true,
        message: 'sub created successfully',
        sub,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: error.message || 'something went wrong, please try again',
        sub: null,
      };
    }
  }
}

export default CreateSubResolver;
