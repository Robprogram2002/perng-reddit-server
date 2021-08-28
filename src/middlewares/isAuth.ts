import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { RequestContext } from '../types/RequestContext';
import User from '../entities/User';

const isAuth: MiddlewareFn<RequestContext> = async ({ context }, next) => {
  const { token } = context.req.cookies;

  if (!token) return next();

  const { email } = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as jwt.JwtPayload;

  const user = await User.findOne({ where: { email } });

  context.res.locals.user = user;
  return next();
};

export default isAuth;
