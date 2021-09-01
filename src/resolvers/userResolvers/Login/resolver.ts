import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import admin from '../../../firebase';
import User from '../../../entities/User';
import RegisterResponse from '../Register/response';
import LocalSignInInput from './input';
import { RequestContext } from '../../../types/RequestContext';
import Provider from '../../../types/AuthProvider';

@Resolver()
class LocalSignInResolver {
  @Mutation(() => RegisterResponse)
  async signIn(
    @Arg('input') { password, username }: LocalSignInInput,
    @Ctx() { res }: RequestContext
  ): Promise<RegisterResponse> {
    try {
      const user = await User.findOne(
        { username },
        { loadEagerRelations: false }
      );

      if (!user) {
        throw new Error('No user found with these credentials');
      } else if (user.authProvider !== 'local') {
        throw new Error(
          `email already used. Please login with your ${user.authProvider} account`
        );
      } else if (!user.emailConfirmation) {
        throw new Error('This email address has not been verified');
      }

      const passComparison = await bcrypt.compare(password, user.password!);

      if (!passComparison) {
        throw new Error('Invalid password');
      }

      //   at this point user has passed all the validations

      const secret = process.env.JWT_SECRET || 'some_secret_word';
      const token = jwt.sign(
        {
          username: user.username,
          createdAt: user.createdAt,
          email: user.email,
        },
        secret,
        {
          expiresIn: '2h',
        }
      );

      res.set(
        'Set-Cookie',
        cookie.serialize(
          'token',
          JSON.stringify({ token, provider: 'local' }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 * 2, // two hours
            path: '/',
          }
        )
      );

      return {
        code: 200,
        success: true,
        message: 'user loged in succesfully',
        user,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: error.message || 'something went wrong, please try again',
        user: null,
      };
    }
  }

  @Mutation(() => RegisterResponse)
  async firebaseLogin(
    @Arg('token', () => String) token: string,
    @Ctx() { res }: RequestContext
  ): Promise<RegisterResponse> {
    try {
      const firebaseUser = await admin.auth().verifyIdToken(token);
      console.log(firebaseUser);
      // if not user, create one in DB
      let user = await User.findOne({ email: firebaseUser.email });

      if (!user) {
        user = new User({
          email: firebaseUser.email,
          username: firebaseUser.name,
          authProvider: Provider.GOOGLE,
          emailConfirmation: firebaseUser.email_verified,
          avatarUrl: firebaseUser.picture,
        });

        await user.save();
      }

      res.set(
        'Set-Cookie',
        cookie.serialize(
          'token',
          JSON.stringify({ token, provider: 'firebase' }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 * 2, // 3600
            path: '/',
          }
        )
      );

      return {
        code: 200,
        success: true,
        message: 'account created successfully and user loged in',
        user,
      };
    } catch (error) {
      return {
        code: 500,
        success: false,
        message: error.message || 'something went wrong, please try again',
        user: null,
      };
    }
  }
}

export default LocalSignInResolver;
