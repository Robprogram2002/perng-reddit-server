import { Arg, Mutation, Resolver } from 'type-graphql';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../../entities/User';
import BaseResponse from '../../../utils/baseResponse';
import { ResetPasswordInput, SendEmailInput } from './input';

dotenv.config();

@Resolver()
class RessetPasswordResolver {
  @Mutation(() => BaseResponse)
  async sendEmail(
    @Arg('input', () => SendEmailInput)
    { email, username }: SendEmailInput
  ): Promise<BaseResponse> {
    try {
      const user = await User.findOne(
        { email, username },
        { loadEagerRelations: false }
      );

      if (!user) {
        throw new Error('Not user found with this email and username');
      }

      const secret = process.env.JWT_SECRET_EMAIL || 'some_secret_word';
      const token = jwt.sign(
        {
          username: user.username,
          createdAt: new Date(),
          email,
        },
        secret,
        {
          expiresIn: 1800,
        }
      );

      const msg = {
        to: { email, name: user.username },
        from: {
          name: 'Reddit Authentication',
          email: 'robert.laksee20@gmail.com',
        },
        templateId: 'd-d9afe15898b04c42b3ea3a55e3945df5',
        dynamicTemplateData: {
          username: user.username,
          url: `${process.env.CLIENT_ORIGIN}/reset-password/${token}`,
        },
      };

      await sgMail.send(msg);

      return {
        code: 200,
        success: true,
        message: `email seny to ${user.email} for password reset successfully`,
      };
    } catch (error) {
      let message = 'something went wrong, please try again';
      if (error instanceof Error) {
        message = error.message;
      }
      return {
        code: 200,
        success: false,
        message,
      };
    }
  }

  @Mutation(() => BaseResponse)
  async resetPassword(
    @Arg('input', () => ResetPasswordInput)
    { token, password }: ResetPasswordInput
  ): Promise<BaseResponse> {
    try {
      const result = jwt.verify(
        token,
        process.env.JWT_SECRET_EMAIL!
      ) as jwt.JwtPayload;

      const { email } = result;
      if (!email) throw new Error('token not valid');

      const hashedPassword = await bcrypt.hash(password, 12);

      const update = await User.update({ email }, { password: hashedPassword });
      console.log(update);

      if (!update.affected || update.affected === 0) {
        if (!email) throw new Error('server error, please try again');
      }

      return {
        code: 200,
        success: true,
        message: "user's password was updated successfully",
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

export default RessetPasswordResolver;
