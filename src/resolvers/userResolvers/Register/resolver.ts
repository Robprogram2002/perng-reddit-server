import { Arg, FieldResolver, Mutation, Resolver, Root } from 'type-graphql';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import { getConnection } from 'typeorm';
import RegisterInput from './input';
import RegisterResponse from './response';
import User from '../../../entities/User';
import Provider from '../../../types/AuthProvider';
import Sub from '../../../entities/Sub';
import Post from '../../../entities/Post';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

@Resolver(() => User)
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
      let message = 'something went wrong, please try again';
      if (error instanceof Error) {
        message = error.message;
      }
      return {
        code: 500,
        success: false,
        message,
        user: null,
      };
    }
  }

  @FieldResolver(() => [Sub])
  async subs(@Root() user: User): Promise<Sub[]> {
    const userOwnSubs = await Sub.find({ where: { username: user.username } });
    return userOwnSubs;
  }

  @FieldResolver(() => [Sub])
  async joinedSubs(@Root() user: User): Promise<Sub[]> {
    const userOwnSubs = await getConnection()
      .createQueryBuilder()
      .relation(User, 'joinedSubs')
      .of(user.id)
      .loadMany<Sub>();

    return userOwnSubs;
  }

  @FieldResolver()
  async posts(@Root() user: User): Promise<Post[]> {
    const posts = await User.createQueryBuilder()
      .relation('posts')
      .of(user)
      .loadMany<Post>();
    return posts;
  }
}

export default RegisterResolver;
