import { Arg, Mutation, Resolver } from 'type-graphql';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../../../entities/User';
import BaseResponse from '../../../utils/baseResponse';

dotenv.config();

@Resolver()
class EmailVerificationResolver {
  @Mutation(() => BaseResponse)
  async verifyEmail(
    @Arg('token', () => String) token: string
  ): Promise<BaseResponse> {
    try {
      const result = jwt.verify(
        token,
        process.env.JWT_SECRET_EMAIL!
      ) as jwt.JwtPayload;
      const { email } = result;

      if (!email) throw new Error('token not valid');

      const update = await User.update(
        { email },
        {
          emailConfirmation: true,
        }
      );

      console.log(update);

      return {
        code: 200,
        success: true,
        message: 'email verified successfuly',
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
      };
    }
  }
}

export default EmailVerificationResolver;
