import { MiddlewareFn } from 'type-graphql';
import Sub from '../entities/Sub';
// import User from '../entities/User';
import { RequestContext } from '../types/RequestContext';

const isAuth: MiddlewareFn<RequestContext> = async (
  { args, context: { res } },
  next
) => {
  try {
    const subName = args.input.subName as string;
    // const { username } = res.locals.user as User;
    const username = 'Roberto Martínez Rivera';
    const sub = await Sub.findOne(
      { name: subName },
      {
        select: ['id', 'settings', 'username'],
        relations: ['settings'],
      }
    );

    if (!sub) throw new Error('no sub was found with this id');

    if (sub.username !== username)
      throw new Error('action not authorized for this user');

    res.locals.sub = sub;
    return next();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('sommething went wrong, plase try again');
    }
  }
};

export default isAuth;
