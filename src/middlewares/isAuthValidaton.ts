import { MiddlewareFn } from 'type-graphql';
import { RequestContext } from '../types/RequestContext';
import User from '../entities/User';

const isAuth: MiddlewareFn<RequestContext> = async ({ context }, next) => {
  const user = context.res.locals.user as User | undefined;

  if (!user) throw new Error('not authenticated');

  // it's necessary return the next function
  return next();
};

export default isAuth;
