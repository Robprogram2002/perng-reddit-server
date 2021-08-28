import { Arg, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import RegisterInput from './input';
import RegisterResponse from './response';
import User from '../../../entities/User';
import Provider from '../../../types/AuthProvider';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

@Resolver()
class RegisterResolver {
  @Mutation(() => RegisterResponse)
  async register(
    @Arg('input') { password, email, username }: RegisterInput
  ): Promise<RegisterResponse> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await new User({
        password: hashedPassword,
        email,
        username,
        authProvider: Provider.LOCAL,
      }).save();

      const secret = process.env.JWT_SECRET_EMAIL || 'some_secret_word';
      const token = jwt.sign(
        {
          username,
          createdAt: new Date(),
          email,
        },
        secret,
        {
          expiresIn: '7d',
        }
      );

      const msg = {
        to: { email, name: username },
        from: {
          name: 'Reddit Authentication',
          email: 'robert.laksee20@gmail.com',
        },
        templateId: 'd-d9afe15898b04c42b3ea3a55e3945df5',
        dynamicTemplateData: {
          username,
          url: `${process.env.CLIENT_ORIGIN}/verify-email/${token}`,
        },
      };

      await sgMail.send(msg);

      return {
        code: 200,
        success: true,
        message: 'User successfully created',
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

export default RegisterResolver;
