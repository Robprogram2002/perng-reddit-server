import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import admin from '../utils/firebase';
import { RequestContext } from '../types/RequestContext';
import User from '../entities/User';

const isAuth: MiddlewareFn<RequestContext> = async ({ context }, next) => {
  try {
    const { token } = context.req.cookies;
    if (!token) return next();

    const authData = JSON.parse(token);

    if (authData.provider === 'local') {
      const result = jwt.decode(authData.token, {
        complete: true,
        json: false,
      });
      context.res.locals.user = await User.findOne({
        where: { email: result?.payload.email },
      });
    } else {
      const firebaseUser = await admin.auth().verifyIdToken(authData.token);
      context.res.locals.user = await User.findOne({
        where: {
          email: firebaseUser.email,
        },
      });
    }

    return next();
  } catch (error) {
    console.log(error);
    throw new Error('sommething went wrong, plase try again');
  }
};

export default isAuth;
