import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import admin from '../firebase';
import { RequestContext } from '../types/RequestContext';
import User from '../entities/User';

const isAuth: MiddlewareFn<RequestContext> = async ({ context }, next) => {
  try {
    let { token } = context.req.cookies;
    if (!token) return next();

    token = JSON.parse(token);

    if (token.provider === 'local') {
      const result = jwt.decode(token.token, { complete: true, json: false });
      context.res.locals.user = await User.findOne({
        where: { email: result?.payload.email },
      });
    } else {
      const firebaseUser = await admin.auth().verifyIdToken(token);
      context.res.locals.user = await User.findOne({
        where: {
          email: firebaseUser.email,
        },
      });
    }

    return next();
  } catch (error) {
    throw new Error('sommething went wrong, plase try again');
  }
};

export default isAuth;
