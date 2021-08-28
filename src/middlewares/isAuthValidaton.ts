import { MiddlewareFn } from 'type-graphql';
import User from '../entities/User';
import { RequestContext } from '../types/RequestContext';

const isAuth: MiddlewareFn<RequestContext> = async ({ context }, next) => {
  const user = context.res.locals.user as User | undefined;

  if (!user) throw new Error('not authenticated');

  next();
};

export default isAuth;
