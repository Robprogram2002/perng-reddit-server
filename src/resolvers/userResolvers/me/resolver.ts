import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import dotenv from 'dotenv';
import { RequestContext } from '../../../types/RequestContext';
import isAuth from '../../../middlewares/isAuth';
import User from '../../../entities/User';

dotenv.config();

@Resolver()
class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: RequestContext): Promise<User | null> {
    if (!ctx.res.locals.user) {
      return null;
    }

    return { ...ctx.res.locals.user, bannerUrl: 'https://random' };
  }
}

export default MeResolver;
