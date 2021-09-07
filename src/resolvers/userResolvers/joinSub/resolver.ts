import { Arg, Ctx, Resolver, UseMiddleware, Mutation } from 'type-graphql';
import { getConnection } from 'typeorm';
// import isAuthValidaton from '../../../middlewares/isAuthValidaton';
import isAuth from '../../../middlewares/isAuth';
import CreateSubResponse from '../../subResolvers/createSub/response';
import { RequestContext } from '../../../types/RequestContext';
import User from '../../../entities/User';
import Sub from '../../../entities/Sub';

@Resolver()
class JoinToSubResolver {
  @UseMiddleware([isAuth])
  @Mutation(() => CreateSubResponse)
  async join(
    @Ctx() { res }: RequestContext,
    @Arg('subId') subId: string,
    @Arg('action') action: string
  ): Promise<CreateSubResponse> {
    try {
      const user = res.locals.user as User;
      console.log(user);
      const sub = await Sub.findOne(subId);

      if (!sub) throw new Error('Sub not found');

      if (action === 'join') {
        await getConnection()
          .createQueryBuilder()
          .relation(Sub, 'joinedUsers')
          .of(sub.id)
          .add('6991ba32-d717-4052-9307-a7c36bde047b');
      } else {
        await getConnection()
          .createQueryBuilder()
          .relation(Sub, 'joinedUsers')
          .of(sub.id)
          .remove('6991ba32-d717-4052-9307-a7c36bde047b');
      }

      return {
        code: 200,
        success: true,
        message: 'user has joined to the sub successfully',
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

export default JoinToSubResolver;
